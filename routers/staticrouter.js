const express = require("express")
const bodyParser = require('body-parser');
const session = require('express-session');
const { User } = require("../models/user");
const path = require('path');
const { restrictToLoggedinUserOnly } = require("../middleware/auth");
const router = express.Router();
router.use(express.static(__dirname))

// const app = express();

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
})
// router.get("/api",restrictToLoggedinUserOnly,(req,res)=>{
//     const filePath = path.join(__dirname, '..', 'HTML', 'payment.html'); 

//     res.sendFile(filePath);
// })

router.get("/signup", (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/registration.html');
})
router.get("/login", (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'login.html');

    res.sendFile(filePath);
})

router.get("/profile", restrictToLoggedinUserOnly, (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/profile.html');
})
router.get("/about", (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/about.html');
})
router.get("/sell", restrictToLoggedinUserOnly, (req, res) => {
    res.redirect('https://card-changer.onrender.com/HTML/sell_coupan.html');
})
router.get("/purchase", restrictToLoggedinUserOnly, (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'purchase_coupan.html');

    res.sendFile(filePath);
})
router.get("/category", (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'category.html');

    res.sendFile(filePath);
})

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/login/auth/google", passport.authenticate('google', {
    scope: ['email', 'profile']
}))
router.get("/login/auth/google/callback",
    function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login/auth/google'); }
            req.logIn(user, async function (err) {
                if (err) { return next(err); }
                req.session.isLoggedIn = true;
                req.session.userId = user._id;
                req.session.email = user.email;
                const { provider, displayName, email, picture } = user;
                const isExist = await User.findOne({ email });
                if (!isExist) {
                    const name = displayName;
                    await User.create({ provider, name, email, picture });
                }

                console.log("google user is", user)
                console.log(email, isExist) // Set session variable to true indicating user is logged in
                return res.redirect('/');
            });
        })(req, res, next);
    }
);
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    console.log(user)
    if (!user) {
        const filePath = path.join(__dirname, '..', 'HTML', 'login_clone.html');
        console.log("User not found. Sending login page.");

        return res.sendFile(filePath);
    }

    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    req.session.email = user.email;
    console.log(req.session);
    return res.redirect("/");
});

// router.post('/card-details',handleCardData);
let exists = 'false';
router.post('/userExist', async (req, res) => {
    const Email = req.body.email;
    const newUser = await User.findOne({ email: Email });
    if (newUser) {
        exists = 'true';
    }
    else {
        exists = 'false';


    }
    console.log(exists);
    let name = req.body.name;
    let password = req.body.password;
    module.exports = { exists, name, Email, password };

})
module.exports = router;