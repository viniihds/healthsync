var express = require('express');
var router = express.Router();

const { createUser } = require("../../services/register/registerService");

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', async (req, res, next) => {
    const user = req.body;

    const createdUser = await createUser({ user });

    if (!createdUser) {
        return res.status(400).json({ message: 'Error creating user' });
    }

    res.render('index');
})

module.exports = router;
