const express = require('express');
const quizRoutes = require('./quizzes');
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

// AUTHENTICATION ROUTES
router.use('/auth', authRoutes);

// QUIZ ROUTES
router.use('/quiz', quizRoutes);

module.exports = router;