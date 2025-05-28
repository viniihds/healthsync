const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');
const {getAllmedications} = require("../Utils/MedicationUtils");

router.get('/', authMiddleware, async(req, res, next) => {
    const medications = await getAllmedications();

    res.render('medication', { medications: medications });
});

module.exports = router;