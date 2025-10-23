const mongoose = require('mongoose');
require('dotenv').config();  // Ensure .env is loaded in db.js as well

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
    console.error("MongoDB connection string is missing! Check your .env file.");
    process.exit(1); // Exit the app if MongoDB URL is missing
}

mongoose.connect(mongo_url)  // 🔥 Removed deprecated options
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));
