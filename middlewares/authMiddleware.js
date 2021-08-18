const jwt = require('jsonwebtoken');
const createError = require('http-errors');

//authentication middleware
exports.authenticated = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) throw (createError(401));
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
        };
    });
    next();
};

exports.guest = (req, res, next) => {
    let token = req.headers['َauthorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return next();
        throw createError(403);
    });
};