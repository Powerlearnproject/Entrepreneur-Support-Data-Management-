const Fund = require('../models/fund');
const Entrepreneur = require('../models/Entrepreneur');

// POST /api/funds
const createFund = async (req, res) => {
  try {
    const { entrepreneurId, amount, date, reason } = req.body;

    const existingEntrepreneur = await Entrepreneur.findById(entrepreneurId);
    if (!existingEntrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }

    const fund = new Fund({ entrepreneurId, amount, date, reason });
    await fund.save();
    res.status(201).json(fund);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/funds
const getAllFunds = async (req, res) => {
  try {
    const funds = await Fund.find().populate('entrepreneurId', 'name');
    res.status(200).json(funds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/funds/total
const getTotalFunds = async (req, res) => {
  try {
    const total = await Fund.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    res.status(200).json({ totalAmount: total[0]?.totalAmount || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/funds/:entrepreneurId
const getFundsByEntrepreneur = async (req, res) => {
  try {
    const { entrepreneurId } = req.params;
    const funds = await Fund.find({ entrepreneurId }).sort({ date: -1 });
    res.status(200).json(funds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createFund,
  getAllFunds,
  getTotalFunds,
  getFundsByEntrepreneur
};
