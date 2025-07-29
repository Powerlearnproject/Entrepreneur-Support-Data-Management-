const Application = require('../models/Application');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configure nodemailer (update with your SMTP details)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.submitApplication = async (req, res) => {
  try {
    const { email, orgName, orgWebsite, reasons, supportNeeds } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const application = new Application({
      email, orgName, orgWebsite, reasons, supportNeeds, image
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.status !== 'pending') return res.status(400).json({ message: 'Already processed' });
    // Generate random password
    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({
      name: application.orgName,
      email: application.email,
      password: hashedPassword,
      role: 'entrepreneur',
    });
    await user.save();
    application.status = 'approved';
    await application.save();
    // Send approval email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: application.email,
      subject: 'HEVA Application Approved',
      text: `Congratulations! Your application has been approved.\n\nLogin details:\nEmail: ${application.email}\nPassword: ${password}\n\nPlease login and change your password.`,
    });
    res.json({ message: 'Application approved and user created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectApplication = async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.status !== 'pending') return res.status(400).json({ message: 'Already processed' });
    application.status = 'rejected';
    application.rejectionReason = rejectionReason;
    await application.save();
    // Send rejection email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: application.email,
      subject: 'HEVA Application Update',
      text: `We regret to inform you that your application was not successful. Reason: ${rejectionReason}\nYou may re-apply after 3 months if still interested.`,
    });
    res.json({ message: 'Application rejected and email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 