const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const { User } = require("../models/user");
const path = require('path');
const { restrictToLoggedinUserOnly } = require("../middleware/auth");
const router = express.Router();
router.use(express.static(__dirname));

// Set up session middleware
const passport = require('passport');
require("../service/passport");

router.use(session({
    secret: 'your_secret_key_here', // Change this to a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Change this to true if you're using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    }
}));
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/dashboard_cards.html');
});

router.get("/signup", (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/registration.html');
});

router.get("/login", (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/login.html');
});

router.get("/profile", restrictToLoggedinUserOnly, (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/profile.html');
});

router.get("/about", (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/about.html');
});

router.get("/sell", restrictToLoggedinUserOnly, (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/sell_coupan.html');
});

router.get("/purchase", restrictToLoggedinUserOnly, (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/purchase_coupan.html');
});

router.get("/category", (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/category.html');
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/login/auth/google", passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get("/login/auth/google/callback",
    function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            try {
                if (err) { throw err; }
                if (!user) { return res.redirect('/login/auth/google'); }
                req.logIn(user, async function (err) {
                    if (err) { throw err; }
                    req.session.isLoggedIn = true;
                    req.session.userId = user._id;
                    req.session.email = user.email;
                    const { provider, displayName, email, picture } = user;
                    const isExist = await User.findOne({ email });
                    if (!isExist) {
                        const name = displayName;
                        await User.create({ provider, name, email, picture });
                    }

                    console.log("google user is", user);
                    console.log(email, isExist); // Set session variable to true indicating user is logged in
                    return res.redirect('/');
                });
            } catch (error) {
                console.error("Error in Google OAuth callback:", error);
                return res.status(500).send("Internal Server Error");
            }
        })(req, res, next);
    }
);

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        console.log(user);
        if (!user) {
            return res.redirect('https://card-changer.onrender.com/HTML/login_clone.html');
        }

        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        req.session.email = user.email;
        console.log(req.session);
        return res.redirect("/");
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).send("Internal Server Error");
    }
});

router.post('/userExist', async (req, res) => {
    try {
        const Email = req.body.email;
        const newUser = await User.findOne({ email: Email });
        let exists = 'false';
        if (newUser) {
            exists = 'true';
        }
        console.log(exists);
        let name = req.body.name;
        let password = req.body.password;
        module.exports = { exists, name, Email, password };
        return res.status(200).json({ exists, name, Email, password });
    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
