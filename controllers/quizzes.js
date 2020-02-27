const Quiz = require('../models/quizzes');

module.exports = app => {
    // QUIZ INDEX
    app.get('/', (req, res) => {
        Quiz.find().then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err.message);
        })
    })
};