var express = require('express');
var router = express.Router();

const { getUser } = require("../../services/login/loginService");

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', async (req, res, next) => {
    const user = req.body;

    const userFound = await getUser(user);

    if (userFound.length === 0) {
        return res.status(400).json({ message: 'User not found' });
    }

    res.render('index');
})

module.exports = router;
