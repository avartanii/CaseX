window.InputController = (() => {
  return {
    init: () => {
      // var caseUI = require('js/caseFieldFunctionality.js');

      $.getScript('js/caseFieldFunctionality.js', function() {

        // var caseUI = require('js/caseFieldFunctionality.js');

        $('#button-submit-forms').on('click', function() {
          attemptMasterFormSubmission();
        });

        function attemptMasterFormSubmission() {
          if (caseUI.checkFormValidityAndAnnotate()) {
            var victimId;
            if (caseUI.newOrExistingVictimInput.val() == 'new') {
              submitVictimForm();
              // TODO: get the generated victId using an API call
            } else {
              // TODO: get victId directly from UI
            }
            var suspectIds;
            if (caseUI.newOrExistingSuspectInput.val() == 'new') {
              submitSuspectForm();
              // TODO: get the generated suspIds using API calls
            } else {
              // TODO: get suspIds directly from UI
            }
            submitCaseForm(victimId, suspectIds);
          }
        }

        function submitVictimForm() {
          var data = {
            victName: {
              first: caseUI.fields['victFirstName']['input'].val(),
              middle: caseUI.fields['victMiddleName']['input'].val(),
              last: caseUI.fields['victLastName']['input'].val()
            },
            victSex: caseUI.fields['victSex']['input'].val(),
            victDesc: caseUI.fields['victDesc']['input'].val(),
            victAge: caseUI.fields['victAge']['input'].val()
          }
          console.log('No data submitted yet. Compiled data for VICTIM:');
          console.log(data);
        }

        function submitSuspectForm() {
          var data = {
            suspName: {
              first: caseUI.fields['suspFirstName']['input'].val(),
              middle: caseUI.fields['suspMiddleName']['input'].val(),
              last: caseUI.fields['suspLastName']['input'].val()
            },
            suspSex: caseUI.fields['suspSex']['input'].val(),
            supervisedReleaseStatus: caseUI.fields['suspSupervisedReleaseStatus']['input'].val(),
            suspDesc: caseUI.fields['suspDesc']['input'].val(),
            suspAge: caseUI.fields['suspAge']['input'].val(),
            juvenileTriedAsAdult: caseUI.fields['juvenileTriedAsAdult']['input'].val()
          }
          console.log('No data submitted yet. Compiled data for SUSPECT:');
          console.log(data);
        }

        function submitCaseForm(victimId, suspectIds) {

          var data = {
            drNumber: caseUI.fields['drNum']['input'].val(),
            masterDrNumber: caseUI.fields['masterDrNum']['input'].val(),
            division: caseUI.fields['division']['input'].val(),
            bureau: caseUI.fields['bureau']['input'].val(),
            notes: caseUI.fields['notes']['input'].val(),
            dateOccured: (new Date(caseUI.fields['dateOccured']['input'].val())).toISOString(),
            dateReported: (new Date(caseUI.fields['dateReported']['input'].val())).toISOString(),
            reportingDistrict: caseUI.fields['reportingDistrict']['input'].val(),
            caseStatus: caseUI.fields['caseStatus']['input'].val(),
            caseStatusDate: (new Date(caseUI.fields['caseStatusDate']['input'].val())).toISOString(),
            solvabilityFactor: caseUI.fields['solvabilityFactor']['input'].val(),
            weaponUsed: (function getWeaponsUsed() {
              var weaponsList = [];
              for (weaponCheckbox in caseUI.fields['weapon']['inputs']) {
                if (caseUI.fields['weapon']['inputs'][weaponCheckbox].prop('checked')) {
                  weaponsList.push(caseUI.fields['weapon']['inputs'][weaponCheckbox].attr('name'));
                }
              }
              return weaponsList;
            })(),
            motive: (function getMotives() {
              var motivesList = [];
              for (motiveCheckbox in caseUI.fields['motive']['inputs']) {
                if (caseUI.fields['motive']['inputs'][motiveCheckbox].prop('checked')) {
                  motivesList.push(caseUI.fields['motive']['inputs'][motiveCheckbox].attr('name'));
                }
              }
              return motivesList;
            })(),
            lastModifiedDate: (new Date).toISOString(),
            lastModifiedBy: null,  // TODO: Get userId of user logged in
            victim: caseUI.victimId,
            address: {
              streetNumber: caseUI.fields['streetNumber']['input'].val(),
              streetName: caseUI.fields['streetName']['input'].val(),
              city: caseUI.fields['city']['input'].val(),
              zipCode: caseUI.fields['zipCode']['input'].val()
            },
            suspects: suspectIds
          };

          console.log('No data submitted yet. Compiled data for CASE:');
          console.log(data);

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

        function updateVictimInputsVisibility() {
          var val = caseUI.newOrExistingVictimInput.val();
          if (val == 'default') {
            caseUI.newVictimForm.hide();
            caseUI.existingVictimForm.hide();
          } else if (val == 'new') {
            caseUI.newVictimForm.show();
            caseUI.existingVictimForm.hide();
          } else if (val == 'old') {
            caseUI.newVictimForm.hide();
            caseUI.existingVictimForm.show();
          }
        }
        updateVictimInputsVisibility();

        function updateSuspectInputsVisibility() {
          var val = caseUI.newOrExistingSuspectInput.val();
          if (val == 'default') {
            caseUI.newSuspectForm.hide();
            caseUI.existingSuspectForm.hide();
          } else if (val == 'new') {
            caseUI.newSuspectForm.show();
            caseUI.existingSuspectForm.hide();
          } else if (val == 'old') {
            caseUI.newSuspectForm.hide();
            caseUI.existingSuspectForm.show();
          }
        }
        updateSuspectInputsVisibility();

        caseUI.newOrExistingVictimInput.change(function() {
          updateVictimInputsVisibility();
        });

        caseUI.newOrExistingSuspectInput.change(function() {
          updateSuspectInputsVisibility();
        });

      });

    }

  };

})();
