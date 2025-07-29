const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  image: String,
  email: { type: String, required: true },
  orgName: { type: String, required: true },
  orgWebsite: String,
  reasons: { type: String, required: true },
  supportNeeds: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectionReason: String,
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema); 