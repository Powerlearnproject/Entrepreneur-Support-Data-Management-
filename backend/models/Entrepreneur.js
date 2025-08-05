const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  amount: Number,
  donor:String,
  date: Date,
  ref: String
});

const supportActivitySchema = new mongoose.Schema({
  type: String,
  date: Date,
  notes: String,
});

const entrepreneurSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  contactInfo: { type: String },
  businessName: { type: String }, 
  image: String, 
  status: { type: String, enum: ['approved', 'pending'], default: 'pending' },

  website: { type: String }, 
  reasons: { type: String }, 
  supportNeeds: { type: String }, 
  plans: { type: String }, 

  funds: [fundSchema],
  supportActivities: [supportActivitySchema],
}, { timestamps: true });

module.exports = mongoose.model('Entrepreneur', entrepreneurSchema);
