const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  usage: String,
  receipts: [String],
});

const supportActivitySchema = new mongoose.Schema({
  type: String,
  date: Date,
  notes: String,
});

const entrepreneurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: String,
  businessName: String,
  documents: [String],
  image: String,
  status: { type: String, enum: ['approved', 'pending'], default: 'pending' }, 
  funds: [fundSchema],
  supportActivities: [supportActivitySchema],
}, { timestamps: true });

module.exports = mongoose.model('Entrepreneur', entrepreneurSchema); 