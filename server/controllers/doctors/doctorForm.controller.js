const Doctor = require('../../models/doctors/doctorForm.model.js');
const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createDoctor = async (req, res) => {
    try {
        const { body, files } = req;

        const existingUser = await User.findOne({
            $or: [
                { email: body.email },
                { mobile: body.mobile }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'This email and mobile is already exist!!' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            fname: body.fname,
            lname: body.lname,
            email: body.email,
            password: hashedPassword,
            mobile: body.mobile,
            dob: body.dob,
            gender: body.gender,
            street: body.street,
            city: body.city,
            state: body.state,
            zipCode: body.zipcode,
            userType: 'doctor',
        });

        const userRegister = await user.save();

        const doctorData = {
            userId: userRegister._id,
            qualification: body.qualification,
            experience: body.experience,
            institution: body.institution,
            specialization: body.specialization,
            medLicenseNo: body.medLicenseNo,
            medLicenseNoExpiry: body.medLicenseNoExpiry,
            hospitalAffiliationName: body.hospitalAffiliationName,
            profilePhoto: files?.profilePhoto ? files.profilePhoto[0].path : null,
            certificate: files?.certificate ? files.certificate[0].path : null,
            additionalNotes: body.additionalNotes,
            professionalBiography: body.professionalBiography,
        };

        const doctor = new Doctor(doctorData);
        const doctorRegister = await doctor.save();

        const token = jwt.sign({ id: doctorRegister._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'Your account is created successfully!!',
            token,
            sessionId: doctorRegister._id,
            userData: doctor,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: 'Error creating doctor',
        });
    }
};

module.exports = createDoctor;
