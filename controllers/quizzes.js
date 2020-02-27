const Quiz = require('../models/quizzes.js');

module.exports = app => {
    // About
    app.get('/about', (req, res) => {
        res.send({ message: 'This was design to be a functioning Quiz API!' })
    })

    // INDEX
    app.get('/', (req, res) => {
        Quiz.find().then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err.message);
        })
    })
};