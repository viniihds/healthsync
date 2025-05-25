const express = require('express');
const router = express.Router();
const { getAdmin } = require('../services/admin/adminService')

router.get('/', (req, res, next) => {
    res.render('admin');
});

router.post('/', async(req, res, next) => {
    const user = req.body;
    const adminFound = await getAdmin(user);

    if (adminFound.length == 0) {
        return res.status(404).json({ message: 'User is not admin' });
    }

    res.redirect('home');
})

module.exports = router;
