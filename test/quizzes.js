// test/Topics.js
const server = require("../server");
const User = require('../models/user')
const Topic = require('../models/topics');
const Quiz = require('../models/quizzes');
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
    done();
});


// Topic that we'll use for testing purposes
const newTopic = {
    title: 'Test-Topic',
    // summary: 'topic summary',
};


const initQuiz = {
    name: 'Test-Quiz-Init',
    // summary: 'topic summary',
};


const newQuiz = {
    name: 'Test-Quiz-New',
    // summary: 'topic summary',
};


const sampleUser = {
    username: 'quizzestest',
    password: 'testquizzes',
};


describe('Quizzes', () => {
    it('Re sign up', (done) => {
        agent.post('/auth/sign-up')
            .send(sampleUser)
            .then(res => {
                assert.equal(res.status, 200)
                assert.exists(res.body.jwtToken)
                // User.find({ username: 'quizzestest' }).then(result => {
                //     assert.equal(result.length, 1)
                // })
                return done()
            }).catch(err => {return done(err)});
    })


    it("Re Create a Topic", (done) => {
        agent.post("/topics/new")
            // This line fakes a form post,
            // since we're not actually filling out a form
            .set("content-type", "application/x-www-form-urlencoded")
            // Make a request to create another
            .send(newTopic)
            .then((res) => {
                expect(res).to.have.status(200)
                done();
            }).catch((err) => { done(err) });
    });


    it("Should have list page in json", (done) => {
        agent.get("/topics/Test-Topic/quizzes")
            .end((err, res) => {
                if (err) {return done(err)};
                res.status.should.be.equal(200);
                return done();
            });
    });


    it("Should be able to Create a new Topic", (done) => {
        // Checks how many topics there are now
        Topic.estimatedDocumentCount().then( (initialCount) => {
            agent.post("/topics/new")
                // This line fakes a form post,
                // since we're not actually filling out a form
                .set("content-type", "application/x-www-form-urlencoded")
                // Make a request to create another
                .send(initTopic)
                .then( (res) => {
                    Topic.estimatedDocumentCount()
                    .then( (newCount) => {
                        // Check that the database has one more topic in it
                        expect(res).to.have.status(200)
                        // Check that the database has one more topic in it
                        expect(newCount).to.be.equal(initialCount + 1)
                        done();
                    }).catch( (err) => {done(err)});
                }).catch((err) => {done(err)});
        }).catch( (err) => {done(err)});
    });


    it("Should have Details about a Quiz in json", (done) => {
        agent.get("/topics/Test-Topic/quizzes/Test-Quiz-New")
            .end((err, res) => {
                if (err) {return done(err)};
                res.status.should.be.equal(200);
                return done();
            });
    });


    // it("Should be able to Update a Topic", (done) => {
    //     agent.put("/topics/Test-Topic-Init")
    //     .send(newTopic)
    //         .end((err, res) => {
    //             if (err) {return done(err)};
    //             res.body.title.should.be.equal("Test-Topic-New");
    //             res.status.should.be.equal(200);
    //             return done();
    //         });
    // });


    // it("Should be able to Delete a Topic", (done) => {
    //     agent.delete("/topics/Test-Topic-New")
    //         .end((err, res) => {
    //             if (err) {return done(err)};
    //             res.status.should.be.equal(200);
    //             return done();
    //         });
    // });


    after( (done) => {
        User.findOneAndRemove({ username: 'quizzestest' })
            .then(() => done())
        Topic.findOneAndDelete(newTopic)
        .catch((err) => { done(err) });
        agent.close()
    });


});

