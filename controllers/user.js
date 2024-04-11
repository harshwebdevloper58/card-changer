const { User, cardDetails } = require("../models/user");
const path = require('path');
const cookieParser = require("cookie-parser");
const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const { route } = require("../routers/staticrouter");

async function handleUserSignUp(req, res) {
    try {
        const Email = req.body.email;
        const newUser = await User.findOne({ email: Email });
        if (!newUser) {
            const { Email, name, password } = require('../routers/staticrouter');
            const email = Email;
            console.log(name, Email, password);
            await User.create({
                name,
                email,
                password
            });
            console.log("user created");
            const filePath = path.join(__dirname, '..', 'HTML', 'login.html');
            return res.sendFile(filePath);
        }
    } catch (error) {
        console.error('Error handling user sign-up:', error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleCardData(req, res) {
    try {
        const { company, category, code, offer, brief, expiry, description, redeemProcess, TandC } = req.body;
        const sellerEmail = req.session.email;
        await cardDetails.create({
            company,
            category,
            code,
            offer,
            brief,
            expiry,
            description,
            redeemProcess,
            TandC,
            sellerEmail
        });
        console.log("card-details uploaded");
        return res.redirect('https://card-changer.onrender.com/HTML/dashboard_cards.html');
    } catch (error) {
        console.error('Error handling card data:', error);
        return res.status(500).send("Internal Server Error");
    }
}

async function fetchProfileDetails(req, res) {
    try {
        const Email = req.session.email;
        const user = await User.findOne({ email: Email });
        if (!user) {
            return { error: 'User not found' };
        }
        const { name, email, number } = user;
        return { name, email, number };
    } catch (error) {
        console.error('Error fetching profile details:', error);
        return { error: 'Internal Server Error' };
    }
}

async function fetchCardDetails(req, res,) {
    try {
        const cardData = await cardDetails.find({}, { code: 0 });
        return cardData;
    } catch (error) {
        console.error('Error fetching card details:', error);
        return { error: 'Internal server Error' };
    }
}

async function fetchProfileCardDetails(req, res) {
    try {
        const details = await cardDetails.find({ sellerEmail: req.session.email }, { code: 0 });
        return details;
    } catch (error) {
        console.error('Error fetching profile card details:', error);
        return { error: 'Internal server Error' };
    }
}

module.exports = {
    handleUserSignUp,
    fetchProfileDetails,
    fetchCardDetails,
    handleCardData,
    fetchProfileCardDetails,
};
