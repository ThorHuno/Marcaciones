var express = require('express');
var bodyParser = require('body-parser');
var funciones = require(__dirname + '/servicios.js');

const RUTADIRJSON = __dirname + '/json';

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

var router = express.Router();

router.post("/marcar", (req, res) => {
    var parametros = req.body;
    var nombreArchivo = funciones.CrearNombreJson();
    var rutaJson = RUTADIRJSON + '/' + nombreArchivo;

    if (!funciones.ExisteDirectorio(rutaJson)) {
        parametros.marcaciones = [{ hora: parametros.hora, direccionIP: req.connection.remoteAddress, esEntrada: parametros.esEntrada }];
        delete parametros.hora;
        delete parametros.esEntrada;
        funciones.CrearJson(rutaJson, [parametros]);
    }

    var jsonString = funciones.LeerJson(rutaJson);
    var jsonObjeto = JSON.parse(jsonString);

    res.send(jsonObjeto);
});

app.use('/api', router)

app.listen(PORT, function () {
    console.log('Express server is running on port ' + PORT);
});