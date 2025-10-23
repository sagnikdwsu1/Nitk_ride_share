const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    from: { type: String, required: true },       // Starting location
    to: { type: String, required: true },         // Destination
    date: { type: String, required: true },       // Date of the ride
    time: { type: String, required: true },       // Time of the ride
    userName: { type: String, required: true },   // User Name from login info
    phoneNumber: { type: String, required: true }, // Phone Number from login info
    email: { type: String, required: true },      // Email from login info
    gender: { type: String, required: true }      // Gender from login info
}, {
    timestamps: true
});

// Prevent model overwrite error
const Ride = mongoose.models.Ride || mongoose.model('Ride', rideSchema);

module.exports = Ride;
