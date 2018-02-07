document
    .addEventListener('DOMContentLoaded', function () {
        chrome
            .extension
            .sendMessage({}, function (response) {
                debugger;
                logged_in_user = response.email;
                var nodoUsuario = document.getElementById('usuario');

                if (nodoUsuario) {
                    nodoUsuario.innerText = `${logged_in_user}`;

                    axios
                        .get('https://jsonplaceholder.typicode.com/posts')
                        .then(function (response) {
                            localStorage.setItem('comentarios', JSON.stringify(response.data));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });

        var btn = document.getElementById('btnMarcar');
        btn.addEventListener('click', function () {
            chrome
                .tabs
                .executeScript(null, {code: "document.body.style.backgroundColor= 'red'"});

            // window.close();
        });
    });