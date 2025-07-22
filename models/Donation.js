const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  sevaType: String,
  amount: Number,
  quantity: Number, // optional: like KGs or kits
  panCard: String,   // ✅ Added
  address: String,   // ✅ Added
  donationDate: { type: Date, default: Date.now },
  slipGenerated: { type: Boolean, default: false },
  sevaDone: String,
  proofSent: { type: Boolean, default: false },
  receipt80GSent: { type: Boolean, default: false },
  billCreated: { type: Boolean, default: false },
  billFiled: { type: Boolean, default: false },
  paymentProofUrl: String,
  proofLink: String, // 80G receipt folder link
  notes: String
});

module.exports = mongoose.model('Donation', donationSchema);
