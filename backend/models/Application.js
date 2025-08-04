const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  image: String,
  name: {type: String,required: true,},
  email: { type: String, required: true },
  orgName: { type: String, required: true },
  orgWebsite: String,
  reasons: { type: String, required: true },
  supportNeeds: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectionReason: String,


  isUpdate: { type: Boolean, default: false },
  originalApplicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  entrepreneurId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entrepreneur' },


}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema); 