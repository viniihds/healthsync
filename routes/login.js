const express = require('express');
const router = express.Router();

const { getUser, createUser } = require('../Utils/UserUtils');

const handleLogin = async(res, user) => {
    const { userFound, token } = await getUser(user);

    if (!Array.isArray(userFound)) {
        return res.status(404).json({ message: 'User not found' });
    } else {
        res.json(token);
    }
}

const handleRegistration = async(res, user) => {
    const createdUser = await createUser(user);

    if (typeof createdUser == 'string' || !createdUser) {
        return res.status(400).json({ message: createdUser });
    }
}

router.get('/', (req, res, next) => {
    res.render('login');
});

/**
 * Mesma rota do cadastro
 */
router.post('/', async(req, res, next) => {
    const user = req.body;

    console.log(JSON.stringify(user, null, 2));
    if (parseInt(user.type) === 1) {
        await handleLogin(res, user)
    } else {
        await handleRegistration(res, user)
    }

    res.redirect('home');
})

module.exports = router;
