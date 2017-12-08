/* eslint-disable */
window.AdminController = (() => {
  return {
    init: () => {
      const token = window.sessionStorage.getItem('userInfo-token');
      // Add user functionality
      $.getScript('js/userFieldFunctionality.js', () => {
        function addUser() {
          $.ajax({
            url: 'http://localhost:3000/users',
            type: 'POST',
            headers: {
              'x-access-token': token,
            },
            data: {
              name: {
                first: userUI.fields['userFirstName']['input'].val(),
                middle: userUI.fields['userMiddleName']['input'].val(),
                last: userUI.fields['userLastName']['input'].val()
              },
              employeeID: userUI.fields['userEmployeeId']['input'].val(),
              permissionLevel: userUI.fields['userPermissionLevel']['input'].val(),
              email: userUI.fields['userEmail']['input'].val(),
              password: userUI.fields['userPassword']['input'].val(),
            },
            success: function(result) {
              $('#submitFormSmall').text('Successfully added user for ' + userUI.fields['userFirstName']['input'].val() + ' ' + userUI.fields['userLastName']['input'].val() + '.');
              $('#submitFormSmall').addClass('text-success');
              clearAddUserFields();
              updateDeleteUsersList();
              viewUsers();
            }
          });
        }

        function attemptAddUser() {
          if (userUI.checkFormValidityAndAnnotate()) {
            addUser();
          }
        }

        $('#button-add-user').on('click', () => {
          attemptAddUser();
        });

        function clearAddUserFields() {
          for (field in userUI.fields) {
            userUI.fields[field]['input'].val('');
          }
        }

      });

      // Delete user functionality

      function updateDeleteUsersList() {
        $('#deleteUsersInput').empty();
        $.ajax({
          type: 'GET',
          url: 'http://localhost:3000/users',
          headers: {
            'x-access-token': token,
          },
        }).then((data) => {
          var option = '<option selected hidden value=\'default\'>Select User...</option>';
          for (user in data) {
            option += '<option value="' + data[user]['_id'] + '">' + data[user]['name']['first'] + ' ' + data[user]['name']['last'] + '</option>';
          }
          $('#deleteUsersInput').append(option);
        });
      }
      updateDeleteUsersList();

      $('#button-delete-user').on('click', function() {
        attemptDeleteUser();
      });

      function attemptDeleteUser() {
        $('#deleteUsersInput').removeClass('is-invalid');
        $('#deleteUsersSmall').removeClass('text-danger');
        $('#deleteUsersSmall').removeClass('text-success');
        $('#deleteUsersSmall').text('');
        var val = $('#deleteUsersInput').val();
        if (val == 'default') {
          $('#deleteUsersInput').addClass('is-invalid');
          $('#deleteUsersSmall').addClass('text-danger');
          $('#deleteUsersSmall').text('Must select a user to delete.');
        } else {
          deleteUser();
        }
      }

      function submitDeleteUserCall(val) {
        $.ajax({
          url: 'http://localhost:3000/users/' + val,
          type: 'DELETE',
          headers: {
            'x-access-token': token,
          }
        });
      }

      function deleteUser() {
        var val = $('#deleteUsersInput').val()
        var name = $('#deleteUsersInput option:selected').text();
        if (val != 'default') {
          $.ajax({
            url: 'http://localhost:3000/users/' + val,
            type: 'DELETE',
            headers: {
              'x-access-token': token,
            }
          }).then((deletedUser) => {
            updateDeleteUsersList();
            viewUsers();
          });

          // Promise.all([submitDeleteUserCall(val)]).then((values) => {
          //   $('#deleteUsersSmall').text('Successfully deleted user ' + name + '.');
          //   $('#deleteUsersSmall').addClass('text-success');
          //   updateDeleteUsersList();
          // }).catch((err) => {
          //   console.log(err);
          // });
        }
      }
      // View users functionality
      function viewUsers() {
        $('#viewUsers').DataTable({
          destroy: true,
          ajax: {
            type: 'GET',
            url: 'http://localhost:3000/users/',
            headers: {
              'x-access-token': token,
            },
            dataSrc: json => json,
          },
          columns: [
            { data: 'name.first' },
            { data: 'name.middle' },
            { data: 'name.last' },
            { data: 'employeeID' },
            { data: 'permissionLevel' },
            { data: 'email' }
          ],
        });
      }
      viewUsers();
    }
  };
})();
