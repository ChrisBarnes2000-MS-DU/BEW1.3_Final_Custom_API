/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = process.env.MONGO_HOST;
mongoose.Promise = global.Promise;
mongoose.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    // { useNewUrlParser: true },
    (err, db) => {
        assert.equal(null, err);
        console.log("Connected successfully to database");

        // db.close(); // turn on for testing
    }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;