const passport = require('passport');
const jwt = require('jsonwebtoken');
var cnfg = require('../config/keys');

class AuthController {
    login(req, res, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.json({ message: info.loginMessage })
            }

            const token = jwt.sign({
                id: user.id,
                uName: user.userName
            }, 'jwt_permission', { expiresIn: cnfg.params.expiredTokenTime });

            res.json({ token });
        })(req, res, next)
    }
}

module.exports = AuthController;