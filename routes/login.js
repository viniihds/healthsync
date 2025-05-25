const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../Utils/UserUtils');

const handleLogin = async(res, user) => {
    const userFound = await getUser(user);

    if (typeof userFound == 'string') {
        return res.render('login', { message: 'No user found' });
    } else {
        global.user = userFound;
        console.log('dwa');
    }

    res.redirect('/');
};

const handleRegistration = async(res, user) => {
    const response = await createUser(user);

    if (typeof response == 'string' || !response) {
        return res.redirect('login', { message: response });
    } else {
        console.log('adddcc');
        global.user = response;
    }

    res.redirect('/');
};

router.get('/', (req, res, next) => {
    global.user = undefined;
    res.render('login',  { message: '' });
});

router.post('/', async(req, res, next) => {
    const user = req.body;

    console.log(JSON.stringify(user, null, 2));
    if (parseInt(user.type) === 1) {
        await handleLogin(res, user)
    } else {
        await handleRegistration(res, user)
    }
});

module.exports = router;