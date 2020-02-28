const express = require('express');
const Quiz = require('../models/quizzes');

const router = express.Router(); // eslint-disable-line new-cap

// QUIZ INDEX
router.get('/', (req, res) => {
    Quiz.find().lean().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err.message);
    });
});

module.exports = router;
