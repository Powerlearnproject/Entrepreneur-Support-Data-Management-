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
  tls: {
    rejectUnauthorized: false, 
  },
});

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, orgName, orgWebsite, reasons, supportNeeds, plans } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const application = new Application({
      name, email, orgName, orgWebsite, reasons, supportNeeds, plans, image
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

  
    if (application.isUpdate && application.entrepreneurId) {
      const Entrepreneur = require('../models/Entrepreneur');
      const entrepreneur = await Entrepreneur.findById(application.entrepreneurId);
      if (!entrepreneur) return res.status(404).json({ message: 'Linked entrepreneur not found' });

      entrepreneur.name = application.name;
      entrepreneur.contactInfo = application.email;
      entrepreneur.businessName = application.orgName;
      entrepreneur.image = application.image || entrepreneur.image;
      await entrepreneur.save();

      application.status = 'approved';
      await application.save();

      return res.json({ message: 'Entrepreneur update approved successfully' });
    }

    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: application.name,
      email: application.email,
      password: hashedPassword,
      role: 'entrepreneur',
    });

    await user.save();

    application.status = 'approved';
    await application.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: application.email,
      subject: 'HEVA Application Approved',
      text: `Congratulations ${application.name}!\n\nYour application has been approved.\n\nLogin details:\nEmail: ${application.email}\nPassword: ${password}\n\nPlease login and change your password.`,
    });

    res.json({ message: 'Application approved and user created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.submitUpdate = async (req, res) => {
  try {
    const { name, email, orgName, orgWebsite, reasons, supportNeeds, entrepreneurId } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateApplication = new Application({
      name,
      email,
      orgName,
      orgWebsite,
      reasons,
      supportNeeds,
      image,
      entrepreneurId,
      isUpdate: true,
      status: 'pending',
    });

    await updateApplication.save();
    res.status(201).json({ message: 'Update submitted and pending approval' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.status !== 'pending') return res.status(400).json({ message: 'Already processed' });

    const rejectionReason = req.body.rejectionReason || 'Not specified';

    application.status = 'rejected';
    application.rejectionReason = rejectionReason;
    await application.save();

    // Send rejection email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: application.email,
        subject: 'HEVA Application Update',
        text: `Hello ${application.name},\n\nWe regret to inform you that your application has been rejected.\n\nReason: ${rejectionReason}\n\nThank you for your interest.`,
      });
      console.log('Rejection email sent to:', application.email);
    } catch (emailError) {
      console.error('Error sending rejection email:', emailError);
    }

    res.json({ message: 'Application rejected and email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
