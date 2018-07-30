const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
var userServices = require('../services/user.service');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    let userService = new userServices();
    let user = userService.findById(id);
    done(null, user);
});

passport.use(new googleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, async(accessToken, refreshToken, profileInformation, done) => {
    let userService = new userServices();
    let newRecord = await userService.save({userName: profileInformation.displayName, strategyId: profileInformation.id, strategyName: 'google'});

    done(null, newRecord);
}));