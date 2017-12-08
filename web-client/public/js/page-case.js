window.CaseController = (() => {
  return {
    init: () => {
      const token = window.sessionStorage.getItem('userInfo-token');
      const iD = getCookie('id');

      $.ajax({
        type: 'GET',
        url: `http://localhost:3000/cases?_id=${iD}`,
        headers: {
          'x-access-token': token
        }
      }).done((data) => {
        const caseData = data[0];
        console.log(caseData);

        // Import needs this
        $.getScript('js/caseFieldFunctionality.js', () => {
          Promise.all([fillData(caseData)])
            .then((values) => {
              // fillData(caseData);

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
                  // console.log($(this));
                  $(this).show();
                });
              }

              formShowAll();
              // Initialize form with disabled inputs
              formActivation();

              $('#edit').click(() => {
                formDisabled = false;
                formActivation();
              });

              $('#delete').click(() => {
                alert('Are you sure you want to delete this case?');
              });
            })
        });
      });
    }
  };
})();
