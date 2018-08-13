var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var funciones = require(__dirname + '/servicios.js');
var colaboradorRoutes = require('./routes/colaborador');
var marcadaRoutes = require('./routes/marcada');
var authRoutes = require('./routes/auth');
var profileRoutes = require('./routes/profile');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cookieSession = require('cookie-session');

var app = express();
var server = http.createServer(app);
const IO = socketIO(server);

IO.on('connection', socket => {
    socket.on('colaboradorConectado', (usuario) => {
        IO
            .sockets
            .emit('nuevoColaborador', usuario);
    });
});

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['baby']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
    if (req.header['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url)
    } else {
        next();
    }
})

//Directorio de los archivos estáticos css, js, html
app.use(express.static(__dirname + '/public'));

app.use('/api', colaboradorRoutes);
app.use('/api', marcadaRoutes);
app.use('/auth', authRoutes);
app.use('/profile', passport.authenticate('jwt', { session: false }), profileRoutes);

server.listen(PORT, function () {
    console.log('Express server is running on port ' + PORT);
});