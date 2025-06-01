const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');
const { getAllMedications, createMedication, deleteMedication } = require("../Utils/MedicationUtils");

router.get('/', authMiddleware, async(req, res, next) => {
    const medications = await getAllMedications();

    res.render('medication', { medications: medications });
});

router.post('/', authMiddleware, async(req, res, next) => {
    const medication = req.body;
    await createMedication(medication);

    res.redirect('/medication');
})

router.delete('/', authMiddleware, async(req, res, next) => {
    const med = req.body.cdmedication;
    const response = await deleteMedication(med);

    if (typeof response === 'string') {
        return res.status(409).send(response);
    }

    res.sendStatus(200);
});

module.exports = router;