const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const localStrategy = require('passport-local');
const keys = require('./keys');
var userServices = require('../services/user.service');
var crypt = require('../utils/utils');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    let userService = new userServices();
    let user = await userService.findById(id);
    done(null, user);
});

passport.use(new googleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, async (accessToken, refreshToken, profileInformation, done) => {
    let userService = new userServices();
    let newRecord = await userService.save({ userName: profileInformation.displayName, strategyId: profileInformation.id, strategyName: 'google' });

    done(null, newRecord);
}));

passport.use(new localStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    let userService = new userServices();
    let record = await userService.findByField('userName', username);

    if (!record)
        return done(null, false, { "loginMessage": 'No user found.' });

    if (crypt.decrypt(record.password) !== password)
        return done(null, false, { "loginMessage": 'Wrong password.' });

    if (!record.isEnable)
        return done(null, false, { "loginMessage": 'Disabled account.' });

    done(null, record);
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt_permission'
}, async (jwtPayload, cb) => {
    let userService = new userServices();
    let record = await userService.findById(jwtPayload.id);
    cb(null, record);
}));