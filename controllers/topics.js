const express = require('express');
const User = require('../models/user');
const Topic = require('../models/topics');
const Quiz = require('../models/quizzes');
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


// CREATE A TOPIC
router.post("/new", (req, res) => {
    if (req.user) {
        const topic = new Topic(req.body);
        topic.author = req.user._id;
        topic.save().then(() => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.topics.unshift(topic);
                user.save();
                // REDIRECT TO THE NEW POST
                res.json(topic)
                // res.redirect(`/topics/${topic.title}`);
            }).catch(err => {
                console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});


// GET SPECIFIC TOPIC
router.get('/:title', (req, res) => {
    Topic.findOne({ title: req.params.title }).then(result => {
        res.json(result);
    })
})


// UPDATE SPECIFIC TOPIC
router.put("/:title", (req, res) => {
    if (req.user) {
        Topic.findOneAndUpdate({ title: req.params.title }).then(topic => {
            topic.title = req.body.title;
            // topic.summary = req.body.summary;
            topic.save();
            res.json(topic);
            // res.status(200);
        }).then(author => {
            author.topics.pop(topic);
            author.topics.unshift(topic);
            res.json((Topic, author));
            // res.redirect(`/`);
            return author.save();
        }).catch (err => {
            console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});


// DELETE SPECIFIC TOPIC
router.delete("/:title", (req, res) => {
    if (req.user) {
        topic = Topic.findOneAndDelete({ title: req.params.title })
            .then(user => {
                return User.findById(req.user._id);
            })
            .then(author => {
                author.topics.pop(topic);
                res.json(author);
                // res.redirect(`/`);
                return author.save();
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});





//------------ QUIZ ROUTES ------------\\
router.use('/:title/quizzes', quizRoutes);



// CREATE A QUIZ
router.post("/:title/quizzes/new", (req, res) => {
    if (!req.user) {
        return res.status(401); // UNAUTHORIZED
    } else {
        // INSTANTIATE INSTANCE OF MODEL
        const quiz = new Quiz(req.body);
        const topic = Topic.findOne({ title: req.params.title });

        // SAVE INSTANCE OF Quiz MODEL TO DB
        quiz.save().then(topic => {
                topic.quizzes.unshift(quiz)
                topic.save()
                res.json(quiz)
                // res.redirect(`/`);
                return document()
            }).catch(err => { console.log(err) });
    }
});


// DELETE SPECIFIC QUIZ
router.delete("/:title/quizzes/:name", (req, res) => {
    if (req.user) {
        // Delete INSTANCE OF Quiz MODEL TO DB
        quiz = Quiz.findOneAndDelete({ name: req.params.name })
            .then(topic => {
                return Topic.findOne({ title: req.params.title });
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
    } else {
        return res.status(401); // UNAUTHORIZED
    }

});


module.exports = router;
