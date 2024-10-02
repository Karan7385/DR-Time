const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const User = require('../models/User.js');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File upload failed" });
    }

    const {
        fname,
        mname,
        lname,
        dob,
        gender,
        mobile,
        email,
        password,
        street,
        city,
        state,
        zipCode,
        emergencyContactName,
        emergencyContactNumber,
        comments,
        policyNumber,
        terms
    } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [
                { email },
                { mobile },
                { policyNumber }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email, mobile number, or policy number! Please login' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ 
            fname, 
            mname, 
            lname, 
            dob, 
            gender, 
            mobile, 
            email, 
            password: hashedPassword,
            street, 
            city, 
            state, 
            zipCode, 
            emergencyContactName, 
            emergencyContactNumber, 
            comments,
            policyNumber, 
            photo: req.file.path,
            terms
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userData =  { 
            fname, 
            mname, 
            lname, 
            dob, 
            gender, 
            mobile, 
            email, 
            password: hashedPassword,
            street, 
            city, 
            state, 
            zipCode, 
            emergencyContactName, 
            emergencyContactNumber, 
            comments,
            policyNumber, 
            photo: req.file.path,
            terms
        };

        res.status(201).json({ 
            message: 'User registered successfully!', 
            token,
            sessionId: savedUser._id,
            userData: userData
        });
    } catch (error) {
        console.log("ERROR: " + error.message);
        res.status(500).json({ error: error.message });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({ message: 'User not found!' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: "Login successfully", user: user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;