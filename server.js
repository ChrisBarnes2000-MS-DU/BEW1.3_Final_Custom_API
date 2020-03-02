//=================================INITIAL=================================\\
require('dotenv').config();

const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');

const app = require('./config/express');
const router = require('./controllers/routes');

// Set db
require('./data/quiz-api-db');

//=================================MIDDLEWARE=================================\\

app.use(cookieParser());

const checkAuth = require('./utils/checkAuth');

app.use(checkAuth());

//=================================CONTROLLERS=================================\\

app.use(router);

//=================================LISTEN=================================\\
//To run tests export our app variables that mocha needs in order to successfully run our tests.
module.exports = app;

// Start Server
app.listen(PORT, () => {
    console.log(`Custom Quiz API listening on port localhost:${PORT}!`);
});
