window.AdminController = (() => {
  return {
    init: () => {

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
              $('#deleteUsersSmall').text('Deleted user ' + name + '.');
              $('#deleteUsersSmall').addClass('text-success');
              updateDeleteUsersList();
            }
          });
        }
      }

    }

  };

})();
