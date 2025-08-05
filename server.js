const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");


const corsOptions = {
  origin: ['https://kindpath-frontened-crmon.vercel.app'], // Add your frontend domains here
  credentials: true
};


const donationRoutes = require('./routes/donationRoutes');
const receipt80GRoutes = require('./routes/receipt80g');

dotenv.config();

const app = express();
app.use(cors(corsOptions));

app.use('/api/donations', donationRoutes);

app.use(express.json());

// Use your routes
app.use('/api/donations', donationRoutes);
app.use('/api/receipts80g', receipt80GRoutes);

// ✅ DELETE route directly in app
const Donation = require('./models/Donation');
app.delete('/api/delete/:sevaType', async (req, res) => {
  const { sevaType } = req.params;
  try {
    const result = await Donation.deleteMany({ sevaType: sevaType });
    res.json({ message: `${result.deletedCount} ${sevaType} entries deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting entries', error: err });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
