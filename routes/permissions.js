const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Utils/SessionUtils.js');
const { getAllUsers, changeUserPermission } = require("../Utils/UserUtils");
const permissionEnum = require('../enums/permissionEnum')

router.get('/', authMiddleware, async(req, res, next) => {
    const users = await getAllUsers();

    res.render('permissions', { users: users });
});

router.post('/:cduser/:permission', authMiddleware, async(req, res, next) => {
    const cduser = req.params.cduser;
    const permission = req.params.permission == permissionEnum.USER ? permissionEnum.ADMIN : permissionEnum.USER;

    await changeUserPermission(cduser, permission);
})

module.exports = router;