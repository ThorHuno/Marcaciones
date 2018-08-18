const express = require('express');
const router = express.Router();
var authController = require('../controllers/auth.controller');

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     const token = jwt.sign({
//         id: req.user.id,
//         uName: req.user.userName
//     }, 'jwt_permission');
//     res.json({ user: req.user, token });
// });

var controller = new authController();

router.post('/login', controller.login);

module.exports = router;