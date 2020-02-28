const express = require('express');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
    res.send("You're seeing the authentication routes");
});

// SIGN UP FORM
router.get("/sign-up", (req, res) => {
    res.send("You're seeing the sign up");
    // res.render("sign-up");
});

// SIGN UP POST
router.post("/sign-up", (req, res) => {
    // Create User and JWT
    const user = new User(req.body);

    user.save().then((user) => {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "60 days" });
        res.cookie('jwttoken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
    }).catch(err => {
        console.log(err.message);
        return res.status(400).send({err: err});
    });
});

// // LOGIN FORM
// router.get('/login', (req, res) => {
//     res.render('login');
// });

// // LOGIN
// router.post("/login", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     // Find this user name
//     User.findOne({ username }, "username password")
//         .then(user => {
//             if (!user) {
//                 // User not found
//                 return res.status(401).send({ message: "Wrong Username or Password" });
//             }
//             // Check the password
//             user.comparePassword(password, (err, isMatch) => {
//                 if (!isMatch) {
//                     // Password does not match
//                     return res.status(401).send({ message: "Wrong Username or password" });
//                 }
//                 // Create a token
//                 const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
//                     expiresIn: "60 days"
//                 });
//                 // Set a cookie and redirect to root
//                 res.cookie("jwttoken", token, { maxAge: 900000, httpOnly: true });
//                 res.redirect("/");
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });

// LOGIN
router.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username }, "username password")
        .then(user => {
            if (!user) {
                // User not found
                return res.status(401).send({ message: "Wrong Username or Password" });
            }
            // Check the password
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    // Password does not match
                    return res.status(401).send({ message: "Wrong Username or password" });
                }
                // Create a token
                const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
                    expiresIn: "60 days"
                });
                // Set a cookie and redirect to root
                res.json({ 'jwttoken': token })
            });
        })
        .catch(err => {
            console.log(err);
        });
})

// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = router;
