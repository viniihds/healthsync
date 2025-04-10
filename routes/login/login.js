const express = require('express');
const router = express.Router();

const { getUser } = require('../../services/login/loginService');

router.get('/', (req, res, next) => {
    res.render('login');
});

router.post('/', async (req, res, next) => {
    const user = req.body;

    const userFound = await getUser(user);

    if (userFound.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.redirect('home');
})

module.exports = router;
