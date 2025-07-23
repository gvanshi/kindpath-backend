const express = require('express');
const router = express.Router();
const Receipt80G = require('../models/receipt80g');

// POST route to save 80G receipt
router.post('/api/receipts80g', async (req, res) => {
  try {
    const receipt = new Receipt80G(req.body);
    await receipt.save();
    res.status(201).json({ message: '✅ Receipt saved successfully' });
  } catch (error) {
    res.status(500).json({ error: '❌ Error saving receipt' });
  }
});

module.exports = router;
