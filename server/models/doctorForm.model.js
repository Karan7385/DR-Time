const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true, minlength: 1, maxlength: 10 },
    specialization: { type: String},
    medLicenseNo: { type: Date, required: true },
    medLicenseNoExpiry: { type: String, required: true },
    profilePhoto: { type: Buffer },
    hospitalAffiliationName: { type: String, required: true },
    hospitalAffiliationAddress: { type: String, required: true },
    qualification: { type: String },
    experience: { type: Number },
    institution: { type: String },
    certificate: { type: Buffer },
    alternateAddress: { type: String },
    emergencyContact: { type: String, maxlength: 10 },
    languagesSpoken: { type: String },
    websiteLinkedIn: { type: String },
    additionalNotes: { type: String },
    professionalBiography: { type: String },
}, {timestamps: true});

module.exports = mongoose.model('Doctor', doctorSchema);