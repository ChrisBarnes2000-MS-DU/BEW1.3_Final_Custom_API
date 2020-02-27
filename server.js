//=================================INITIAL=================================\\
require('dotenv').config();
const express = require('express');


// Set db
require('./data/quiz-db');

const app = express();
const PORT = process.env.PORT;

const exphbs = require('express-handlebars').create({ extname: 'hbs' });
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');

//=================================MIDDLEWARE=================================\\



app.use(cookieParser());

// Handlebars
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
// app.use(expressValidator());

//=================================CONTROLLERS=================================\\

//Quiz App
require('./controllers/quizzes.js')(app);




//=================================LISTEN=================================\\
//To run tests export our app variables that mocha needs in order to successfully run our tests.
module.exports = app;

// Start Server
app.listen(PORT, () => {
    console.log(`Custom Quiz API listening on port localhost:${PORT}!`);
});
