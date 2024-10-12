const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    mname: { type: String },
    lname: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Others'], required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    emergencyContactName: { type: String },
    emergencyContactNumber: { type: String },
    comments: { type: String },
    policyNumber: { type: String, unique: true },
    photo: { type: String, },
    terms: { type: Boolean },
    userType: {
        type: String,
        enum: ['doctor', 'pathologist', 'patient'],
        default: 'patient',
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
