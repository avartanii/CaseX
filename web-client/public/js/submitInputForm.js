window.InputController = (() => {
  return {
    init: () => {

      // Link UI inputs

      var fields = {
        drNum: {
          label: $('#drNumLabel'),
          input: $('#drNumInput'),
          small: $('#drNumSmall')
        }
      }
      var drNumInput = $('#drNumInput');
      var masterDrNumInput = $('#masterDrNumInput');
      var divisionInput = $('#divisionInput');
      var bureauInput = $('#bureauInput');
      var notesInput = $('#notesInput');
      var dateOccuredInput = $('#dateOccuredInput');
      var dateReportedInput = $('#dateReportedInput');
      var reportingDistrictInput = $('#reportingDistrictInput');
      var caseStatusInput = $('#caseStatusInput');
      var caseStatusDateInput = $('#caseStatusDateInput');
      var solvabilityFactorInput = $('#solvabilityFactorInput');
      var weaponInput_handgun = $('#weaponInput_handgun');
      var weaponInput_rifle = $('#weaponInput_rifle');
      var weaponInput_bluntForce = $('#weaponInput_bluntForce');
      var weaponInput_bodilyForce = $('#weaponInput_bodilyForce');
      var weaponInput_knife = $('#weaponInput_knife');
      var weaponInput_unknown = $('#weaponInput_unknown');
      var motiveInput_robbery = $('#motiveInput_robbery');
      var motiveInput_burglary = $('#motiveInput_burglary');
      var motiveInput_gang = $('#motiveInput_gang');
      var motiveInput_narcotics = $('#motiveInput_narcotics');
      var motiveInput_domesticViolence = $('#motiveInput_domesticViolence');
      var motiveInput_dispute = $('#motiveInput_dispute');
      var motiveInput_accidental = $('#motiveInput_accidental');
      var motiveInput_selfDefense = $('#motiveInput_selfDefense');
      var motiveInput_unknown = $('#motiveInput_unknown');
      var streetNumberInput = $('#streetNumberInput');
      var streetNameInput = $('#streetNameInput');
      var cityInput = $('#cityInput');
      var zipCodeInput = $('#zipCodeInput');
      var victNameInput = $('#victNameInput');
      var victSexInput = $('#victSexInput');
      var victSupervisedReleaseStatusInput = $('#victSupervisedReleaseStatusInput');
      var victDescInput = $('#victDescInput');
      var victAgeInput = $('#victAgeInput');
      var victIdInput = $('#victIdInput');
      var suspNameInput = $('#suspNameInput');
      var suspSexInput = $('#suspSexInput');
      var suspSupervisedReleaseStatusInput = $('#suspSupervisedReleaseStatusInput');
      var suspDescInput = $('#suspDescInput');
      var suspAgeInput = $('#suspAgeInput');
      var suspIdInput = $('#suspIdInput');
      var newOrExistingVictimInput = $('#newOrExistingVictimInput');
      var newOrExistingSuspectInput = $('#newOrExistingSuspectInput');
      var newVictimForm = $('#newVictimForm');
      var existingVictimForm = $('#existingVictimForm');
      var newSuspectForm = $('#newSuspectForm');
      var existingSuspectForm = $('#existingSuspectForm');

      // TODO: Delete formToJSON
      const formToJSON = elements => [].reduce.call(elements, (data, element) => {
        data[element.name] = element.value;
        return data;
      }, {});

      function attemptFormSubmission() {
        if (checkFormValidityAndAnnotate()) {
          submitCaseForm(getCaseDataAsJSON());
        }
      }

      function removeWarning(field) {
        field['label'].removeClass('text-danger');
        field['input'].removeClass('is-invalid');
        if (field['small'] != 'undefined') {
          field['small'].text('');
        }
      }

      function applyWarning(field, message) {
        field['label'].addClass('text-danger');
        field['input'].addClass('is-invalid');
        field['small'].text(message);
      }

      function removeAllWarnings() {
        for (field in fields) {
          removeWarning(fields[field]);
        }
      }

      function checkFormValidityAndAnnotate() {

        var isValid = true;

        removeAllWarnings();

        if (drNumInput.val() != '1234') {
          applyWarning(fields['drNum'], 'Testing error: DR# must be 1234.');
          isValid = false;
        }
        // if (masterDrNumInput
        // if (divisionInput
        // if (bureauInput
        // if (notesInput
        // if (dateOccuredInput
        // if (dateReportedInput
        // if (reportingDistrictInput
        // if (caseStatusInput
        // if (caseStatusDateInput
        // if (solvabilityFactorInput
        // if (weaponInput_handgun
        // if (motiveInput_robbery
        // if (streetNumberInput
        // if (streetNameInput
        // if (cityInput
        // if (zipCodeInput
        // if (victNameInput
        // if (victSexInput
        // if (victSupervisedReleaseStatusInput
        // if (victDescInput
        // if (victAgeInput
        // if (victIdInput
        // if (suspNameInput
        // if (suspSexInput
        // if (suspSupervisedReleaseStatusInput
        // if (suspDescInput
        // if (suspAgeInput
        // if (suspIdInput

        if (true) {
          // TODO: Highlight UI
          isValid = false;
        } else if (true) {
          // TODO: Highlight UI
          isValid = false;
        }
        console.log('Was all input valid?');
        console.log(isValid);
        return isValid;
      }

      function submitCaseForm(data) {

        const caseForm = document.getElementsByClassName('caseForm')[0]
        const caseData = formToJSON(caseForm.elements);

        // Trying Ajax:
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/case',
          data: JSON.stringify(data, null, '  '),
          contentType: 'application/json',
          dataType: 'json',
          accept: 'application/json',
          processData: false,
          contentType: false,
          crossDomain: true, // Added
          success: function(data){
            alert(data);
          },
          complete: function () {
            console.log('DEBUG: Found data:')
            console.log(JSON.stringify(data, null, '  '));;
          }
        });

        // Trying request:
        // request('http://localhost:3000/case', { json: data }, (err, res, body) => {
        //   if (err) { return console.log(err); }
        //   console.log(body.url);
        //   console.log(body.explanation);
        // });

        // Trying Axios:
        // axios.post('http://localhost:3000/case', {firstName: 'joe'})
        //   .then(function(response) {
        //     console.log(response);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });

      }

      function submitVictimForm(data) {
        // TODO
      }

      function submitSuspectForm(data) {
        // TODO
      }

      function getCaseDataAsJSON() {
        // TODO
      }

      // UI functionality

      $('#button-submit-forms').on('click', function() {
        attemptFormSubmission();
      });

      // Hide/show UI

      function updateVictimInputsVisibility() {
        var val = newOrExistingVictimInput.val();
        if (val == 'default') {
          newVictimForm.hide();
          existingVictimForm.hide();
        } else if (val == 'new') {
          newVictimForm.show();
          existingVictimForm.hide();
        } else if (val == 'old') {
          newVictimForm.hide();
          existingVictimForm.show();
        }
      }
      updateVictimInputsVisibility();

      function updateSuspectInputsVisibility() {
        var val = newOrExistingSuspectInput.val();
        if (val == 'default') {
          newSuspectForm.hide();
          existingSuspectForm.hide();
        } else if (val == 'new') {
          newSuspectForm.show();
          existingSuspectForm.hide();
        } else if (val == 'old') {
          newSuspectForm.hide();
          existingSuspectForm.show();
        }
      }
      updateSuspectInputsVisibility();

      newOrExistingVictimInput.change(function() {
        updateVictimInputsVisibility();
      });

      newOrExistingSuspectInput.change(function() {
        updateSuspectInputsVisibility();
      });

    }

  };

})();
