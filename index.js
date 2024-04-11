const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const { JSDOM } = require('jsdom');
const userRoute = require("./routers/user");
const routs = require("./routers/staticrouter");
const app = express();
const {fetchProfileDetails,fetchCardDetails, handleCardData,fetchProfileCardDetails, isExist} = require("./controllers/user")

// Middleware
app.use(express.static(__dirname));
app.use(cookieParser());
dotenv.config();

// Routes
app.get('/script.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile('https://card-changer.onrender.com/' + '/HTML/script.js');
});

app.use("/", routs);
app.use("/register", userRoute);

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method !== 'OPTIONS') {
        next();
    }
});

// User Authentication Routes
app.post("/card-details", handleCardData);
app.get("/api/profile", async (req, res) => {
    try {
        const data = await fetchProfileDetails(req, res);
        res.json(data);
    } catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

let otp;
app.get('/userExist', async (req, res) => {
    try {
        let { exists } = require('./routers/staticrouter');
        res.json(exists);
    } catch (error) {
        console.error("Error fetching user existence:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/otp', async (req, res) => {
    try {
        otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        otpGenerator(otp);
        res.json(otp);
        module.exports = {
            otp,
        };
    } catch (error) {
        console.error("Error generating OTP:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/isLoggedIn", async (req, res) => {
    try {
        if (req.session && req.session.isLoggedIn) {
            return res.json({ status: "true" });
        }
        return res.json({ status: "false" });
    } catch (error) {
        console.error("Error checking login status:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/api/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.json({ response: "true" });
    } catch (error) {
        console.error('Error destroying session:', error);
        res.status(500).send('Error destroying session');
    }
});

app.get("/api/card-details", async (req, res) => {
    try {
        const data = await cardDetails.find({});
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching card details:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/api/profile/card-details", async (req, res) => {
    try {
        const details = await cardDetails.find({email:req.session.email});
        if (!details) {
            console.log("No details found");
        }
        res.status(200).send(details);
    } catch (error) {
        console.error("Error fetching profile card details:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Payment Integration
require("dotenv").config();
var http = require('http').Server(app);
const { cardDetails } = require('./models/user');

mongoose.connect('mongodb+srv://harshshrivastava599:ZDvMNYmnHcTxLIG6@card-changer.eez0w8r.mongodb.net/');
const port = process.env.PORT || 10000;

app.listen(port, () => {
    console.log(`Server successfully started at port ${port}`);
});
