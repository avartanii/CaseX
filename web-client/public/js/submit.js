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

  return Promise.all((newSuspectInput.map((index) => {
    const newForm = index === -1 ? $('#newSuspectForm') : $(`#newSuspectForm.${index}`);
    return $.ajax({
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
    });
  }))).then((values) => {
    values.forEach((value) => {
      idList.push(value['_id']);
    });
    return { existingSuspects: existingSuspectInput, newSuspects: idList }; // TODO: change?;
  })
}

function submitCaseForm(victimId, existingSuspectIds, newSuspectIds, newOrUpdate) {
  const suspectIds = existingSuspectIds.concat(newSuspectIds);
  const type = newOrUpdate === 'update' ? 'PUT' : 'POST';
  const iD = getCookie('id');
  const url = `http://localhost:3000/cases${newOrUpdate === 'update' ? `/${iD}` : ''}`;
  return $.ajax({
    url,
    type,
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
        console.log()
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
        if (hasMoreData) {
          checkCases();
        }
      }
    }
  });
}

function attemptMasterFormSubmission(newOrUpdate) {
  if (caseUI.checkFormValidityAndAnnotate()) {
    const existingVictimID = caseUI.fields['newOrExistingVictim']['input'].val() === 'old' ?
      caseUI.fields['victId']['input'].val() : null; // pass in an existing ID or null.


    const existingSuspectIDs = [];
    const newSuspectIndeces = [];

    $('[id="newOrExistingSuspectInput"]').each(function each() {
      const index = $(this).attr('class').split(' ')[1] ? +$(this).attr('class').split(' ')[1] : null;
      if ($(this).val() === 'old') {
        existingSuspectIDs.push($(`#existingSuspectForm${index !== null ? `.${index}` : ''}`).find('#suspIdInput').val());
      } else if ($(this).val() === 'new') {
        newSuspectIndeces.push(index !== null ? index : -1);
      }
    });


    Promise.all([submitVictimForm(existingVictimID),
      submitSuspectForm(existingSuspectIDs, newSuspectIndeces)])
      .then((values) => {
        const victim = values[0]['_id'] || values[0];
        const existingSuspects = values[1]['existingSuspects'];
        const newSuspects = values[1]['newSuspects'];
        submitCaseForm(victim, existingSuspects, newSuspects, newOrUpdate);
      }).catch((err) => {
        console.log(err);
      });
  }
}

function updateSubmitButton() {
  $('#button-submit-forms').val((hasMoreData ? 'Submit for Next Case' : 'Submit'));
}

$('#button-submit-forms').click(() => {
  formCounter = 0;
  updateSubmitButton();
  attemptMasterFormSubmission('new');
});

$('#button-save-page').click(() => {
  attemptMasterFormSubmission('update');
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

  $('#progress-row').hide();
}
