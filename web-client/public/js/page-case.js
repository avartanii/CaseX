window.CaseController = (() => {
  return {
    init: () => {
      function getCookie(cname) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i += 1) {
          let c = ca[i];
          c = c.trim();
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      }

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

              $('#edit').click(() => {
                formDisabled = false;
                formActivation();
                // $(save).click(() => {
                //   $.ajax({
                //     url: `http://localhost:3000/cases?_id=${iD}`,
                //     data: formData,
                //     processData: false,
                //     contentType: false,
                //     type: 'POST',
                //     crossDomain: true,
                //     headers: {
                //       'x-access-token': token
                //     }
                //   }).done((data) => {
                //     caseData = data;
                //     fillData(caseData);
                //   }).fail(() => {
                //     console.log('FAILURE');
                //   });
                // })
                // be able to edit items and save changes in the database
              });

              $('#delete').click(() => {
                alert('Are you sure you want to delete this case?');
                // be able to delete a case from the database
                // redirect to the homepage

                // getting a 400 Bad Request
                // $.ajax({
                //   url: 'http://localhost:3000/cases/3',
                //   type: 'DELETE',
                //   headers: {
                //     'x-access-token': token,
                //   },
                //   success: function(result) {
                //     window.location.replace("http://localhost:3000/home");
                //   }
                // });
              });
            })
        });
      });
    }
  };
})();
