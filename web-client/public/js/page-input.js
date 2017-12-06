window.InputController = (() => {
  return {
    init: () => {
      const token = window.sessionStorage.getItem('userInfo-token');
      $.getScript('js/caseFieldFunctionality.js', () => {
        function submitVictimForm(existingVictimInput) {
          if (!existingVictimInput) {
            return $.ajax({
              url: 'http://localhost:3000/victims',
              type: 'POST',
              headers: {
                'x-access-token': token
              },
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
                400: (err) => {
                  didAPICallFail = true;
                  $('#victimFormSmall').text(err['responseJSON']['errors']['message']);
                  $('#victimFormLabel').addClass('text-danger');
                  console.log('Victim submission failed:');
                  console.log(err);
                },
                201: (victim) => {
                  victimJSON = victim;
                  $('#victimFormSmall').text('');
                  $('#victimFormLabel').removeClass('text-danger');
                }
              }
            });
          }
          return existingVictimInput; // TODO: change?
        }

        function submitSuspectForm(existingSuspectInput, newSuspectInput) {
          const idList = [];

          newSuspectInput.forEach((index) => {
            const newForm = index === -1 ? $('#newSuspectForm') : $(`#newSuspectForm.${index}`);
            console.log('newForm ajax: ', newForm);
            const newSuspect = $.ajax({
              url: 'http://localhost:3000/suspects',
              type: 'POST',
              headers: {
                'x-access-token': token
              },
              data: {
                suspName: {
                  first: newForm.find('#suspFirstNameInput').val(),
                  middle: newForm.find('#suspMiddleNameInput').val(),
                  last: newForm.find('#suspLastNameInput').val()
                },
                suspSex: newForm.find('#suspSexInput').val(),
                supervisedReleaseStatus: newForm.find('#suspSupervisedReleaseStatusInput').val(),
                suspDesc: newForm.find('#suspDescInput').val(),
                suspAge: newForm.find('#suspAgeInput').val(),
                juvenileTriedAsAdult: newForm.find('#juvenileTriedAsAdultInput').val()
              },
              statusCode: {
                400: (err) => {
                  // TODO: commented out?
                  // didAPICallFail = true;
                  $('#newForm').find('#suspectFormSmall').text(err['responseJSON']['errors']['message']);
                  $('#newForm').find('#suspectFormLabel').addClass('text-danger');
                  console.log('Suspect submission failed:');
                  console.log(err);
                },
                201: (suspect) => {
                  // TODO: commented out?
                  // suspectJSON = suspect;
                  $('#newForm').find('#suspectFormSmall').text('');
                  $('#newForm').find('#suspectFormLabel').removeClass('text-danger');
                }
              }
            }).done(() => {
              console.log('new suspect ajax id: ', newSuspect);
              console.log('new suspect ajax id: ', newSuspect['responseJSON']);
              console.log('new suspect ajax id: ', newSuspect['responseJSON']['_id']);
              idList.push(newSuspect['responseJSON']['_id']);
            });
          });
          console.log('ID LIST: ', idList);
          return { existingSuspects: existingSuspectInput, newSuspects: idList }; // TODO: change?


          // if (!existingSuspectInput) {
          //   return $.ajax({
          //     url: 'http://localhost:3000/suspects',
          //     type: 'POST',
          //     headers: {
          //       'x-access-token': token
          //     },
          //     data: {
          //       suspName: {
          //         first: caseUI.fields['suspFirstName']['input'].val(),
          //         middle: caseUI.fields['suspMiddleName']['input'].val(),
          //         last: caseUI.fields['suspLastName']['input'].val()
          //       },
          //       suspSex: caseUI.fields['suspSex']['input'].val(),
          //       supervisedReleaseStatus: caseUI.fields['suspSupervisedReleaseStatus']['input'].val(),
          //       suspDesc: caseUI.fields['suspDesc']['input'].val(),
          //       suspAge: caseUI.fields['suspAge']['input'].val(),
          //       juvenileTriedAsAdult: caseUI.fields['juvenileTriedAsAdult']['input'].val()
          //     },
          //     statusCode: {
          //       400: (err) => {
          //         // TODO: commented out?
          //         // didAPICallFail = true;
          //         $('#suspectFormSmall').text(err['responseJSON']['errors']['message']);
          //         $('#suspectFormLabel').addClass('text-danger');
          //         console.log('Suspect submission failed:');
          //         console.log(err);
          //       },
          //       201: (suspect) => {
          //         // TODO: commented out?
          //         // suspectJSON = suspect;
          //         $('#suspectFormSmall').text('');
          //         $('#suspectFormLabel').removeClass('text-danger');
          //       }
          //     }
          //   });
          // }
          // return existingSuspectInput; // TODO: change?
        }

        function submitCaseForm(victimId, existingSuspectIds, newSuspectIds) {
          console.log('exist ids: ', existingSuspectIds);
          console.log('new ids: ', newSuspectIds);
          const suspectIds = existingSuspectIds.concat(newSuspectIds);
          console.log('suspectIds: ', suspectIds);
          return $.ajax({
            url: 'http://localhost:3000/cases',
            type: 'POST',
            headers: {
              'x-access-token': token
            },
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
                const weaponsList = [];
                const weaponInputs = Object.keys(caseUI.fields['weapon']['inputs']);
                weaponInputs.forEach((weaponCheckbox) => {
                  if (caseUI.fields['weapon']['inputs'][weaponCheckbox].prop('checked')) {
                    weaponsList.push(caseUI.fields['weapon']['inputs'][weaponCheckbox].attr('name'));
                  }
                });
                return weaponsList;
              }()),
              motive: (function getMotives() {
                const motivesList = [];
                const motiveInputs = Object.keys(caseUI.fields['motive']['inputs']);
                motiveInputs.forEach((motiveCheckbox) => {
                  if (caseUI.fields['motive']['inputs'][motiveCheckbox].prop('checked')) {
                    motivesList.push(caseUI.fields['motive']['inputs'][motiveCheckbox].attr('name'));
                  }
                });
                return motivesList;
              }()),
              lastModifiedDate: (new Date()).toISOString(),
              lastModifiedBy: '5a07dcad41156921c81b70e4', // TODO: Get userId of user logged in
              victim: victimId,
              address: {
                streetNumber: caseUI.fields['streetNumber']['input'].val(),
                streetName: caseUI.fields['streetName']['input'].val(),
                city: caseUI.fields['city']['input'].val(),
                zipCode: caseUI.fields['zipCode']['input'].val()
              },
              suspects: suspectIds
            },
            statusCode: {
              400: (err) => {
                console.log('Case submission failed:');
                console.log(caseJSON);
                didAPICallFail = true;
                $('#submitFormSmall').removeClass('text-success');
                $('#submitFormSmall').addClass('text-danger');
                $('#submitFormSmall').text(`Oops! Could not submit form due to the following database errors. ${err['responseJSON']['errors']['message']}`);
              },
              404: (err) => {
                console.log('Case submission failed:');
                console.log(err);
                didAPICallFail = true;
                $('#submitFormSmall').removeClass('text-success');
                $('#submitFormSmall').addClass('text-danger');
                $('#submitFormSmall').text(`Oops! Could not submit form due to the following database error. ${err['responseJSON']['text']}: ${err['responseJSON']['value']}.`);
              },
              201: (caseJSON) => {
                console.log('Case submission results:');
                console.log(caseJSON);
                $('#submitFormSmall').removeClass('text-danger');
                $('#submitFormSmall').addClass('text-success');
                $('#submitFormSmall').text(`Case submission succeeded with DR# ${caseUI.fields['drNum']['input'].val()}.`);
                clearAllInputs();
              }
            }
          });
        }

        function attemptMasterFormSubmission() {
          if (caseUI.checkFormValidityAndAnnotate()) {
            const existingVictimID = caseUI.fields['newOrExistingVictim']['input'].val() === 'old' ?
              caseUI.fields['victId']['input'].val() : null; // pass in an existing ID or null.
            const existingSuspectID = caseUI.fields['newOrExistingSuspect']['input'].val() === 'old' ?
              caseUI.fields['suspId']['input'].val() : null; // pass in an existing ID or null.


            const existingSuspectIDs = [];
            const newSuspectIndeces = [];
            // $('[id="suspIdInput"]').each(function each() {
            //   console.log($(this));
            //   existingSuspectIDs.push($(this).val());
            // });

            $('[id="newOrExistingSuspectInput"]').each(function each() {
              const index = $(this).attr('class').split(' ')[1] ? +$(this).attr('class').split(' ')[1] : null;
              console.log('Index: ', index);
              if ($(this).val() === 'old') {
                existingSuspectIDs.push($(`#existingSuspectForm${index !== null ? `.${index}` : ''}`).find('#suspIdInput').val());
              } else if ($(this).val() === 'new') {
                newSuspectIndeces.push(index !== null ? index : -1);
              }
            });


            console.log('existing suspects: ', existingSuspectIDs);
            console.log('new suspects: ', newSuspectIndeces);


            Promise.all([submitVictimForm(existingVictimID), submitSuspectForm(existingSuspectIDs, newSuspectIndeces)])
              .then((values) => {
                console.log('values: ', values);
                const victim = values[0]['_id'] || values[0];
                const existingSuspects = values[1]['existingSuspects'];
                const newSuspects = values[1]['newSuspects'];
                submitCaseForm(victim, existingSuspects, newSuspects);
              }).catch((err) => {
                console.log(err);
              });
              //   const victim = values[0]['_id'] || values[0];
              //   const suspect = values[1]['_id'] || values[1];
              //   console.log('victim: ', victim);
              //   submitCaseForm(victim, suspect);
              // }).catch((err) => {
              //   console.log(err);
              // });
          }
        }

        $('#button-submit-forms').on('click', () => {
          attemptMasterFormSubmission();
        });

        function clearAllInputs() {
          for (field in caseUI.fields) {
            if (caseUI.fields[field]['input'] === undefined) {
              for (input in caseUI.fields[field]['inputs']) {
                caseUI.fields[field]['inputs'][input].prop('checked', false);
              }
            } else {
              caseUI.fields[field]['input'].val('');
            }
          }
          $('[id="newOrExistingSuspectInput"]').each(function each() {
            const index = $(this).attr('class').split(' ')[1] ? +$(this).attr('class').split(' ')[1] : null;
            if (index !== null) {
              $(`#newOrExistingSuspectInput.${index}`).parent().parent().remove();
              $(`#newSuspectForm.${index}`).remove();
              $(`#existingSuspectForm.${index}`).remove();
              $(`.casex-spacer.${index}`).remove();
            } else {
              $(this).val('default');
              newOrExistingSuspectChangeHandler($(this));
            }
          });
          // caseUI.newOrExistingSuspectInput.val('default');
          // updateSuspectInputsVisibility();
          // caseUI.newOrExistingVictimInput.val('default');
          // updateVictimInputsVisibility();
        }

        function updateVictimInputsVisibility() {
          const val = caseUI.newOrExistingVictimInput.val();
          if (val === 'default') {
            caseUI.newVictimForm.hide();
            caseUI.existingVictimForm.hide();
          } else if (val === 'new') {
            caseUI.newVictimForm.show();
            caseUI.existingVictimForm.hide();
          } else if (val === 'old') {
            caseUI.newVictimForm.hide();
            caseUI.existingVictimForm.show();
          }
        }
        updateVictimInputsVisibility();

        // function updateSuspectInputsVisibility() {
        //   const val = caseUI.newOrExistingSuspectInput.val();
        //   if (val === 'default') {
        //     caseUI.newSuspectForm.hide();
        //     caseUI.existingSuspectForm.hide();
        //   } else if (val === 'new') {
        //     caseUI.newSuspectForm.show();
        //     caseUI.existingSuspectForm.hide();
        //   } else if (val === 'old') {
        //     caseUI.newSuspectForm.hide();
        //     caseUI.existingSuspectForm.show();
        //   }
        // }

        function updateSuspectInputsVisibility(input, newSusForm, existSusForm) {
          // console.log('Input: ', input);
          // console.log('Form: ', newSusForm);
          const val = (!input ? caseUI.newOrExistingSuspectInput : input).val();
          const newSuspectForm = (!newSusForm ? caseUI.newSuspectForm : newSusForm);
          const existingSuspectForm = (!existSusForm ? caseUI.existingSuspectForm : existSusForm);
          // console.log('Val: ', val);
          // console.log('newSuspectForm: ', newSuspectForm);
          // console.log('existSuspectForm: ', existingSuspectForm);

          if (val === 'default') {
            newSuspectForm.hide();
            existingSuspectForm.hide();
          } else if (val === 'new') {
            newSuspectForm.show();
            existingSuspectForm.hide();
          } else if (val === 'old') {
            newSuspectForm.hide();
            existingSuspectForm.show();
          }
        }

        updateSuspectInputsVisibility();

        caseUI.newOrExistingVictimInput.change(() => {
          updateVictimInputsVisibility();
        });

        caseUI.newOrExistingSuspectInput.change(() => {
          updateSuspectInputsVisibility();
        });

        const newOrExistingSuspectChangeHandler = function handler(input) {
          const $this = input;
          // console.log('THIS: ', $this);
          // console.log('Handler i: ', i);
          // const input = $(`#newOrExistingSuspectInput.${i}`);
          const $associatedNewForm = $this.data('associatedNewSuspectForm');
          const $associatedExistingForm = $this.data('associatedExistingSuspectForm');
          // console.log('Handler New Form: ', $associatedNewForm);
          // console.log('Handler Existing Form: ', $associatedExistingForm);
          updateSuspectInputsVisibility($this, $associatedNewForm, $associatedExistingForm);
          // const $this = $(`#newOrExistingSuspectInput.${i}`);
          // $associatedForm = $this.data('associatedForm');
        };

        let i = 0;
        function duplicateSuspectForm() {
          const spacer = $('.casex-spacer').clone().addClass(`${i}`);

          const selectorParent = $('#newOrExistingSuspectInput').parent().parent();
          const newSelector = selectorParent.clone();
          const selector = newSelector.find('#newOrExistingSuspectInput');
          selector.attr({ id: 'newOrExistingSuspectInput' }).addClass(`${i}`);

          const newSusForm = $('#newSuspectForm');
          const newNewForm = newSusForm.clone();
          const formParent = newSusForm.parent();
          newNewForm.attr({ id: 'newSuspectForm', style: 'display: none' }).addClass(`${i}`);

          selector.data({ associatedNewSuspectForm: newNewForm });

          const existSusForm = $('#existingSuspectForm');
          const newExistForm = existSusForm.clone();
          newExistForm.attr({ id: 'existingSuspectForm', style: 'display: none' }).addClass(`${i}`);
          formParent.append(spacer);
          formParent.append(newSelector);
          formParent.append(newNewForm);
          formParent.append(newExistForm);

          selector.data({ associatedExistingSuspectForm: newExistForm });

          $(`#newOrExistingSuspectInput.${i}`).change(function change() {
            newOrExistingSuspectChangeHandler($(this));
          });

          i += 1;

          // console.log(caseUI.newOrExistingSuspectInput);

          // - Use selector.data to directly link created selector to created form.
          // - Then create change handler in page-input.js (line 256)
          // - Call the handler upon completion to handle the results
          // - Good luck
        }

        $('#button-add-suspect').click(() => {
          duplicateSuspectForm();
        });


        // $('[id="newOrExistingSuspectInput"]').change(function() {
        // // $(caseUI).change('newOrExistingSuspectInput', function() {
        // //   console.log($('[id="newOrExistingSuspectInput"]'));
        // //   // console.log($(this));
        // //   $('#newOrExistingSuspectInput').each(function sus(i) {
        // //     console.log(i, ': ', $(this));
        // //   });
        //   updateSuspectInputsVisibility();
        // });
      });
    }
  };
})();
