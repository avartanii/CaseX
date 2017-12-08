window.CaseController = (() => {
  return {
    init: () => {
      const token = window.sessionStorage.getItem('userInfo-token');
      const dR = getCookie('DR');

      $.ajax({
        type: 'GET',
        url: `http://localhost:3000/cases/${dR}`,
        headers: {
          'x-access-token': token
        }
      }).done((caseData) => {
        // Import needs this
        $.getScript('js/caseFieldFunctionality.js', () => {
          Promise.all([fillData(caseData)])
            .then(() => {
              let formDisabled = true;

              function formActivation() {
                if (formDisabled) {
                  $('.form-control, .form-check-input, #button-save-page').not('#case-search').each(function disable() {
                    $(this).prop('disabled', true);
                  });
                } else {
                  $('.form-control, .form-check-input, #button-save-page').each(function disable() {
                    $(this).removeAttr('disabled');
                  });
                }
              }

              function formShowAll() {
                $('form').each(function show() {
                  $(this).show();
                });
              }

              formShowAll();

              // Initialize form with disabled inputs
              formActivation();

              function deleteCase(dr) {
                $.ajax({
                  url: `http://localhost:3000/cases/${dr}`,
                  type: 'DELETE',
                  headers: {
                    'x-access-token': token,
                  }
                });
              }

              $('#edit').click(() => {
                formDisabled = false;
                formActivation();
              });

              $('#delete').click(() => {
                alert('Are you sure you want to delete this case?');
                deleteCase(dR);
                alert(`Successfully deleted Case DR# ${dR}!`);
                window.location = "/";
              });
            })
        });
      });
    }
  };
})();
