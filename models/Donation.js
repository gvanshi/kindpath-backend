const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  sevaType: String,
  amount: Number,
  quantity: Number, // 👈 (if you’re using seva quantity)
  paymentProofUrl: String,
  donationDate: { type: Date, default: Date.now },
  receiptSent: { type: Boolean, default: false },
  proofSent: { type: Boolean, default: false },
  received80G: { type: Boolean, default: false }, // 👈 ADD THIS LINE
  proofLink: String, // 👈 optional: to store 80G folder link
  notes: String
});

module.exports = mongoose.model('Donation', donationSchema);
