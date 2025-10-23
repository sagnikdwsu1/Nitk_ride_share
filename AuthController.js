const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password, gender, phone, comments } = req.body;

        // 🔹 Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User already exists, please login', 
                success: false 
            });
        }

        // 🔹 Validate required fields
        if (!name || !email || !password || !gender || !phone) {
            return res.status(400).json({ 
                message: 'All fields are required', 
                success: false 
            });
        }

        // 🔹 Validate email format (Only allow @nitk.edu.in)
        if (!email.endsWith('@nitk.edu.in')) {
            return res.status(400).json({ 
                message: 'Email must be from @nitk.edu.in domain', 
                success: false 
            });
        }

        // 🔹 Validate gender
        const allowedGenders = ["Male", "Female", "Other"];
        if (!allowedGenders.includes(gender)) {
            return res.status(400).json({ 
                message: 'Invalid gender selection', 
                success: false 
            });
        }

        // 🔹 Validate phone number (Must be exactly 10 digits)
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ 
                message: 'Phone number must be 10 digits', 
                success: false 
            });
        }

        // 🔹 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            gender,
            phone,
            comments: comments || "" // Default empty string if not provided
        });

        await newUser.save();

        res.status(201).json({ 
            message: "Signup successful!", 
            success: true 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed: Email or password is incorrect';

        if (!user) {
            return res.status(403).json({ 
                message: errorMsg, 
                success: false 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ 
                message: errorMsg, 
                success: false 
            });
        }

        // 🔹 Generate JWT Token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
            gender: user.gender,   // Return gender
            phone: user.phone      // Return phone
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
