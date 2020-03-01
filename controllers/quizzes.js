const express = require('express');
const Topic = require('../models/topics');
const Quiz = require('../models/quizzes');
// const Question = require('../models/questons');

const router = express.Router(); // eslint-disable-line new-cap

// QUIZ INDEX
router.get('/', (req, res) => {
    Quiz.find().lean().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err.message);
    });
});


// GET SPECIFIC QUIZ
router.get('/:name', (req, res) => {
    Quiz.findOne({ name: req.params.name }).then(result => {
        res.json(result);
    })
})


// CREATE A NEW QUESTION
router.post("/:name/question/new", (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const question = new Question(req.body);

    // SAVE INSTANCE OF Quiz MODEL TO DB
    question
        .save()
        .then(quiz => {
            return Quiz.findOne({ name: req.params.name });
        })
        .then(quiz => {
            quiz.questions.unshift(question);
            return quiz.save();
        })
        .then(quiz => {
            res.json(quiz);
            // res.redirect(`/`);
        })
        .catch(err => {
            console.log(err);
        });
});


module.exports = router;
