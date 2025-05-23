const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        cellphone: '123-456-7890'
    };

    res.render('account', { user });
});

module.exports = router;
