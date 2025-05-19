const jwt = require('jsonwebtoken');

const JWT_SECRET = 'segredo';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
};

module.exports = { authMiddleware, JWT_SECRET };