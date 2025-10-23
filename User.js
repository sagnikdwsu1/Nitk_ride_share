const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@nitk\.edu\.in$/, 'Email must be from @nitk.edu.in domain']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    comments: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
