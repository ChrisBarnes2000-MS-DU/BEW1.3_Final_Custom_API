/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(
    url,
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true},
    (err, db) => {
        assert.equal(null, err);
        console.log("Connected successfully to database");

        // db.close(); // turn on for testing
    }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;