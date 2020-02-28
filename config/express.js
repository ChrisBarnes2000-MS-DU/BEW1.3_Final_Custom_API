const express = require('express');
const exphbs = require('express-handlebars').create({ extname: 'hbs' });
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../controllers/routes');

const app = express();

// Handlebars
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS - Cross Origin Resource Sharing.
app.use(cors());

// Add after body parser initialization!
app.use(expressValidator());

// Mount all routes on /api path.
app.use('/api', routes);

// #TODO: Additional non-API routes go here.

module.exports = app;
