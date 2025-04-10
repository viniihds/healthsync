var express = require('express');
var router = express.Router();

const { createUser } = require("../../services/register/registerService");

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', async(req, res, next) => {
    const user = req.body;

    const createdUser = await createUser(user);

    if (typeof createdUser == 'string' || !createdUser) {
        return res.status(400).json({ message: createdUser });
    }

    res.redirect('home');
})

module.exports = router;
