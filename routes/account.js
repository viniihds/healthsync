const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');

router.get('/', authMiddleware, (req, res, next) => {
    const user = {
        cdUser: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        cellphone: '123-456-7890'
    };

    res.render('account', { user });
});

module.exports = router;
