const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');
const { getAllCategories } = require("../Utils/CategoryUtils");

router.get('/', authMiddleware, async(req, res, next) => {
    const categories = await getAllCategories();

    res.render('category', { categories: categories });
});

router.get('/fetchAll', authMiddleware, async(req, res, next) => {
    res.json(await getAllCategories());
})

router.post('/save', authMiddleware, async(req, res, next) => {
    const category = req.body;
    console.log(JSON.stringify(category, null, 2));
    res.redirect();
})

module.exports = router;