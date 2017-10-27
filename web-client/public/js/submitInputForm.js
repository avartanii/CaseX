window.InputController = (() => {
  return {
    init: () => {

      // Link UI inputs

      var fields = {
        drNum: {
          label: $('#drNumLabel'),
          input: $('#drNumInput'),
          small: $('#drNumSmall')
        },
        masterDrNum: {
          label: $('#masterDrNumLabel'),
          input: $('#masterDrNumInput'),
          small: $('#masterDrNumSmall')
        },
        division: {
          label: $('#divisionLabel'),
          input: $('#divisionInput'),
          small: $('#divisionSmall')
        },
        bureau: {
          label: $('#bureauLabel'),
          input: $('#bureauInput'),
          small: $('#bureauSmall')
        },
        notes: {
          label: $('#notesLabel'),
          input: $('#notesInput'),
          small: $('#notesSmall')
        },
        dateOccured: {
          label: $('#dateOccuredLabel'),
          input: $('#dateOccuredInput'),
          small: $('#dateOccuredSmall')
        },
        dateReported: {
          label: $('#dateReportedLabel'),
          input: $('#dateReportedInput'),
          small: $('#dateReportedSmall')
        },
        reportingDistrict: {
          label: $('#reportingDistrictLabel'),
          input: $('#reportingDistrictInput'),
          small: $('#reportingDistrictSmall')
        },
        caseStatus: {
          label: $('#caseStatusLabel'),
          input: $('#caseStatusInput'),
          small: $('#caseStatusSmall')
        },
        caseStatusDate: {
          label: $('#caseStatusDateLabel'),
          input: $('#caseStatusDateInput'),
          small: $('#caseStatusDateSmall')
        },
        solvabilityFactor: {
          label: $('#solvabilityFactorLabel'),
          input: $('#solvabilityFactorInput'),
          small: $('#solvabilityFactorSmall')
        },
        weaponInput: {
          label: $('#weaponInputLabel'),
          inputs: [
            $('#weaponInput_handgun'),
            $('#weaponInput_rifle'),
            $('#weaponInput_bluntForce'),
            $('#weaponInput_bodilyForce'),
            $('#weaponInput_knife'),
            $('#weaponInput_unknown')
          ],
          small: $('#weaponInputSmall')
        },
        motiveInput: {
          label: $('#motiveInputLabel'),
          inputs: [
            $('#motiveInput_robbery'),
            $('#motiveInput_burglary'),
            $('#motiveInput_gang'),
            $('#motiveInput_narcotics'),
            $('#motiveInput_domesticViolence'),
            $('#motiveInput_dispute'),
            $('#motiveInput_accidental'),
            $('#motiveInput_selfDefense'),
            $('#motiveInput_unknown')
          ],
          small: $('#motiveInputSmall')
        },
        streetNumber: {
          label: $('#streetNumberLabel'),
          input: $('#streetNumberInput'),
          small: $('#streetNumberSmall')
        },
        streetName: {
          label: $('#streetNameLabel'),
          input: $('#streetNameInput'),
          small: $('#streetNameSmall')
        },
        city: {
          label: $('#cityLabel'),
          input: $('#cityInput'),
          small: $('#citySmall')
        },
        zipCode: {
          label: $('#zipCodeLabel'),
          input: $('#zipCodeInput'),
          small: $('#zipCodeSmall')
        },
        victName: {
          label: $('#victNameLabel'),
          input: $('#victNameInput'),
          small: $('#victNameSmall')
        },
        victSex: {
          label: $('#victSexLabel'),
          input: $('#victSexInput'),
          small: $('#victSexSmall')
        },
        victSupervisedReleaseStatus: {
          label: $('#victSupervisedReleaseStatusLabel'),
          input: $('#victSupervisedReleaseStatusInput'),
          small: $('#victSupervisedReleaseStatusSmall')
        },
        victDesc: {
          label: $('#victDescLabel'),
          input: $('#victDescInput'),
          small: $('#victDescSmall')
        },
        victAge: {
          label: $('#victAgeLabel'),
          input: $('#victAgeInput'),
          small: $('#victAgeSmall')
        },
        victId: {
          label: $('#victIdLabel'),
          input: $('#victIdInput'),
          small: $('#victIdSmall')
        },
        suspName: {
          label: $('#suspNameLabel'),
          input: $('#suspNameInput'),
          small: $('#suspNameSmall')
        },
        suspSex: {
          label: $('#suspSexLabel'),
          input: $('#suspSexInput'),
          small: $('#suspSexSmall')
        },
        suspSupervisedReleaseStatus: {
          label: $('#suspSupervisedReleaseStatusLabel'),
          input: $('#suspSupervisedReleaseStatusInput'),
          small: $('#suspSupervisedReleaseStatusSmall')
        },
        suspDesc: {
          label: $('#suspDescLabel'),
          input: $('#suspDescInput'),
          small: $('#suspDescSmall')
        },
        suspAge: {
          label: $('#suspAgeLabel'),
          input: $('#suspAgeInput'),
          small: $('#suspAgeSmall')
        },
        suspId: {
          label: $('#suspIdLabel'),
          input: $('#suspIdInput'),
          small: $('#suspIdSmall')
        }

      }

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
        console.log(field)
        field['label'].removeClass('text-danger');
        if (field['input'] == 'undefined') {
          for (input in field['inputs']) {
            field['inputs'][input].removeClass('is-invalid');
          }
        } else {
          field['input'].removeClass('is-invalid');
        }
        if (field['small'] != 'undefined') {
          field['small'].text('');
        }
      }

      function applyWarning(field, message) {
        if (field['input'] == 'undefined') {
          for (input in field['inputs']) {
            field['inputs'][input].addClass('is-invalid');
          }
        } else {
          field['input'].addClass('is-invalid');
        }
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

        if (fields['drNum']['input'].val() != '1234') {
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
