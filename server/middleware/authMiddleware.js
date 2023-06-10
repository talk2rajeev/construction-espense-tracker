
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({msg: 'invalid TOKEN'});
            next();
        });
    } else {
        res.status(401).json({msg: 'TOKEN Not Found'});
    }
}

module.exports = authMiddleware;