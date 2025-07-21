const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  sevaType: String,
  amount: Number,
  paymentProofUrl: String,
  donationDate: { type: Date, default: Date.now },
  receiptSent: { type: Boolean, default: false },
  proofSent: { type: Boolean, default: false },
  notes: String
});

module.exports = mongoose.model('Donation', donationSchema);
