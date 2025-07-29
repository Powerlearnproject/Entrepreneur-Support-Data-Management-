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