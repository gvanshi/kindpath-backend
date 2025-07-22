const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const donationRoutes = require('./routes/donationRoutes');
const Donation = require('./models/Donation'); // 🛑 You were missing this

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/donations', donationRoutes);

// ✅ FIXED DELETE route directly in app
app.delete('/api/delete/:sevaType', async (req, res) => {
  const { sevaType } = req.params;
  try {
    const result = await Donation.deleteMany({ sevaType: sevaType });
    res.json({ message: `${result.deletedCount} ${sevaType} entries deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting entries', error: err });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
