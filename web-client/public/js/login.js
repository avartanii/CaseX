
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
  var email;
  var password;
  $('#login').click(function () {
    email = $('#email').val();
    password = $('#password').val();

    axios.get('http://localhost:3000/users')
      .then(function (response) {
        var data = response.data;
        // console.log('DATA: ', data);
        for (var i = 0; i < data.length; i++) {
          if (email === data[i]['email']) {
            // console.log('IM HERE', email, data[i]['email'], data[i]['password']);
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
          } else if (i === data.length) {
            alert('Incorrect email');
          }
        }
      });
  });
});


//
// 
// // function loginUser(username, password) {
// //     axios.get('http://localhost:3000/users')
// //       .then(function(response) {
// //         var data = response.data;
// //         console.log(username, password, response);
// //
// //         for (var i = 0; i < data.length; i++) {
// //
// //         }
// //         console.log('FAILURE');
// //       })
// //       .catch(function(error) {
// //         console.log(error);
// //       });
// // }
//
// var login = function () {
//   var email = $('#email').val();
//   var password = $('#password').val();
//
//   axios.get('http://localhost:3000/users')
//     .then(function (response) {
//       var data = response.data;
//       // console.log('DATA: ', data);
//       for (var i = 0; i < data.length; i++) {
//         if (email === data[i]['email']) {
//           // console.log('IM HERE', email, data[i]['email'], data[i]['password']);
//           $.post('http://localhost:3000/login', {password: password, hash: data[i]['password']})
//             .done(function (err, serverRes) {
//             // console.log('SERVER RES1: ', serverRes);
//             // console.log('ERR: ', err);
//               if (serverRes === 'success') {
//               // console.log('SERVER RES: ', serverRes);
//                 window.location.href = '/';
//               }
//             })
//             .fail(function () {
//               alert('Incorrect password');
//             });
//         } else if (i === data.length) {
//           alert('Incorrect email');
//         }
//       }
//     });
// };
//
// var returnKey = function (event) {
//   if (event.keyCode === 13) {
//     $('#login').click(login);
//   }
// };
//
// $('#email').keyup(returnKey);
//
// $('#password').keyup(returnKey);
//
// $(document).ready(function () {
//   var email;
//   var password;
//   $('#login').click();
// });
