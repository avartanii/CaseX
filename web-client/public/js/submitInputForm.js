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
        weapon: {
          label: $('#weaponLabel'),
          inputs: [
            $('#weaponInput_handgun'),
            $('#weaponInput_rifle'),
            $('#weaponInput_bluntForce'),
            $('#weaponInput_bodilyForce'),
            $('#weaponInput_knife'),
            $('#weaponInput_unknown')
          ],
          small: $('#weaponSmall')
        },
        motive: {
          label: $('#motiveLabel'),
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
          small: $('#motiveSmall')
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
        newOrExistingVictim: {
          label: $('#newOrExistingVictimLabel'),
          input: $('#newOrExistingVictimInput'),
          small: $('#newOrExistingVictimSmall')
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
        newOrExistingSuspect: {
          label: $('#newOrExistingSuspectLabel'),
          input: $('#newOrExistingSuspectInput'),
          small: $('#newOrExistingSuspectSmall')
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

      var reqs = [
        {
          field: fields['drNum'],
          explanation: 'DR# is required.',
          testIfValid: function() {
            return fields['drNum']['input'].val() != '';
          }
        },
        {
          field: fields['masterDrNum'],
          explanation: 'Master DR# is required.',
          testIfValid: function() {
            return fields['masterDrNum']['input'].val() != '';
          }
        },
        {
          field: fields['division'],
          explanation: 'Division is required.',
          testIfValid: function() {
            return fields['masterDrNum']['input'].val() != '';
          }
        },
        {
          field: fields['bureau'],
          explanation: 'Bureau is required.',
          testIfValid: function() {
            return fields['bureau']['input'].val() != '' && fields['bureau']['input'].val() != null;
          }
        },
        {
          field: fields['notes'],
          explanation: 'Notes is required.',
          testIfValid: function() {
            return fields['notes']['input'].val() != '';
          }
        },
        {
          field: fields['dateOccured'],
          explanation: 'Date occured is required.',
          testIfValid: function() {
            return fields['dateOccured']['input'].val() != '';
          }
        },
        {
          field: fields['dateReported'],
          explanation: 'Date reported is required.',
          testIfValid: function() {
            return fields['dateReported']['input'].val() != '';
          }
        },
        {
          field: fields['reportingDistrict'],
          explanation: 'Reporting district is required.',
          testIfValid: function() {
            return fields['reportingDistrict']['input'].val() != '' && fields['reportingDistrict']['input'].val() != null;
          }
        },
        {
          field: fields['caseStatus'],
          explanation: 'Case status is required.',
          testIfValid: function() {
            return fields['caseStatus']['input'].val() != '' && fields['caseStatus']['input'].val() != null;
          }
        },
        {
          field: fields['caseStatusDate'],
          explanation: 'Case status date is required.',
          testIfValid: function() {
            return fields['caseStatusDate']['input'].val() != '';
          }
        },
        {
          field: fields['solvabilityFactor'],
          explanation: 'Solvability factor is required.',
          testIfValid: function() {
            return fields['solvabilityFactor']['input'].val() != '' && fields['solvabilityFactor']['input'].val() != null;
          }
        },
        {
          field: fields['weapon'],
          explanation: 'Must select at least one option for weapon.',
          testIfValid: function() {
            var atLeastOneIsChecked = false;
            for (checkbox in fields['weapon']['inputs']) {
              if (fields['weapon']['inputs'][checkbox].prop('checked')) {
                atLeastOneIsChecked = true;
              }
            }
            return atLeastOneIsChecked;
          }
        },
        {
          field: fields['motive'],
          explanation: 'Must select at least one option for motive.',
          testIfValid: function() {
            var atLeastOneIsChecked = false;
            for (checkbox in fields['motive']['inputs']) {
              if (fields['motive']['inputs'][checkbox].prop('checked')) {
                atLeastOneIsChecked = true;
              }
            }
            return atLeastOneIsChecked;
          }
        },
        {
          field: fields['streetNumber'],
          explanation: 'Street number is required.',
          testIfValid: function() {
            return fields['streetNumber']['input'].val() != '';
          }
        },
        {
          field: fields['streetName'],
          explanation: 'Street name is required.',
          testIfValid: function() {
            return fields['streetName']['input'].val() != '';
          }
        },
        {
          field: fields['city'],
          explanation: 'City is required.',
          testIfValid: function() {
            return fields['city']['input'].val() != '';
          }
        },
        {
          field: fields['zipCode'],
          explanation: 'Zip code is required.',
          testIfValid: function() {
            return fields['zipCode']['input'].val() != '';
          }
        },
        {
          field: fields['newOrExistingVictim'],
          explanation: 'Must create new victim or select existing victim.',
          testIfValid: function() {
            return !(fields['newOrExistingVictim']['input'].val() == 'default');
          }
        },
        {
          field: fields['victName'],
          explanation: 'Victim name is required.',
          testIfValid: function() {
            if (fields['newOrExistingVictim']['input'].val() == 'new') {
              return fields['victName']['input'].val() != '';
            } else {
              return true;
            }
          }
        },
        {
          field: fields['victSex'],
          explanation: 'Victim sex is required.',
          testIfValid: function() {
            if (fields['newOrExistingVictim']['input'].val() == 'new') {
              return fields['victSex']['input'].val() != '' && fields['victSex']['input'].val() != null;
            } else {
              return true;
            }
          }
        },
        {
          field: fields['victSupervisedReleaseStatus'],
          explanation: 'Victim supervised release status is required.',
          testIfValid: function() {
            if (fields['newOrExistingVictim']['input'].val() == 'new') {
              return fields['victSupervisedReleaseStatus']['input'].val() != '' && fields['victSupervisedReleaseStatus']['input'].val() != null;
            } else {
              return true;
            }
          }
        },
        {
          field: fields['victDesc'],
          explanation: 'Victim description is required.',
          testIfValid: function() {
            if (fields['newOrExistingVictim']['input'].val() == 'new') {
              return fields['victDesc']['input'].val() != '';
            } else {
              return true;
            }
          }
        },
        {
          field: fields['victAge'],
          explanation: 'Victim age is required.',
          testIfValid: function() {
            if (fields['newOrExistingVictim']['input'].val() == 'new') {
              return fields['victAge']['input'].val() != '';
            } else {
              return true;
            }
          }
        },
        {
          field: fields['victId'],
          explanation: 'Victim ID is required.',
          testIfValid: function() {
            if (fields['newOrExistingVictim']['input'].val() == 'old') {
              return fields['victId']['input'].val() != '' && fields['victId']['input'].val() != null;
            } else {
              return true;
            }
          }
        },
        {
          field: fields['newOrExistingSuspect'],
          explanation: 'Must create new victim or select existing suspect.',
          testIfValid: function() {
            return !(fields['newOrExistingSuspect']['input'].val() == 'default');
          }
        },
        {
          field: fields['suspName'],
          explanation: 'Suspect name is required.',
          testIfValid: function() {
            if (fields['newOrExistingSuspect']['input'].val() == 'new') {
              return fields['suspName']['input'].val() != '';
            } else {
              return true;
            }
          }
        },
        {
          field: fields['suspSex'],
          explanation: 'Suspect sex is required.',
          testIfValid: function() {
            if (fields['newOrExistingSuspect']['input'].val() == 'new') {
              return fields['suspSex']['input'].val() != '' && fields['suspSex']['input'].val() != null;
            } else {
              return true;
            }
          }
        },
        {
          field: fields['suspSupervisedReleaseStatus'],
          explanation: 'Suspect supervised release status is required.',
          testIfValid: function() {
            if (fields['newOrExistingSuspect']['input'].val() == 'new') {
              return fields['suspSupervisedReleaseStatus']['input'].val() != '' && fields['suspSupervisedReleaseStatus']['input'].val() != null;
            } else {
              return true;
            }
          }
        },
        {
          field: fields['suspDesc'],
          explanation: 'Suspect description is required.',
          testIfValid: function() {
            if (fields['newOrExistingSuspect']['input'].val() == 'new') {
              return fields['suspDesc']['input'].val() != '';
            } else {
              return true;
            }
          }
        },
        {
          field: fields['suspAge'],
          explanation: 'Suspect age is required.',
          testIfValid: function() {
            if (fields['newOrExistingSuspect']['input'].val() == 'new') {
              return fields['suspAge']['input'].val() != '';
            } else {
              return true;
            }
          }
        },
        {
          field: fields['suspId'],
          explanation: 'Suspect ID is required.',
          testIfValid: function() {
            if (fields['newOrExistingSuspect']['input'].val() == 'old') {
              return fields['suspId']['input'].val() != '' && fields['suspId']['input'].val() != null;
            } else {
              return true;
            }
          }
        }
      ];

      var newOrExistingVictimInput = $('#newOrExistingVictimInput');
      var newOrExistingSuspectInput = $('#newOrExistingSuspectInput');
      var newVictimForm = $('#newVictimForm');
      var existingVictimForm = $('#existingVictimForm');
      var newSuspectForm = $('#newSuspectForm');
      var existingSuspectForm = $('#existingSuspectForm');

      function removeWarning(field) {
        field['label'].removeClass('text-danger');
        if (field['input'] == undefined) {
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
        field['label'].addClass('text-danger');
        if (field['input'] == undefined) {
          for (input in field['inputs']) {
            field['inputs'][input].addClass('is-invalid');
          }
        } else {
          field['input'].addClass('is-invalid');
        }
        field['small'].text(field['small'].text() + ' ' + message);
      }

      function removeAllWarnings() {
        for (field in fields) {
          removeWarning(fields[field]);
        }
      }

      function checkFormValidityAndAnnotate() {

        var isValid = true;

        removeAllWarnings();

        for (req in reqs) {
          if (!reqs[req]['testIfValid']()) {
            applyWarning(reqs[req]['field'], reqs[req]['explanation']);
            isValid = false;
          }
        }

        if (!isValid) {
          $('#submitFormSmall').text('Oops! Could not submit form. Please see errors above.');
        } else {
          $('#submitFormSmall').text('');
        }

        return isValid;

      }

      $('#button-submit-forms').on('click', function() {
        attemptMasterFormSubmission();
      });

      function attemptMasterFormSubmission() {
        if (checkFormValidityAndAnnotate()) {
          var victimId;
          if (newOrExistingVictimInput.val() == 'new') {
            submitVictimForm();
            // TODO: get the generated victId using an API call
          } else {
            // TODO: get victId directly from UI
          }
          var suspectIds;
          if (newOrExistingSuspectInput.val() == 'new') {
            submitSuspectForm();
            // TODO: get the generated suspIds using API calls
          } else {
            // TODO: get suspIds directly from UI
          }
          submitCaseForm(victimId, suspectIds);
        }
      }

      function submitVictimForm() {
        // TODO
      }

      function submitSuspectForm() {
        // TODO
      }

      function submitCaseForm(victimId, suspectIds) {

        // Trying Ajax:
        // $.ajax({
        //   type: 'POST',
        //   url: 'http://localhost:3000/case',
        //   data: JSON.stringify(data, null, '  '),
        //   contentType: 'application/json',
        //   dataType: 'json',
        //   accept: 'application/json',
        //   processData: false,
        //   contentType: false,
        //   crossDomain: true, // Added
        //   success: function(data){
        //     alert(data);
        //   },
        //   complete: function () {
        //     console.log('DEBUG: Found data:')
        //     console.log(JSON.stringify(data, null, '  '));;
        //   }
        // });

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

      // UI functionality

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
