window.InputController = (() => {
  return {
    init: () => {

      $.getScript('js/caseFieldFunctionality.js', function() {

        $('#button-submit-forms').on('click', function() {
          attemptMasterFormSubmission();
        });

        function attemptMasterFormSubmission() {

          if (caseUI.checkFormValidityAndAnnotate()) {

            var haveAnyAPICallsFailed = false;

            var victimId;
            if (caseUI.newOrExistingVictimInput.val() == 'new') {
              var victimFormSubmissionResults = submitVictimForm();
              console.log('Victim form submission results:');
              console.log(victimFormSubmissionResults['victimJSON']);
              if (victimFormSubmissionResults['failed']) {
                haveAnyAPICallsFailed = true;
              } else {
                victimId = victimFormSubmissionResults['_id'];
              }
            } else if (caseUI.newOrExistingVictimInput.val() == 'old') {
              victimId = caseUI.fields['victId']['input'].val();
            }

            var suspectIds;
            if (caseUI.newOrExistingSuspectInput.val() == 'new') {
              var suspectFormSubmissionResults = submitSuspectForm();
              console.log('Suspect form submission results:');
              console.log(suspectFormSubmissionResults['suspectJSON']);
              if (suspectFormSubmissionResults['failed']) {
                haveAnyAPICallsFailed = true;
              } else {
                suspectIds = [
                  suspectFormSubmissionResults['_id']
                ];
              }
            } else if (caseUI.newOrExistingSuspectInput.val() == 'old') {
              suspectIds = [
                caseUI.fields['suspId']['input'].val()
              ];
            }

            if (!haveAnyAPICallsFailed) {
              submitCaseForm(victimId, suspectIds);
            } else {
              $('#submitFormSmall').addClass('text-warning');
              $('#submitFormSmall').text('Oops! Could not submit form due to database errors. Please see errors above.');
            }

          }
        }

        function submitVictimForm() {
          var didAPICallFail = false;
          var victimJSON = null;
          $.ajax({
            url: 'http://localhost:3000/victim',
            type: 'POST',
            data: {
              victName: {
                first: caseUI.fields['victFirstName']['input'].val(),
                middle: caseUI.fields['victMiddleName']['input'].val(),
                last: caseUI.fields['victLastName']['input'].val()
              },
              victSex: caseUI.fields['victSex']['input'].val(),
              victDesc: caseUI.fields['victDesc']['input'].val(),
              victAge: caseUI.fields['victAge']['input'].val()
            },
            statusCode: {
              400: function(err) {
                didAPICallFail = true;
                $('#victimFormSmall').text(err['responseJSON']['errors']['message']);
                $('#victimFormLabel').addClass('text-error');
                console.log('Victim submission failed:');
                console.log(err);
              },
              201: function(victim) {
                victimJSON = victim;
                $('#victimFormSmall').text('');
                $('#victimFormLabel').removeClass('text-error');
              }
            }
          });
          return {victimJSON: victimJSON, failed: didAPICallFail};
        }

        function submitSuspectForm() {
          var didAPICallFail = false;
          var suspectJSON = null;
          $.ajax({
            url: 'http://localhost:3000/suspect',
            type: 'POST',
            data: {
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
            },
            statusCode: {
              400: function(err) {
                didAPICallFail = true;
                $('#suspectFormSmall').text(err['responseJSON']['errors']['message']);
                $('#suspectFormLabel').addClass('text-error');
                console.log('Suspect submission failed:');
                console.log(err);
              },
              201: function(suspect) {
                suspectJSON = suspect;
                $('#suspectFormSmall').text('');
                $('#suspectFormLabel').removeClass('text-error');
              }
            }
          });
          return {suspectJSON: suspectJSON, failed: didAPICallFail};
        }

        function submitCaseForm(victimId, suspectIds) {
          $.ajax({
            url: 'http://localhost:3000/case',
            type: 'POST',
            data: {
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
            },
            statusCode: {
              400: function(err) {
                console.log('Case submission failed:')
                console.log(caseJSON);
                didAPICallFail = true;
                $('#submitFormSmall').text('Oops! Could not submit form due to the following database errors. ' + err['responseJSON']['errors']['message']);
              },
              404: function(err) {
                console.log('Case submission failed:')
                console.log(caseJSON);
                didAPICallFail = true;
                $('#submitFormSmall').text('Oops! Could not submit form due to the following database errors. ' + err['text'] + ': ' + err['value']);
              },
              201: function(caseJSON) {
                console.log('Case submission results:')
                console.log(caseJSON);
                $('#submitFormSmall').text('');
              }
            }
          });

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
