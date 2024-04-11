const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})

passport.use(new googleStrategy({
    clientID:"556535718535-412ti26l7jrhi6eq1rlp9kg4t7nd7q27.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL : "http://localhost:3000/login/auth/google/callback",
    passReqToCallback:true
},
(request,accessToken,refreshToken,profile,done)=>{
    return done(null,profile);
}
));