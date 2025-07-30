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
    const Application = require('../models/Application');
    const approvedApplications = await Application.find({ status: 'approved' });
    res.json(approvedApplications);
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

exports.updateFund = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    
    const fund = entrepreneur.funds.id(req.params.fundId);
    if (!fund) return res.status(404).json({ message: 'Fund not found' });
    
    Object.assign(fund, req.body);
    await entrepreneur.save();
    res.json(entrepreneur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFund = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) return res.status(404).json({ message: 'Entrepreneur not found' });
    
    entrepreneur.funds.id(req.params.fundId).remove();
    await entrepreneur.save();
    res.json(entrepreneur);
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