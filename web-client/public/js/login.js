// TODO: Set homepage items to invisible if not logged in

function setCookies(email) {
  document.cookie = `email=${email}`;
  document.cookie = 'loggedIn=true';
}

function login() {
  const email = $('#email').val();
  const password = $('#password').val();

  axios.get('http://localhost:3000/users')
    .then((response) => {
      const data = response.data;
      for (let i = 0; i < data.length; i += 1) {
        if (email === data[i]['email']) {
          $.post('http://localhost:3000/login', { password, hash: data[i]['password'] })
            .done((err, serverRes) => {
              if (serverRes === 'success') {
                setCookies(email);
                window.location.href = '/';
              }
            })
            .fail(() => {
              $('#login-status').text('Incorrect password');
            });
        } else if (i === data.length - 1) {
          $('#login-status').text('Incorrect email');
        }
      }
    });
}

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
