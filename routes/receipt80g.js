const express = require('express');
const router = express.Router();
const Receipt80G = require('../models/receipt80g');

// ✅ GET route to fetch all 80G receipts
router.get('/', async (req, res) => {
  try {
    const receipts = await Receipt80G.find().sort({ syncedAt: -1 });
    res.status(200).json(receipts);
  } catch (err) {
    res.status(500).json({ error: '❌ Error fetching receipts', details: err });
  }
});

// ✅ POST route to save 80G receipt
router.post('/', async (req, res) => {
  try {
    const receipt = new Receipt80G(req.body);
    await receipt.save();
    res.status(201).json({ message: '✅ Receipt saved successfully' });
  } catch (err) {
    res.status(500).json({ error: '❌ Error saving receipt', details: err });
  }
});

module.exports = router;
