const mongoose = require('mongoose');

const receipt80gSchema = new mongoose.Schema({
  receiptNumber: String,
  name: String,
  phone: String,
  email: String,
  amount: Number,
  panCard: String,
  address: String,
  sevaType: String,
  paymentProofUrl: String,
  receipt80GSent: { type: Boolean, default: true },
  syncedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt80G', receipt80gSchema);
