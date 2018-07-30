const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
    session: false
}));

router.get('/google/redirect', passport.authenticate('google', {session: false}), (req, res) => {
    res.redirect('/');
    const token = jwt.sign({
        id: req.user.id,
        uName: req.user.userName
    }, 'jwt_permission');
    res.json({user: req.user, token});
});

module.exports = router;