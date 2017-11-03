window.AdminController = (() => {
  return {
    init: () => {

      function updateDeleteUsersList() {
        $.get('http://localhost:3000/users', function(data) {
          var option = '';
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
        $('#deleteUsersSmall').text('');
        var val = $('#deleteUsersInput').val();
        if (val == 'default') {
          $('#deleteUsersInput').addClass('is-invalid');
          $('#deleteUsersSmall').text('Must select a user to delete.');
        } else {
          deleteUser();
        }
      }

      function deleteUser() {
        console.log('Would have deleted user now.');
      }

    }

  };

})();
