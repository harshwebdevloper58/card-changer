const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

try {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/login/auth/google/callback",
            passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    ));
} catch (error) {
    console.error("Error configuring Passport:", error);
}
