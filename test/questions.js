// test/Topics.js
const server = require("../server");
const User = require('../models/user')
const Topic = require('../models/topics');
const Quiz = require('../models/quizzes');
const Question = require('../models/questions');
const mongoose = require('mongoose');
const chaiHttp = require("chai-http");
const chai = require('chai');

const assert = chai.assert;
const expect = chai.expect;

chai.config.includeStack = true;
chai.use(chaiHttp);


// Agent that will keep track of our cookies
const agent = chai.request.agent(server);


/**
 * root level hooks
 */
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    agent.close()
    done();
});


const sampleUser = {
    username: 'questionstest',
    password: 'testquestions',
};


user = new User(sampleUser)
user.save()


// Topic that we'll use for testing purposes
const testTopic = {
    title: 'Test-Topic',
    // summary: 'topic summary',
    author: user,
};


const testQuiz = {
    name: 'Test-Quiz',
    summary: 'test summary',
};


const initQuestion = {
    question: 'Test-Quetion-Init',
    answers: ['yes', 'no', 'maybe', 'idk'],
    // answers_given: [],
    correts: ['yes'],
};


const newQuestion = {
    question: 'Test-Quetion-New',
    answers: ['you', 'can', 'change', 'answers'],
    // answers_given: [],
    correts: ['you', 'can', 'change', 'answers'],
};


describe('Quizzes', () => {
    before((done) => {
        topic = new Topic(testTopic)
        topic.save()
        quiz = new Quiz(testQuiz)
        quiz.save()
        return done()
    })


    afterEach((done) => {
        promise1 = Topic.findOneAndRemove({title: 'Test-Topic'})
        promise2 = Quiz.findOneAndRemove({ name: 'Test-Quiz',})
        promise2 = User.findOneAndRemove({ username: 'quizzestest' })
        Promise.all([promise1, promise2]).then(() => done())
    });


    it("Should have list page in json for Questions", (done) => {
        agent.get("/topics/Test-Topic/quizzes/Test-Quiz/questions")
            .end((err, res) => {
                if (err) {return done(err)};
                res.status.should.be.equal(200);
                return done();
            });
    });


    it("Should be able to Create a new Question", (done) => {
        // Checks how many topics there are now
        Quiz.estimatedDocumentCount().then( (initialCount) => {
            agent.post("/topics/Test-Topic/quizzes/Test-Quiz/questons/new")
                // This line fakes a form post,
                // since we're not actually filling out a form
                .set("content-type", "application/x-www-form-urlencoded")
                // Make a request to create another
                .send(initQuestion).then( (res) => {
                    Quiz.estimatedDocumentCount().then( (newCount) => {
                        // Check that the database has one more topic in it
                        expect(res).to.have.status(200)
                        // Check that the database has one more topic in it
                        expect(newCount).to.be.equal(initialCount + 1)
                        return done();
                    }).catch( (err) => {done(err)});
                }).catch((err) => {done(err)});
            return done()
        }).catch( (err) => {done(err)});
    });


    it("Should have Details about a Quiz in json", (done) => {
        agent.get("/topics/Test-Topic/quizzes/Test-QuizTest-Quiz/questons/Test-Question-New")
            .end((err, res) => {
                if (err) {return done(err)};
                res.status.should.be.equal(200);
                return done();
            });
    });


    it("Should be able to Update a Quiz", (done) => {
        const quesiton = new Quiz(initQuestion)
        agent.put("/topics/Test-Topic/quizzes/Test-Quiz-Init")
        .send(newQuestion)
        .then((res) => {
            res.body.name.should.be.equal("Test-Quiz-New");
            res.status.should.be.equal(200);
            return done()
        }).catch((err) => { done(err) });
        return done()
    });


    it("Should be able to Delete a Quiz", (done) => {
        agent.delete("/topics/Test-Topic/quizzes/Test-Quiz-New")
            .end((err, res) => {
                if (err) {return done(err)};
                res.status.should.be.equal(200);
                return done();
            });
        return done()
    });

});

