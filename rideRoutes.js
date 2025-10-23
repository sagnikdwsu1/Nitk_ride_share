const express = require('express');
const router = express.Router();
const Ride = require('../Models/Ride');
const authenticateToken = require('../Middlewares/authMiddleware'); // ✅ Correct import
// const { protect } = require('../Middlewares/authMiddleware');  // ✅ Ensure correct path

// ✅ Add a ride
router.post('/add', authenticateToken, async (req, res) => {
    const { from, to, date, time } = req.body; // Ride details from user input
    const user = req.user; // Extract user details from JWT token using middleware

    if (!from || !to || !date || !time) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const newRide = new Ride({
            userId: user._id,      // User ID from JWT token
            from,
            to,
            date,
            time,
            userName: user.name,      // User Name from JWT
            phoneNumber: user.phone,  // Phone Number from JWT
            email: user.email,        // Email from JWT
            gender: user.gender       // Gender from JWT
        });

        await newRide.save();
        res.status(201).json({ success: true, message: 'Ride added successfully', ride: newRide });
    } catch (error) {
        console.error('Error adding ride:', error);
        res.status(500).json({ success: false, message: 'Failed to add ride', error: error.message });
    }
});

// ✅ Search for available rides
router.get('/search', authenticateToken, async (req, res) => {  // ✅ Using correct middleware
    try {
        const { date, time, from, to } = req.query;

        if (!date) {
            return res.status(400).json({ success: false, message: "Date is required" });
        }

        const query = { date };
        if (from) query.from = from;
        if (to) query.to = to;
        // if (time) query.time=time;

        const matchingRides = await Ride.find(query);

        res.json({ success: true, rides: matchingRides });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

module.exports = router;
