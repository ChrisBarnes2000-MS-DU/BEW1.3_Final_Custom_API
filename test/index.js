const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

// chai.config.includeStack = true;

chai.use(chaiHttp);

/**
 * root level hooks
 */
// after((done) => {
//     // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
//     mongoose.models = {};
//     mongoose.modelSchemas = {};
//     mongoose.connection.close();
//     done();
// });

describe("site", function () {
    // Describe what you are testing
    it("Should have home page", function (done) {
        // Describe what should happen
        // In this case we test that the home page loads
        chai
            .request(app)
            .get("/")
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done(); // Call done if the test completed successfully.
            });
    });
});