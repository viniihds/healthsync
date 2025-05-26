const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');

router.get('/', authMiddleware, async(req, res, next) => {
    res.render('medication');
});

module.exports = router;