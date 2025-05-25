const express = require('express');
const router = express.Router();
const { updateUser } = require('../Utils/UserUtils');
const { authMiddleware } = require('../Utils/SessionUtils.js');

router.post('/', authMiddleware, async(req, res, next) => {
    const user = req.body;
    const response = await updateUser(user);

    if (typeof (response) === 'string') {
        return res.render('account', { message: response });
    }

    res.redirect('acount');
});

module.exports = router;
