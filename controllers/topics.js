const express = require('express');
const User = require('../models/user');
const Topic = require('../models/topics');
const quizRoutes = require('./quizzes');

const router = express.Router(); // eslint-disable-line new-cap

// TOPICS INDEX
router.get('/', (req, res, next) => {
    Topic.find().lean().then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err.message);
    })
});


// GET SPECIFIC TOPIC
router.get('/:title', (req, res, next) => {
    let mytitle = req.params.title
    Topic.findOne({ title: mytitle }).then(result => {
        res.json(result)
    })
});


// CREATE A TOPIC
router.post("/new", (req, res) => {
    if (req.user) {
        const topic = new Topic(req.body);
        // topic.author = req.user._id;
        topic.save().then(() => {
                return User.findById(req.user._id);
            }).then(user => {
                user.topics.unshift(topic);
                user.save();
                // REDIRECT TO THE NEW POST
                res.json(topic)
                // res.redirect(`/topics/${topic.title}`);
            }).catch(err => { console.log(err.message); });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});


// UPDATE SPECIFIC TOPIC
router.put("/:title", (req, res) => {
    if (req.user) {
        Topic.findOneAndUpdate({ title: req.params.title }).then(topic => {
            topic.title = req.body.title;
            // topic.summary = req.body.summary;
            topic.save();
            res.json(topic);
            // res.status(200);
        // }).then(author => {
        //     author.topics.pop(topic);
        //     author.topics.unshift(topic);
        //     res.json((Topic, author));
        //     // res.redirect(`/`);
        //     return author.save();
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
            .then(() => {
                return User.findById(req.user._id);
            })
            // .then(author => {
            //     author.topics.pop(topic);
            //     res.json(author);
            //     // res.redirect(`/`);
            //     return author.save();
            // })
            .catch(err => {
                console.log(err);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});



//------------ QUIZ ROUTES ------------\\
router.use('/:title/quizzes', function (req, res, next) {
    req.title = req.params.title;
    next()
}, quizRoutes);


module.exports = router;
