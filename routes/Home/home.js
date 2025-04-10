const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const pendingMeds = [
        { name: 'Paracetamol', date: '27/03', time: '11:55' },
        { name: 'Dipirona', date: '27/03', time: '15:30' }
    ];

    const scheduledMeds = Array(5).fill({
        name: 'Paracetamol',
        date: '27/03',
        time: '18:55'
    });

    res.render('home', { pendingMeds, scheduledMeds });
});

module.exports = router;
