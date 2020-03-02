//=================================INITIAL=================================\\
require('dotenv').config();

const PORT = process.env.PORT;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = require('./config/express');
const router = require('./controllers/routes');

// Set db
require('./data/quiz-api-db');

//=================================MIDDLEWARE=================================\\

app.use(cookieParser());

const checkAuth = (req, res, next) => {
    console.log("Checking authentication")
    if (typeof req.cookies.jwtToken === "undefined" || req.cookies.jwtToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.jwtToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};

app.use(checkAuth);

//=================================CONTROLLERS=================================\\

app.use(router);

//=================================LISTEN=================================\\
//To run tests export our app variables that mocha needs in order to successfully run our tests.
module.exports = app;

// Start Server
app.listen(PORT, () => {
    console.log(`Custom Quiz API listening on port localhost:${PORT}!`);
});
