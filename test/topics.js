// test/Topics.js
const server = require("./../server");
const User = require('../models/user')
const Topic = require('../models/topics');
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
    done()
});


const sampleUser = {
    username: 'topicstest',
    password: 'testtopic',
};


user = new User(sampleUser)
user.save()


// Topic that we'll use for testing purposes
const initTopic = {
    title: 'Test-Topic-Init',
    author: user,
    // summary: 'topic summary',
};


const newTopic = {
    title: 'Test-Topic-New',
    author: user,
    // summary: 'topic summary',
};


describe('Topics', () => {
    afterEach((done) => {
        promise1 = Topic.findOneAndRemove({'title': 'Test-Topic-New'})
        promise2 = Topic.findOneAndRemove({'title': 'Test-Topic-Init'})
        promise3 = User.findOneAndRemove({ username: 'topicstest' })
        Promise.all([promise1, promise2, promise3]).then(() => done())
    });


    it("Should have list page in json for Topics", (done) => {
        agent.get("/topics")
            .end((err, res) => {
                if (err) {return done(err)};
                res.status.should.be.equal(200);
                return done();
            });
    });


    // it("Should be able to Create a new Topic", (done) => {
    //     // Checks how many topics there are now
    //     Topic.estimatedDocumentCount().then((initialCount) => {
    //         agent.post("/topics/new")
    //             // This line fakes a form post,
    //             // since we're not actually filling out a form
    //             .set("content-type", "application/x-www-form-urlencoded")
    //             // Make a request to create another
    //             .send(newTopic)
    //             .then((res) => {
    //                 Topic.estimatedDocumentCount()
    //                     .then((newCount) => {
    //                         // Check that the database has one more topic in it
    //                         expect(res).to.have.status(200)
    //                         // Check that the database has one more topic in it
    //                         expect(newCount).to.be.equal(initialCount + 1)
    //                         return done();
    //                     }).catch((err) => { done(err) });
    //                 console.log(res)
    //             }).catch((err) => { done(err) });
    //     }).catch((err) => { done(err) });
    // });


// }).catch((err) => { done(err) });


    it("Should have Details about a Topic in json", (done) => {
        topic = new Topic(initTopic);
        topic.save().then((topic) => {
            agent.get("/topics/Test-Topic-Init")
                .end((err, res) => {
                    if (err) { return done(err) };
                    expect(res.body.title).to.equal("Test-Topic-Init");
                    assert.equal(res.body.title, "Test-Topic-Init");
                    res.status.should.be.equal(200);
                    return done()
                })
        }).catch((err) => { done(err) });
    });


    // it("Should be able to Update a Topic", (done) => {
    //     topic = new Topic(initTopic);
    //     topic.save().then((topic) => {
    //         console.log("\n\n",topic,"\n\n")
            
    //         agent.put("/topics/Test-Topic-Init")
    //         .send(newTopic)
    //             .end((err, res) => {
    //                 if (err) { return done(err) };
    //                 expect(res.body.title).to.equal("Test-Topic-New");
    //                 assert.equal(res.body.title, "Test-Topic-New");
    //                 res.status.should.be.equal(200);
    //                 return done()
    //             })
    //     }).catch((err) => { done(err) });
    // });


    // it("Should be able to Delete a Topic", (done) => {
    //     topic = new Topic(initTopic);
    //     topic.save()
    //     agent.delete("/topics/Test-Topic-Init")
    //         .then((err, res) => {
    //             if (err) { return done(err) };
    //             expect(res.body.title).to.equal(undefined);
    //             assert.equal(res.body.title, undefined);
    //             res.status.should.be.equal(200);
    //             return done()
    //         })
    //         // console.log("you fucked up", res)
    // });

});

