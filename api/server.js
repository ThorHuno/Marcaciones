var express = require('express');

var app = express();
const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
    if (req.header['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url)
    } else {
        next();
    }
})

var router = express.Router();

app.use('/api', router)

app.listen(PORT, function () {
    console.log('Express server is running on port ' + PORT);
});