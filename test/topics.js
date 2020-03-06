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


// Topic that we'll use for testing purposes
const initTopic = {
    title: 'Test-Topic-Init',
    // summary: 'topic summary',
};


const newTopic = {
    title: 'Test-Topic-New',
    // summary: 'topic summary',
};


describe('Topics', () => {
    before( (done) => {
        user = new User(sampleUser)
        user.save()
        return done()
    })

    afterEach((done) => {
        promise1 = Topic.findOneAndRemove({'title': 'Test-Topic-New'})
        promise2 = Topic.findOneAndRemove({'title': 'Test-Topic-Init'})
        Promise.all([promise1, promise2]).then(() => done())
    });


    it("Should have list page in json for Topics", (done) => {
        agent.get("/topics")
            .end((err, res) => {
                if (err) {return done(err)};
                res.status.should.be.equal(200);
                return done();
            });
    });


    it('Should POST a new Topic', (done) => {
        agent.post('/topics/new')
            .set("content-type", "application/x-www-form-urlencoded")
            // .set('jwttoken', jwt.sign({ username: 'topicstest' }, process.env.JWT_SECRET))
            .send(initTopic)
            .then(res => {
                assert.equal(res.status, 200)
                assert.equal(res.body.title, 'Test-Topic-Init')
                assert.isNotEmpty(res.body._id)

                // make sure data actually got added to the database
                Dog.find({ name: 'Test-Topic-Init' }).then(result => {
                    assert.equal(result.length, 1)
                })
                return done()
            }).catch(err => {
                return done(err)
            })
    })


    it("Should have Details about a Topic in json", (done) => {
        topic = new Topic({ title: 'Test-Topic-Init', author: user});
        topic.save().then((topic) => {
            agent.get("/topics/Test-Topic-Init")
                .end((err, res) => {
                    if (err) { return done(err) };
                    res.status.should.be.equal(200);
                    return done()
                })
        }).catch((err) => { done(err) });
    });


    it("Should be able to Update a Topic", (done) => {
        topic = new Topic({ title: 'Test-Topic-Init', author: user });
        topic.save().then((topic) => {
            agent.put("/topics/Test-Topic-Init")
            .send(newTopic)
                .end((err, res) => {
                    if (err) { return done(err) };
                    expect(res.body.title).to.equal("Test-Topic-New");
                    assert.equal(res.body.title, "Test-Topic-New");
                    res.status.should.be.equal(200);
                    return done()
                })
            return done()
        }).catch((err) => { done(err) });
    });


    it("Should be able to Delete a Topic", (done) => {
        topic = new Topic({ title: 'Test-Topic-Init', author: user });
        topic.save()
        agent.delete("/topics/Test-Topic-Init")
            .then((err, res) => {
                if (err) { return done(err) };
                expect(res.body.title).to.equal(undefined);
                assert.equal(res.body.title, undefined);
                res.status.should.be.equal(200);
                return done()
            })
        return done()
    });


    after( (done) => {
        User.findOneAndRemove({ username: 'topicstest' }).then(() => done())
    })
});

