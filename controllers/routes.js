const quizRoutes = require('./quizzes');
const authRoutes = require('./auth');


module.exports = app => {
    // INDEX
    app.get("/", (req, res) => {
        res.render("index");
    });

    // ABOUT PAGE
    app.get('/about', (req, res) => {
        res.send({ message: 'This was design to be a functioning Quiz API!' })
    })

    // AUTHENTICATION ROUTES
    app.use('/auth', authRoutes);

    // QUIZ ROUTES
    app.use('/quiz', quizRoutes);

};