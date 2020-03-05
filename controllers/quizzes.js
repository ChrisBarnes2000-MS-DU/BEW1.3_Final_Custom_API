const express = require('express');
const Topic = require('../models/topics');
const Quiz = require('../models/quizzes');
const questionRouter = require('./questions');

const router = express.Router(); // eslint-disable-line new-cap

// QUIZZES INDEX
router.get('/', (req, res) => {
    Quiz.find().lean().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err.message);
    });
});


// GET SPECIFIC QUIZ
router.get('/:quizID', (req, res) => {
    let quizID = req.params.quizID
    Quiz.findOne({ quizID: quizID }).then(result => {
        res.json(result);
    })
})


// CREATE A QUIZ
router.post("/new", (req, res) => {
    let topicID = req.topicID;
    if (!req.user) {
        return res.status(401); // UNAUTHORIZED
    } else {
        // INSTANTIATE INSTANCE OF MODEL
        const quiz = new Quiz(req.body);
        
        // SAVE INSTANCE OF Quiz MODEL TO DB
        quiz.save().then(() =>{
            return Topic.findOne({ _id: topicID });
        }).then(topic => {
            topic.quizzes.unshift(quiz)
            topic.save()
            res.json(quiz)
            // res.redirect(`/`);
        }).catch(err => { console.log(err) });
    return done()
    }
});


// UPDATE SPECIFIC QUIZ
router.put("/:quizID", (req, res) => {
    if (!req.user) {
        return res.status(401); // UNAUTHORIZED
    } else {
        Quiz.findOneAndUpdate({ quizID: req.params.quizID }).then(quiz => {
            quiz.name = req.body.name;
            quiz.summary = req.body.summary;
            quiz.save();
        }).then(topic => {
            topic.quizzes.pop(question);
            topic.quizzes.unshift(question);
            res.json((topic, quiz));
            // res.redirect(`/`);
            return topic.save();
        }).catch(err => {
            console.log(err.message);
        });
    }
});


// DELETE SPECIFIC QUIZ
router.delete("/:quizID", (req, res) => {
    let topicID = req.topicID;
    if (!req.user) {
        return res.status(401); // UNAUTHORIZED
    } else {
        // Delete INSTANCE OF Quiz MODEL TO DB
        quiz = Quiz.findOneAndDelete({ quizID: req.params.quizID })
            .then(() => {
                return Topic.findOne({ _id: topicID });
            })
            .then(topic => {
                topic.quizzes.pop(quiz);
                res.json(topic);
                // res.redirect(`/`);
                return topic.save();
            })
            .catch(err => {
                console.log(err);
            });
    }
});


//------------ QUESTIONS ROUTES ------------\\
router.use('/:quizID/questions', function (req, res, next) {
    req.quizID = req.params.quizID;
    next()
}, questionRouter);


module.exports = router;
