const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
    const token = jwt.sign({
        id: req.user.id,
        uName: req.user.userName
    }, 'jwt_permission');
    res.json({user: req.user, token});
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json({message: info.loginMessage})
        }
        
        res.json(user);
    })(req, res, next)
});

module.exports = router;