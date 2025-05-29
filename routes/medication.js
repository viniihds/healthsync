const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');
const { getAllMedications, createMedication } = require("../Utils/MedicationUtils");

router.get('/', authMiddleware, async(req, res, next) => {
    const medications = await getAllMedications();

    res.render('medication', { medications: medications });
});

router.post('/', authMiddleware, async(req, res, next) => {
    const medication = req.body;
    await createMedication(medication);

    res.redirect('/medication');
})

module.exports = router;