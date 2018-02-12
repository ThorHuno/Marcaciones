var trabajando = false;
var tooltip = {
    cia: 'Axxys Systems',
    usuario: '',
    estado: false
};
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
                tooltip.estado = trabajando;
                tooltip.usuario = email;
                sendResponse({email: email, trabajando: trabajando, tooltip: tooltip});
                break;
            case 'marcar':
                trabajando = !trabajando;
                tooltip.estado = trabajando;
                sendResponse({trabajando: trabajando, tooltip: tooltip});
                break;
        }
    });