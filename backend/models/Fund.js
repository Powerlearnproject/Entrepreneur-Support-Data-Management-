const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  entrepreneurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entrepreneur',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Fund = mongoose.models.Fund || mongoose.model('Fund', fundSchema);
module.exports = Fund;
