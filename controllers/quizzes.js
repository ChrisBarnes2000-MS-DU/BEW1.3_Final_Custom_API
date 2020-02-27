module.exports = app => {
    // INDEX
    app.get('/', (req, res) => {
        res.send({ message: 'Quizzes will be displayed here!' })
    })
};