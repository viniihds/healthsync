const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');
const { getAllCategories, createCategory, deleteCategory } = require("../Utils/CategoryUtils");

router.get('/', authMiddleware, async(req, res, next) => {
    const categories = await getAllCategories();

    res.render('category', { categories: categories });
});

router.get('/fetchAll', authMiddleware, async(req, res, next) => {
    res.json(await getAllCategories());
})

router.post('/', authMiddleware, async(req, res, next) => {
    const category = req.body;

    await createCategory(category);

    res.redirect('/category');
});

router.delete('/', authMiddleware, async(req, res, next) => {
    const cdcategory = req.body.cdcategory;
    const response = await deleteCategory(cdcategory);

    if (typeof response === 'string') {
        return res.status(409).send(response);
    }

    res.sendStatus(200);
});

module.exports = router;