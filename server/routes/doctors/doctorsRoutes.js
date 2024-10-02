const express = require('express');
const createDoctor = require('../../controllers/doctorForm.controller.js');
const uploadFields = require('../../middlewares/multerConfig.middleware.js');

const router = express.Router();

router.post('/', uploadFields, createDoctor);

module.exports = router;