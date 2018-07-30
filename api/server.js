var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var funciones = require(__dirname + '/servicios.js');
var colaboradorRoutes = require('./routes/colaborador');
var marcadaRoutes = require('./routes/marcada');
var authRoutes = require('./routes/auth');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cors = require('cors');

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

var corsOption = {
    origin: '*'
}
app.use(cors(corsOption));
app.use(passport.initialize());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

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
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/google');
    } else {
        next();
    }
}
app.use('/', authCheck, (req, res) => {
    debugger;
});

server.listen(PORT, function () {
    console.log('Express server is running on port ' + PORT);
});