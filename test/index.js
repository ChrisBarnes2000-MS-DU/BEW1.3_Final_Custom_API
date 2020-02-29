const server = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Site", () => {
    it("Should have home page", (done) => {
        chai
            .request(server)
            .get("/")
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done();
            });
    });

    it("Should have about page", (done) => {
        chai
            .request(server)
            .get("/about")
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done();
            });
    });
});