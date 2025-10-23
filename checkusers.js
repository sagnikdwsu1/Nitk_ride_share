const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('✅ Connected to MongoDB');

    const User = mongoose.model("User", new mongoose.Schema({}, { strict: false, collection: "users" }));

    const users = await User.find({});
    console.log("Users in Database:", users);
    mongoose.connection.close();
}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});
