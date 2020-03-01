const express = require('express');
const Quiz = require('../models/quizzes');
const Topic = require('../models/topics');
const quizRoutes = require('./quizzes');

const router = express.Router(); // eslint-disable-line new-cap

// TOPICs INDEX
router.get('/', (req, res) => {
    Topic.find().lean().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err.message);
    });
});


// GET specific topic
router.get('/:title', (req, res) => {
    Topic.findOne({ title: req.params.title }).then(result => {
        res.json(result);
    })
})


// CREATE
router.post("/new", (req, res) => {
    // if (req.user) {
    const topic = new Topic(req.body);
    // topic.author = req.user._id;
    topic
        .save()
        .then(topic => {
            // return User.findById(req.user._id);
            res.json(topic)
        })
        // .then(user => {
        //     // user.topics.unshift(topic);
        //     // user.save();
        //     // REDIRECT TO THE NEW POST
        //     // res.redirect(`/topics/${topic.title}`);
        // })
        .catch(err => {
            console.log(err.message);
        });
    // } else {
    //     return res.status(401); // UNAUTHORIZED
    // }
});


// CREATE Quiz
router.post("/:title/quizzes/new", function (req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const quiz = new Quiz(req.body);

    // SAVE INSTANCE OF Quiz MODEL TO DB
    quiz
        .save()
        .then(topic => {
            return Topic.findOne({ title: req.params.title });
        })
        .then(topic => {
            topic.quizzes.unshift(quiz);
            return topic.save();
        })
        .then(topic => {
            res.json(topic);
            // res.redirect(`/`);
        })
        .catch(err => {
            console.log(err);
        });
});


// QUIZ ROUTES
router.use('/:title/quizzes', quizRoutes);

module.exports = router;
