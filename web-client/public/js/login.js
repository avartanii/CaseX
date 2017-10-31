
// function loginUser(username, password) {
//     axios.get('http://localhost:3000/users')
//       .then(function(response) {
//         var data = response.data;
//         console.log(username, password, response);
//
//         for (var i = 0; i < data.length; i++) {
//
//         }
//         console.log('FAILURE');
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
// }

$(document).ready(function () {
  var username;
  var password;
  $('#login').click(function () {
    username = $('#username').val();
    password = $('#password').val();

    axios.get('http://localhost:3000/users')
      .then(function (response) {
        var data = response.data;
        // console.log('DATA: ', data);
        for (var i = 0; i < data.length; i++) {
          if (username === data[i]['email']) {
            // console.log('IM HERE', username, data[i]['email'], data[i]['password']);
            $.post('http://localhost:3000/login', {password: password, hash: data[i]['password']})
              .done(function (err, serverRes) {
              // console.log('SERVER RES1: ', serverRes);
              // console.log('ERR: ', err);
                if (serverRes === 'success') {
                // console.log('SERVER RES: ', serverRes);
                  window.location.href = '/';
                }
              })
              .fail(function () {
                alert('Incorrect password');
              });
          } else if (i === data.length - 1) {
            alert('Incorrect username');
          }
        }
      });
  });
});
