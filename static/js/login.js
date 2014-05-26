// READY
function login_ready() {
    $('#login_form').submit(function(event) {
        login_user();
        event.preventDefault();
    }); 
}

function login_user() {
    $.ajax({
        type: 'POST',
        url: '/api/login/',
        data: {
            username: $('#login_username').val(),
            password: $('#login_password').val(),
        }
    }).done(function(data) {
        if (data['login'] == 'successful') {
            $.getJSON('/api/status/', function(data) {
                status_data = data;
                initialize_page(function() {
                    $.address.value('overview');
                });
            });
        } else {
            var login_button = $('#login_button');
            login_button.text('Login incorrect. Please try again!').removeClass('btn-primary').addClass('btn-danger');
            setTimeout(function() {
                login_button.text('Login').removeClass('btn-danger').addClass('btn-primary');
            }, 2000);
        }
    });
}