const express = require('express');
const http = require('http');
var httpMiddleware = require('./middlewares/http.middleware');
// var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var colaboradorRoutes = require('./routes/colaborador');
var marcadaRoutes = require('./routes/marcada');
var authRoutes = require('./routes/auth');
var profileRoutes = require('./routes/profile');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');

var app = express();
var server = http.createServer(app);
// const IO = socketIO(server);

// IO.on('connection', socket => {
//     socket.on('colaboradorConectado', (usuario) => {
//         IO
//             .sockets
//             .emit('nuevoColaborador', usuario);
//     });
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = process.env.PORT || 5000;

app.use(new httpMiddleware().convertHttp)

//Directorio de los archivos estáticos css, js, html
app.use('/panel', passport.authenticate('jwt', { session: false }), express.static(__dirname + '/public'));

//API
app.use('/api', passport.authenticate('jwt', { session: false }));
app.use('/api', colaboradorRoutes);
app.use('/api', marcadaRoutes);
app.use('/auth', authRoutes);
app.use('/profile', passport.authenticate('jwt', { session: false }), profileRoutes);

server.listen(PORT, function () {
    console.log('Express server is running on port ' + PORT);
});