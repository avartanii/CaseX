/* eslint-disable */
// TODO: Set homepage items to invisible if not logged in

var setCookies = function (email) {
  document.cookie = 'email=' + email;
  document.cookie = 'loggedIn=true';
};

var login = function () {
  var email = $('#email').val();
  var password = $('#password').val();

  if (email.length === 0) {
    alert('Incorrect email');
  } else {
    $.post('http://localhost:3000/authenticate', { email, password })
      .done((res) => {
        if (res.success) {
          window.location.href = '/';
        } else {
            $('#login-status').text(res.message);
        }
      })
      .fail((err) => {
        $('#login-status').text(err.responseJSON.message);
      });
    // axios.get('http://localhost:3000/users')
    //   .then(function (response) {
    //     var data = response.data;
    //     for (var i = 0; i < data.length; i++) {
    //       if (email === data[i]['email']) {
    //         $.post('http://localhost:3000/login', {password: password, hash: data[i]['password']})
    //           .done(function (err, serverRes) {
    //             if (serverRes === 'success') {
    //               setCookies(email);
    //               window.location.href = '/';
    //             }
    //           })
              // .fail(function () {
              //   $('#login-status').text('Incorrect password');
              // });
    //       } else if (i === data.length - 1) {
    //         $('#login-status').text('Incorrect email');
    //       }
    //     }
    //   });
  }

};

var returnKey = function (event) {
  if (event.keyCode === 13) {
    $('#login').click();
  }
};

$('#email').keyup(returnKey);

$('#password').keyup(returnKey);

$(document).ready(function () {
  $('#login').click(login);
});
