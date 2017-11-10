window.AdminController = (() => {
  return {
    init: () => {

      // Add user functionality
      $.getScript('js/userFieldFunctionality.js', function() {

        $('#button-add-user').on('click', function() {
          attemptAddUser();
        });

        function attemptAddUser() {
          if(userUI.checkFormValidityAndAnnotate()) {
            addUser();
          }
        }

        function addUser() {
          $.ajax({
            url: 'http://localhost:3000/user',
            type: 'POST',
            data: {
              name: {
                first: userUI.fields['userFirstName']['input'].val(),
                middle: userUI.fields['userMiddleName']['input'].val(),
                last: userUI.fields['userLastName']['input'].val()
              },
              employeeID: userUI.fields['userEmployeeId']['input'].val(),
              permissionLevel: userUI.fields['userPermissionLevel']['input'].val(),
              email: userUI.fields['userEmail']['input'].val(),
              password: userUI.fields['userPassword']['input'].val()
            },
            success: function(result) {
              $('#submitFormSmall').text('Successfully added user for ' + userUI.fields['userFirstName']['input'].val() + ' ' + userUI.fields['userLastName']['input'].val() + '.');
              $('#submitFormSmall').addClass('text-success');
              console.log({
                name: {
                  first: userUI.fields['userFirstName']['input'].val(),
                  middle: userUI.fields['userMiddleName']['input'].val(),
                  last: userUI.fields['userLastName']['input'].val()
                },
                employeeID: userUI.fields['userEmployeeId']['input'].val(),
                permissionLevel: userUI.fields['userPermissionLevel']['input'].val(),
                email: userUI.fields['userEmail']['input'].val(),
                password: userUI.fields['userPassword']['input'].val()
              });
              clearAddUserFields();
              updateDeleteUsersList();
              updateViewUsersUI();
            }
          });
        }

        function clearAddUserFields() {
          for (field in userUI.fields) {
            userUI.fields[field]['input'].val('');
          }
        }

      });

      // Delete user functionality

      function updateDeleteUsersList() {
        $('#deleteUsersInput').empty();
        $.get('http://localhost:3000/users', function(data) {
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

      function deleteUser() {
        var val = $('#deleteUsersInput').val()
        var name = $('#deleteUsersInput option:selected').text();
        if (val != 'default') {
          $.ajax({
            url: 'http://localhost:3000/user/' + val,
            type: 'DELETE',
            success: function(result) {
              $('#deleteUsersSmall').text('Successfully deleted user ' + name + '.');
              $('#deleteUsersSmall').addClass('text-success');
              updateDeleteUsersList();
            }
          });
        }
      }



      // View users functionality

      function updateViewUsersUI() {
        // TODO
      };

    }

  };

})();
