var express = require('express');
var funciones = require(__dirname + '/servicios.js');

const RUTAJSON = __dirname + '/json';

var app = express();
const PORT = process.env.PORT || 5000;

if (!funciones.ExisteDirectorio(RUTAJSON)) {
    funciones.CrearDirectorio(RUTAJSON);
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

router.get("/get", (req, res) => {
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var anio = fechaActual.getFullYear();
    var nombreArchivo = `${dia}-${mes}-${anio}.json`;
    funciones.EscribirJson(RUTAJSON + '/' + nombreArchivo);
    res.send({saludo: 'Hola desde el server'});
});

app.use('/api', router)

app.listen(PORT, function () {
    console.log('Express server is running on port ' + PORT);
});