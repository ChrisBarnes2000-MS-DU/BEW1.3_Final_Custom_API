const express = require('express');
const topicRoutes = require('./topics');
const authRoutes = require('./auth');

const router = express.Router();

// INDEX
router.get("/", (req, res) => {
    res.render("index");
});


// ABOUT PAGE
router.get('/about', (req, res) => {
    res.send({ message: 'This was design to be a functioning Quiz API!' });
});


// PROFILES
router.get('/profile/:username', (req, res) => {
    const currentUser = req.user;
    Topic.find({ username: req.params.username }).populate({ path: 'comments', populate: { path: 'username' } }).populate('username')
        .lean()
        .then(topics => {
            res.render('topics-index', { topics, currentUser });
        }).catch(err => {
            console.log(err.message);
        })
})


// AUTHENTICATION ROUTES
router.use('/auth', authRoutes);


// TOPIC ROUTES
router.use('/topics', topicRoutes);


module.exports = router;