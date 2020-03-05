const express = require('express');
const Quiz = require('../models/quizzes');
const Question = require('../models/questions');

const router = express.Router(); // eslint-disable-line new-cap

// QUESTIONS INDEX
router.get('/', (req, res) => {
    Question.find().lean().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err.message);
    });
});


// CREATE A NEW QUESTION
router.post("/new", (req, res) => {
    if (!req.user) {
        return res.status(401); // UNAUTHORIZED
    } else {
        // INSTANTIATE INSTANCE OF MODEL
        // const quiz = Quiz.findOne({ name: req.name });
        const question = new Question(req.body);

        // SAVE INSTANCE OF Quiz MODEL TO DB
        question.save().then(quiz => {
                // quiz.questions.unshift(question);
                quiz.save();
                res.json(quiz);
                // res.redirect(`/`);
                return done(quiz)
            }).catch(err => { console.log(err); });
        }
});


// GET SPECIFIC QUESTION
router.get('/:questionID', (req, res) => {
    Quiz.findOne({ name: req.params.name }).then(result => {
        res.json(result);
    })
})


// Submit each question
// router.post('/:questionID', (req, res) => {
//     Question.find({ questionID: req.params.questionID }).then(quiz => {
//         questions.answers_given.pop(question);
//         res.json((quiz, question));
//         // res.redirect(`/`);
//         return topic.save();
//     }).catch(err => {
//         console.log(err.message);
//     });
// })

module.exports = router;
