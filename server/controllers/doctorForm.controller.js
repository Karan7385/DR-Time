const Doctor = require('../models/doctorForm.model.js');

const createDoctor = async (req, res) => {
    try {
        const { body, files } = req;
        const doctorData = {
            ...body,
            profilePhoto: files?.profilePhoto ? files.profilePhoto[0].buffer : null,
            certificate: files?.certificate ? files.certificate[0].buffer : null,
        };
        
        const doctor = new Doctor(doctorData);
        
        const doctorRegister = await doctor.save();
        console.log(body);

        res.status(201).json({
            message: 'Doctor created successfully',
            doctor,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: 'Error creating doctor',
        });
    }
};

module.exports = createDoctor;