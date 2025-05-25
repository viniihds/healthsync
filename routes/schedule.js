const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');

router.get('/', authMiddleware, (req, res, next) => {
    const medications = Array(4).fill({
        name: 'Paracetamol',
        frequency: '6 hours',
        days: 20,
        firstTime: '05/04/2025 - 18:00',
        nextTime: '08/04/2025 - 04:00'
    });

    res.render('schedule', { medications });
});

module.exports = router;
