const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils')

router.get('/', authMiddleware, (req, res) => {
    res.render('history');
});

module.exports = router;