document
    .addEventListener('DOMContentLoaded', function () {
        chrome
            .extension
            .sendMessage({}, function (response) {
                debugger;
                logged_in_user = response.email;
                var nodoUsuario = document.getElementById('usuario');

                if (nodoUsuario) {
                    nodoUsuario.innerText = `Usuario: ${logged_in_user}`;
                }
            });
    });