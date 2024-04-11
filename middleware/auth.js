const express = require("express");
const session = require("express-session")
async function restrictToLoggedinUserOnly(req, res, next) {
    const user= await req.session.email;

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
};
