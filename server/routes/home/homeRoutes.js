const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const createDoctor = require('../../controllers/doctors/doctorForm.controller.js');
const router = express.Router();

const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;
        if (file.fieldname === 'profilePhoto') {
            uploadPath = 'uploads/doctors/photo/';
        } else if (file.fieldname === 'certificate') {
            uploadPath = 'uploads/doctors/certificates/';
        }

        ensureDirectoryExistence(uploadPath);

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/searchDoctors', async (req, res) => {
    const { city, search } = req.query;
});

router.get('/getPatientInformation')

router.post('/doctorsForm', 
    upload.fields([
        { name: 'profilePhoto', maxCount: 1 }, 
        { name: 'certificate', maxCount: 1 }
    ]), 
    createDoctor
);

module.exports = router;