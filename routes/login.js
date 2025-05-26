const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../Utils/UserUtils');

const handleLogin = async(res, user) => {
    const response = await getUser(user);

    if (typeof response == 'string') {
        return res.redirect('/login', { message: 'No user found' });
    }

    res.redirect('/');
};

const handleRegistration = async(res, user) => {
    const response = await createUser(user);

    if (typeof response == 'string' || !response) {
        return res.redirect('/login', { message: response });
    }

    res.redirect('/home');
};

router.get('/', (req, res, next) => {
    global.user = undefined;
    res.render('login',  { message: '' });
});

router.post('/', async(req, res, next) => {
    const user = req.body;

    if (parseInt(user.type) === 1) {
        await handleLogin(res, user);
    } else {
        await handleRegistration(res, user);
    }
});

module.exports = router;