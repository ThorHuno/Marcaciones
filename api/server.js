var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var funciones = require(__dirname + '/servicios.js');

const RUTADIRJSON = __dirname + '/json';

var app = express();
var server = http.createServer(app);
const IO = socketIO(server);

IO.on('connection', socket => {
    socket.on('colaboradorConectado', (usuario) => {
        var rutaJson = RUTADIRJSON + '/colaboradores.json';
        if (!funciones.ExisteDirectorio(rutaJson)) {
            funciones.CrearJson(rutaJson, [usuario]);
        } else {
            var jsonString = funciones.LeerJson(rutaJson);

            if (jsonString != '') {
                var jsonObjeto = JSON.parse(jsonString);
                jsonObjeto.push(usuario);
                funciones.CrearJson(rutaJson, jsonObjeto);
            } else 
                funciones.CrearJson(rutaJson, [usuario]);
            }
        
        IO
            .sockets
            .emit('nuevoColaborador', usuario);
    });
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

const PORT = process.env.PORT || 5000;

if (!funciones.ExisteDirectorio(RUTADIRJSON)) {
    funciones.CrearDirectorio(RUTADIRJSON);
}

app
    .use(function (req, res, next) {
        if (req.header['x-forwarded-proto'] === 'https') {
            res.redirect('http://' + req.hostname + req.url)
        } else {
            next();
        }
    })

//Directorio de los archivos estáticos css, js, html
app.use(express.static(__dirname + '/public'));

var router = express.Router();

router.post("/marcar", (req, res) => {
    var parametros = req.body;
    var nombreArchivo = funciones.CrearNombreJson(parametros.usuario);
    var rutaJson = RUTADIRJSON + '/' + nombreArchivo;

    if (!funciones.ExisteDirectorio(rutaJson)) {
        parametros.marcaciones = [
            {
                hora: parametros.hora,
                direccionIP: req.connection.remoteAddress,
                esEntrada: parametros.esEntrada
            }
        ];
        delete parametros.hora;
        delete parametros.esEntrada;
        funciones.CrearJson(rutaJson, parametros);
    } else {
        var jsonString = funciones.LeerJson(rutaJson);
        var jsonObjeto = JSON.parse(jsonString);

        jsonObjeto
            .marcaciones
            .push({hora: parametros.hora, direccionIP: req.connection.remoteAddress, esEntrada: parametros.esEntrada});

        funciones.CrearJson(rutaJson, jsonObjeto);
    }

    res.send(jsonObjeto);
});

router.get('/colaboradores', (req, res) => {
    var rutaJson = RUTADIRJSON + '/colaboradores.json';

    if (!funciones.ExisteDirectorio(rutaJson)) {
        res.json([]);
    } else {
        var jsonString = funciones.LeerJson(rutaJson);
        if (jsonString != '') {
            var jsonObjeto = JSON.parse(jsonString);
            res.json(jsonObjeto);
        } else {
            res.json([]);
        }
    }
});

app.use('/api', router)

server.listen(PORT, function () {
    console.log('Express server is running on port ' + PORT);
});