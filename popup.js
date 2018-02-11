document
    .addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('btnMarcar');

        chrome
            .extension
            .sendMessage({
                accion: 'inicio'
            }, function (response) {
                var nodoUsuario = document.getElementById('usuario');

                if (nodoUsuario) {
                    nodoUsuario.innerText = `${response.email}`;
                    obtenerTooltip(function (tooltip) {
                        cambiarTooltip(`${tooltip}\n Usuario ${response.email}\n Estado: ${response.trabajando}`);
                    });
                }

                cambiarBoton(btn, response.trabajando);
                cambiarIcono(response.trabajando);
            });

        btn.addEventListener('click', marcar);
    });

function marcar() {
    chrome
        .extension
        .sendMessage({
            accion: 'marcar'
        }, function (response) {
            var btn = document.getElementById('btnMarcar');
            cambiarBoton(btn, response.trabajando);
            cambiarIcono(response.trabajando);
        });
}

function cambiarBoton(boton, bandera) {
    if (boton) {
        if (bandera) {
            boton
                .classList
                .remove('dentro');
            boton
                .classList
                .add('fuera');
        } else {
            boton
                .classList
                .remove('fuera');
            boton
                .classList
                .add('dentro');
        }
    }
}

function cambiarIcono(bandera) {
    var icono = bandera
        ? "icono_dentro"
        : "icono_fuera";
    chrome
        .browserAction
        .setIcon({
            path: {
                "16": "iconos/16-" + icono + ".png",
                "128": "iconos/128-" + icono + ".png"
            }
        })
}

function cambiarTooltip(tooltip) {
    chrome
        .browserAction
        .setTitle({title: tooltip});
}

function obtenerTooltip(callback) {
    chrome
        .browserAction
        .getTitle({}, callback);
}