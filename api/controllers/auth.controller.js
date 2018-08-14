const passport = require('passport');
const jwt = require('jsonwebtoken');

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
            }, 'jwt_permission');

            res.json({ token });
        })(req, res, next)
    }
}

module.exports = AuthController;