const express = require('express');
const router = express.Router();

router.get('/searchDoctors', async (req, res) => {
    const { city, search } = req.query;
});



module.exports = router;