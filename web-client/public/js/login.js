/* eslint-disable */
// TODO: Set homepage items to invisible if not logged in

var login = function () {
  var email = $('#email').val();
  var password = $('#password').val();

  if (email.length === 0) {
    alert('Incorrect email');
  } else {
    $.post('http://localhost:3000/authenticate', { email, password })
      .done((res) => {
        if (res.success) {
          document.cookie = `email=${email}`; // Set cookie with email for username
          window.location.href = '/';
        } else {
            $('#login-status').text(res.message);
        }
      })
      .fail((err) => {
        $('#login-status').text(err.responseJSON.message);
      });
  }

};

function returnKey(event) {
  if (event.keyCode === 13) {
    $('#login').click();
  }
}

$('#email').keyup(returnKey);

$('#password').keyup(returnKey);

$(document).ready(() => {
  $('#login').click(login);
});
