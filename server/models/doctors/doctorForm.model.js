const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    qualification: { type: String, required: true },
    experience: { type: Number },
    institution: { type: String },
    specialization: { type: String },
    medLicenseNo: { type: String, required: true },
    medLicenseNoExpiry: { type: Date, required: true },
    hospitalAffiliationName: { type: String, required: true },
    profilePhoto: { type: String },
    certificate: { type: String },
    additionalNotes: { type: String },
    professionalBiography: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);