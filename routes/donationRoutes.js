const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Add new donation
router.post('/', async (req, res) => {
  try {
    console.log("Received data:", req.body);  // 🪵 ADD THIS LINE
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    console.error("Error in POST /api/donations:", err);
    res.status(500).json({ error: err.message });
  }
});


// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET: Dashboard Stats
// GET: Dashboard Stats
router.get('/stats', async (req, res) => {
  try {
    const all = await Donation.find();

    // Group by donor name
    const donorMap = {};
    const sevaMap = {};
    const sevaCountMap = {};
    const monthlyMap = {};

    let totalAmount = 0;
    let todayAmount = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const d of all) {
      // Amount
      totalAmount += d.amount;

      // Today's donations
      if (new Date(d.donationDate) >= today) {
        todayAmount += d.amount;
      }

      // Donor grouping
      if (!donorMap[d.name]) {
        donorMap[d.name] = { total: 0, count: 0 };
      }
      donorMap[d.name].total += d.amount;
      donorMap[d.name].count += 1;

      // Seva amount grouping (existing)
      const seva = d.sevaType || "Unknown";
      sevaMap[seva] = (sevaMap[seva] || 0) + d.amount;

      // ✅ Seva count grouping (new)
      sevaCountMap[seva] = (sevaCountMap[seva] || 0) + 1;

      // Monthly grouping
      const date = new Date(d.donationDate);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlyMap[key] = (monthlyMap[key] || 0) + d.amount;
    }

    // Top donor
    let topDonor = { name: '', amount: 0 };
    Object.entries(donorMap).forEach(([name, data]) => {
      if (data.total > topDonor.amount) {
        topDonor = { name, amount: data.total };
      }
    });

    // Repeat donors
    const repeatDonors = Object.values(donorMap).filter(d => d.count > 1).length;

    // Average donation
    const avgDonation = totalAmount / all.length;

    res.json({
      totalDonations: totalAmount,
      totalDonors: all.length,
      todayDonations: todayAmount,
      sevaBreakdown: sevaMap,              // 💰 amount per seva
      sevaCountBreakdown: sevaCountMap,    // 🔢 count per seva (NEW)
      topDonor,
      averageDonation: Math.round(avgDonation),
      repeatDonors,
      monthlyGraph: monthlyMap
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/filter-stats', async (req, res) => {
  try {
    const { startDate, endDate, sevaType, name } = req.body;
    const query = {};

    if (startDate && endDate) {
      query.donationDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (sevaType && sevaType !== 'All') {
      query.sevaType = sevaType;
    }

    if (name && name.trim() !== '') {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    const filtered = await Donation.find(query);

    const sevaMap = {};
    let totalAmount = 0;

    for (const d of filtered) {
      totalAmount += d.amount;
      const seva = d.sevaType || "Unknown";
      sevaMap[seva] = (sevaMap[seva] || 0) + 1;
    }

    res.json({
      count: filtered.length,
      total: totalAmount,
      sevaBreakdown: sevaMap
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
