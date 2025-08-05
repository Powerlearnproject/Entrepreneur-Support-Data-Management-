const Entrepreneur = require('../models/Entrepreneur');




exports.createEntrepreneur = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const entrepreneur = new Entrepreneur(data);
    await entrepreneur.save();
    res.status(201).json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.json(entrepreneurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApprovedEntrepreneurs = async (req, res) => {
  try {
    // Get approved applications to display publicly
    const approvedEntrepreneurs= await Entrepreneur.find({ status: 'approved' });
    res.json(approvedEntrepreneurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApprovedEntrepreneursById = async (req, res) => {
  try {
   
    const entrepreneur= await Entrepreneur.findOne({
         _id: req.params.id,
         status: 'approved'
    });
     if (!entrepreneur) {
      return res.status(404).json({ message: 'Approved entrepreneur not found' });
    }
    res.json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEntrepreneurById = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    res.json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEntrepreneur = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    res.json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEntrepreneur = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findByIdAndDelete(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    res.json({ message: 'Entrepreneur deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fund management
exports.addFund = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    
    entrepreneur.funds.push(req.body);
    await entrepreneur.save();
    res.status(201).json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Support activity management
exports.addSupportActivity = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    
    entrepreneur.supportActivities.push(req.body);
    await entrepreneur.save();
    res.status(201).json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSupportActivity = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    
    const activity = entrepreneur.supportActivities.id(req.params.activityId);
    if (!activity) return res.status(404).json({ message: 'Support activity not found' });
    
    Object.assign(activity, req.body);
    await entrepreneur.save();
    res.json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSupportActivity = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    
    entrepreneur.supportActivities.id(req.params.activityId).remove();
    await entrepreneur.save();
    res.json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const Application = require('../models/Application');

// Admin: Approve application and create entrepreneur profile
exports.approveApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Fetch the application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Optional: Prevent duplicate creation
    const existingEntrepreneur = await Entrepreneur.findOne({ email: application.email });
    if (existingEntrepreneur) {
      return res.status(400).json({ message: 'Entrepreneur already exists for this application' });
    }

    // Create entrepreneur based on approved application
    const newEntrepreneur = new Entrepreneur({
      name: application.name,
      email: application.email,
      businessName: application.orgName,
      website: application.orgWebsite,
      reasons: application.reasons,
      supportNeeds: application.supportNeeds,
      plans: application.plans,
      image: application.image,
      status: 'approved',
    });

    await newEntrepreneur.save();

    // Mark application as approved (optional)
    application.status = 'approved';
    await application.save();

    res.status(201).json({ message: 'Entrepreneur created from application', entrepreneur: newEntrepreneur });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
