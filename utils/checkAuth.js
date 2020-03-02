const jwt = require('jsonwebtoken');

module.exports = checkAuth => {
    return (req, res, next) => {
        if (typeof req.cookies.jwtToken === "undefined" || req.cookies.jwtToken === null) {
            req.user = null;
        } else {
            const token = req.cookies.jwtToken;
            const decodedToken = jwt.decode(token, { complete: true }) || {};
            req.user = decodedToken.payload;
        }
        next();
    };
}