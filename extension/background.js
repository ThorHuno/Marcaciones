var trabajando = false;
var estados = {
    offline: 'Offline',
    dentro: 'Dentro',
    fuera: 'Fuera'
};
var tooltip = {
    cia: 'Axxys Systems',
    usuario: '',
    estado: estados.offline
};
var socket = null;
chrome
    .identity
    .getProfileUserInfo(function (info) {
        email = info.email;
    });

chrome
    .extension
    .onMessage
    .addListener(function (request, sender, sendResponse) {
        switch (request.accion) {
            case 'inicio':
                socket = io.connect('http://localhost:5000/');
                socket.emit('colaboradorConectado', email);
                tooltip.estado = estados.offline;
                tooltip.usuario = email;
                sendResponse({email: email, trabajando: trabajando, tooltip: tooltip});
                break;
            case 'marcar':
                trabajando = !trabajando;
                tooltip.estado = trabajando
                    ? estados.dentro
                    : estados.fuera;
                peticion({usuario: email, esEntrada: trabajando, hora: new Date()});
                sendResponse({trabajando: trabajando, tooltip: tooltip});
                break;
        }
    });

function peticion(data) {
    axios
        .post('http://localhost:5000/api/marcar', data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}