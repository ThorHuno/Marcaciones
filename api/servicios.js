var fs = require('fs');

function ExisteDirectorio(directorio) {
    return fs.existsSync(directorio)
}

function CrearDirectorio(directorio) {
    fs.mkdirSync(directorio);
}

function EscribirJson(ruta) {
    fs.writeFileSync(ruta);
}

module.exports = {
    ExisteDirectorio,
    CrearDirectorio,
    EscribirJson
};