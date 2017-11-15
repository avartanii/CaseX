window.InputController = (() => {
  return {
    init: () => {

      $.getScript('js/caseFieldFunctionality.js', function() {

        $('#button-submit-forms').on('click', function() {
          attemptMasterFormSubmission();
        });

        function attemptMasterFormSubmission() {

          if (caseUI.checkFormValidityAndAnnotate()) {
            var existingVictimID = null;  // pass in an existing ID or null.
            var existingSuspectID = null; // pass in an existing ID or null.

            Promise.all([submitVictimForm(existingVictimID), submitSuspectForm(existingSuspectID)]).then((values) => {
              var victim = values[0]['_id'] || values[0];
              var suspect =  values[1]['_id'] || values[1];
              submitCaseForm(victim, suspect);
            }).catch((err) => {
              console.log(err);
            });
          }
        }

        function submitVictimForm(existingVictimInput) {
          if (existingVictimInput) {
            return existingVictimInput;
          } else {
            return $.ajax({
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
          }
        }

        function submitSuspectForm(existingSuspectInput) {
          if (existingSuspectInput) {
            return existingSuspectInput;
          } else {
            return $.ajax({
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
                  // didAPICallFail = true;
                  $('#suspectFormSmall').text(err['responseJSON']['errors']['message']);
                  $('#suspectFormLabel').addClass('text-error');
                  console.log('Suspect submission failed:');
                  console.log(err);
                },
                201: function(suspect) {
                  // suspectJSON = suspect;
                  $('#suspectFormSmall').text('');
                  $('#suspectFormLabel').removeClass('text-error');
                }
              }
            })
          }
        }

        function submitCaseForm(victimId, suspectIds) {
          return $.ajax({
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
              lastModifiedBy: '5a07dcad41156921c81b70e4',  // TODO: Get userId of user logged in
              victim: victimId,
              address: {
                streetNumber: caseUI.fields['streetNumber']['input'].val(),
                streetName: caseUI.fields['streetName']['input'].val(),
                city: caseUI.fields['city']['input'].val(),
                zipCode: caseUI.fields['zipCode']['input'].val()
              },
              suspects: [suspectIds]
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
                console.log(err);
                didAPICallFail = true;
                $('#submitFormSmall').text('Oops! Could not submit form due to the following database error. ' + err['responseJSON']['text'] + ': ' + err['responseJSON']['value'] + '.');
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
