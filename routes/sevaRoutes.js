// routes/sevaRoutes.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); // Adjust the path as per your folder structure

// 🧹 Universal function to delete by sevaType
const deleteSevaEntries = async (req, res, sevaType) => {
  try {
    const result = await Donation.deleteMany({ sevaType });
    res.json({ message: `✅ All entries for "${sevaType}" deleted.`, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: '❌ Error deleting entries', details: err.message });
  }
};

// 🚨 Routes to delete by sevaType
router.delete('/delete/dog', (req, res) => deleteSevaEntries(req, res, "Dog Feeding Seva"));
router.delete('/delete/cow', (req, res) => deleteSevaEntries(req, res, "Cow Feeding"));
router.delete('/delete/kabootar', (req, res) => deleteSevaEntries(req, res, "Kabootar Seva"));
router.delete('/delete/stationary', (req, res) => deleteSevaEntries(req, res, "Stationary Kit"));
router.delete('/delete/ration', (req, res) => deleteSevaEntries(req, res, "Ration Wale Seva"));

// ✅ Optional - Delete by any sevaType passed as query param
router.delete('/delete/seva', async (req, res) => {
  const sevaType = req.query.type;
  if (!sevaType) return res.status(400).json({ error: 'Missing sevaType in query ?type=' });
  await deleteSevaEntries(req, res, sevaType);
});

module.exports = router;
