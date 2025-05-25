const express = require('express');
const router = express.Router();
const { getAdmin } = require('../services/admin/adminService')
<<<<<<< HEAD

router.get('/', (req, res, next) => {
=======
const { authMiddleware } = require('../Utils/SessionUtils.js');

router.get('/', authMiddleware, (req, res, next) => {
>>>>>>> 5d8d300 (Medication & history pages added, a type of authentication with global implemented, account update info in progress Vini initialized admin implementation)
    res.render('admin');
});

router.post('/', async(req, res, next) => {
    const user = req.body;
    const adminFound = await getAdmin(user);

<<<<<<< HEAD
    if (adminFound.length == 0) {
=======
    if (adminFound.length === 0) {
>>>>>>> 5d8d300 (Medication & history pages added, a type of authentication with global implemented, account update info in progress Vini initialized admin implementation)
        return res.status(404).json({ message: 'User is not admin' });
    }

    res.redirect('home');
})

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 5d8d300 (Medication & history pages added, a type of authentication with global implemented, account update info in progress Vini initialized admin implementation)
