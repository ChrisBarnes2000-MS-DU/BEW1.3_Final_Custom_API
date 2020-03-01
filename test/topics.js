// test/Topics.js
const server = require("./../server");
const User = require('../models/user')
const Topic = require('../models/topics');
const mongoose = require('mongoose');
const chaiHttp = require("chai-http");
const chai = require('chai');

const should = chai.should();
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
    title: 'topic title',
    // summary: 'topic summary',
};

const user = {
    username: 'topicstest',
    password: 'testposts',
};


describe('Topics', function () {
    // before(function (done) {
    //     agent
    //         .post('auth/sign-up')
    //         .set("content-type", "application/x-www-form-urlencoded")
    //         .send(user)
    //         .then(function (res) {
    //             done();
    //         })
    //         .catch(function (err) {
    //             done(err);
    //         });
    // });

//     it('Should create with valid attributes at POST /topics/new', function (done) {
//         // Checks how many topics there are now
//         Topic.estimatedDocumentCount()
//             .then(function (initialDocCount) {
//                 agent
//                     .post("/topics/new")
//                     // This line fakes a form post,
//                     // since we're not actually filling out a form
//                     .set("content-type", "application/x-www-form-urlencoded")
//                     // Make a request to create another
//                     .send(newTopic)
//                     .then(function (res) {
//                         Topic.estimatedDocumentCount()
//                         .then(function (newDocCount) {
//                                 // Check that the database has one more topic in it
//                                 // expect(res).to.have.status(200);
//                                 // Check that the database has one more topic in it
//                                 expect(newDocCount).to.be.equal(initialDocCount + 1)
//                                 done();
//                             })
//                             .catch(function (err) {
//                                 done(err);
//                             });
//                     })
//                     .catch(function (err) {
//                         done(err);
//                     });
//             })
//             .catch(function (err) {
//                 done(err);
//             });
//     });
//     after(function (done) {
//         Topic.findOneAndDelete(newTopic)
//             .then(function (res) {
//                 agent.close()

//                 User.findOneAndDelete({
//                     username: user.username
//                 })
//                     .then(function (res) {
//                         done()
//                     })
//                     .catch(function (err) {
//                         done(err);
//                     });
//             })
//             .catch(function (err) {
//                 done(err);
//             });
//     });
}); 


// How many topics are there now?
// Make a request to create another
// Check that the database has one more topic in it
// Check that the response is successful

