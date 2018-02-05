var logged_in_user

chrome
    .extension
    .sendMessage({}, function (response) {
        debugger;
        logged_in_user = response.email;
    });