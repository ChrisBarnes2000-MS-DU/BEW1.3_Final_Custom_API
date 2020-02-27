const server = require("../server.js");
const User = require('../models/user.js')
const mongoose = require('mongoose');
const chaiHttp = require("chai-http");
const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
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

sampleUser = {
    username: 'testuser',
    password: 'somepassword'
}

// ---------------------------------

describe('## Auth', () => {
    afterEach((done) => {
        User.findOneAndRemove({ username: 'testuser' })
            .then(() => done())
    })

    it("should not be able to login if they have not registered", function (done) {
        agent.post("/login", { email: "wrong@wrong.com", password: "nope" }).end(function (err, res) {
            res.status.should.be.equal(401);
            done();
        });
    });

    it('should be able to sign up', (done) => {
        chai.request(server)
            .post('/auth/sign-up')
            .send(sampleUser)
            .then(res => {
                assert.equal(res.status, 200)
                assert.exists(res.body.jwttoken)

                User.find({ username: 'testuser' }).then(result => {
                    assert.equal(result.length, 1)
                })
                return done()
            }).catch(err => {
                return done(err)
            })
    })

    it('should be able to log in', (done) => {
        let user = new User(sampleUser)
        user.save().then(savedUser => {
            chai.request(server)
                .post('/auth/login')
                .send(sampleUser)
                .then(res => {
                    console.log(res.body)
                    assert.equal(res.status, 200)
                    assert.exists(res.body.jwttoken)
                    agent.should.have.cookie("nToken");
                    return done()
                }).catch(err => {
                    console.log(err)
                    return done(err)
                })
        })
    })

    // logout
    it("should be able to logout", function (done) {
        agent.get("/logout").end(function (err, res) {
            res.should.have.status(200);
            agent.should.not.have.cookie("nToken");
            done();
        });
    });

    after(function () {
        agent.close()
    }); 

});