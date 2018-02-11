var trabajando = false;
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
                sendResponse({email: email, trabajando: trabajando});
                break;
            case 'marcar':
                trabajando = !trabajando;
                sendResponse({trabajando: trabajando});
                break;
        }
    });