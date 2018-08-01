var express = require('express');
var router = express.Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/google');
    } else {
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    res.send('Hola ' + req.user.userName);
});

module.exports = router;