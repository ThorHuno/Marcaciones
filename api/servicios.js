var fs = require('fs');

function ExisteDirectorio(directorio) {
    return fs.existsSync(directorio)
}

function CrearDirectorio(directorio) {
    try {
        fs.mkdirSync(directorio);
    }
    catch (e) {
        throw e;
    }
}

function CrearJson(ruta, dataInicial) {
    var data = dataInicial || [];
    fs.writeFileSync(ruta, JSON.stringify(data), 'utf8');
}

function LeerJson(ruta) {
    var buffer = fs.readFileSync(ruta);
    return buffer.toString();
}

function CrearNombreJson() {
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var anio = fechaActual.getFullYear();
    var nombreArchivo = `${dia}-${mes}-${anio}.json`;

    return nombreArchivo;
}

module.exports = {
    ExisteDirectorio,
    CrearDirectorio,
    CrearJson,
    CrearNombreJson,
    LeerJson
};