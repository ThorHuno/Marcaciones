class HttpMiddleware {
    convertHttp(req, res, next) {
        if (req.header['x-forwarded-proto'] === 'https') {
            res.redirect('http://' + req.hostname + req.url)
        } else {
            next();
        }
    }
}

module.exports = HttpMiddleware;