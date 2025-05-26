const authMiddleware = (req, res, next) => {
    if (global.user === undefined) {
        console.log('No user logged in. Time: ' + new Date().toLocaleString());
        return res.render('login', { message: '' });
    }

    next();
};

module.exports = { authMiddleware };