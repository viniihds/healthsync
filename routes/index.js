const express = require('express');
const { authMiddleware } = require('../Utils/SessionUtils');
const router = express.Router();

router.get('/', authMiddleware, (req, res, next) => {
  res.render('/');
});

module.exports = router;