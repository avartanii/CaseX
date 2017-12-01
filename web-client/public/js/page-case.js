/* eslint-disable */
window.CaseController = (() => {
  return {
    init: () => {
      var token = window.sessionStorage.getItem('userInfo-token');
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/cases/3',
        headers: {
          'x-access-token': token,
        },
      }).done((data) => {
        $.getScript('js/caseFieldFunctionality.js', () => {
          caseUI.fields['drNum']['input'].val(data.drNumber);
          caseUI.fields['masterDrNum']['input'].val(data.masterDrNumber);
          caseUI.fields['division']['input'].val(data.division);
          caseUI.fields['bureau']['input'].val(data.bureau);
          caseUI.fields['notes']['input'].val(data.notes);
          moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');
          caseUI.fields['dateOccured']['input'].val(moment(data.dateOccured).tz('America/Los_Angeles').format('YYYY-MM-DD'));
          caseUI.fields['dateReported']['input'].val(moment(data.dateReported).tz('America/Los_Angeles').format('YYYY-MM-DD'));
          caseUI.fields['reportingDistrict']['input'].val(data.reportingDistrict);
          caseUI.fields['caseStatus']['input'].val(data.caseStatus);
          caseUI.fields['caseStatusDate']['input'].val(moment(data.caseStatusDate).tz('America/Los_Angeles').format('YYYY-MM-DD'));
          caseUI.fields['solvabilityFactor']['input'].val(data.solvabilityFactor);
          console.log(Object.values(data.weaponUsed));
          console.log(Object.values(data.motive));

          const caseInfo = JSON.parse(data)[0];
          const weaponArray = ['handgun', 'rifle', 'blunt force', 'bodily force', 'knife', 'unknown'];
          const motiveArray = ['robbery', 'burglary', 'gang', 'narcotics', 'domestic violence', 'dispute', 'accidental', 'selfDefense', 'unknown'];

          function indexOfData(index, dataInIndex) {
            return caseInfo[index].toLowerCase().indexOf(dataInIndex);
          }

          for (let i = 0; i < weaponArray.length; i += 1) {
            caseUI.fields['weapon']['inputs'][i].prop('checked', indexOfData('weaponUsed', weaponArray[i]) > -1);
          }

          for (let i = 0; i < motiveArray.length; i += 1) {
            caseUI.fields['motive']['inputs'][i].prop('checked', indexOfData('motive', motiveArray[i]) > -1);
          }

          caseUI.fields['streetNumber']['input'].val(data.address.streetNumber);
          caseUI.fields['streetName']['input'].val(data.address.streetName);
          caseUI.fields['city']['input'].val(data.address.city);
          caseUI.fields['zipCode']['input'].val(data.address.zipCode);

          // if there is more than one victim
          caseUI.fields['victFirstName']['input'].val(data.victim.victName.first);
          caseUI.fields['victMiddleName']['input'].val(data.victim.victName.middle);
          caseUI.fields['victLastName']['input'].val(data.victim.victName.last);
          caseUI.fields['victSex']['input'].val(data.victim.victSex);
          caseUI.fields['victDesc']['input'].val(data.victim.victDesc);
          caseUI.fields['victAge']['input'].val(data.victim.victAge);
          caseUI.fields['victId']['input'].val(data.victim._id);

          // if there is more than one suspect
          caseUI.fields['suspFirstName']['input'].val(data.suspects[0].suspName.first);
          caseUI.fields['suspMiddleName']['input'].val(data.suspects[0].suspName.middle);
          caseUI.fields['suspLastName']['input'].val(data.suspects[0].suspName.last);
          caseUI.fields['suspSex']['input'].val(data.suspects[0].suspSex);
          caseUI.fields['suspSupervisedReleaseStatus']['input'].val(data.suspects[0].supervisedReleaseStatus);
          caseUI.fields['suspDesc']['input'].val(data.suspects[0].suspDesc);
          caseUI.fields['suspAge']['input'].val(data.suspects[0].suspAge);
          // not fully working
          caseUI.fields['juvenileTriedAsAdult']['input'].val(data.suspects[0].juvenileTriedAsAdult);
          caseUI.fields['suspId']['input'].val(data.suspects[0]._id);

          $('#drNumInput').prop('readonly', true);
          $('#masterDrNumInput').prop('readonly', true);
          $('#divisionInput').prop('disabled', true);
          $('#bureauInput').prop('disabled', true);
          $('#notesInput').prop('readonly', true);
          $('#dateOccuredInput').prop('readonly', true);
          $('#dateReportedInput').prop('readonly', true);
          $('#reportingDistrictInput').prop('disabled', true);
          $('#caseStatusInput').prop('disabled', true);
          $('#caseStatusDateInput').prop('readonly', true);
          $('#solvabilityFactorInput').prop('disabled', true);

          // weaponsList
          $('#weaponInput_handgun').prop('disabled', true);
          $('#weaponInput_rifle').prop('disabled', true);
          $('#weaponInput_bluntForce').prop('disabled', true);
          $('#weaponInput_bodilyForce').prop('disabled', true);
          $('#weaponInput_knife').prop('disabled', true);
          $('#weaponInput_unknown').prop('disabled', true);

          // motivesList
          $('#motiveInput_robbery').prop('disabled', true);
          $('#motiveInput_burglary').prop('disabled', true);
          $('#motiveInput_gang').prop('disabled', true);
          $('#motiveInput_narcotics').prop('disabled', true);
          $('#motiveInput_domesticViolence').prop('disabled', true);
          $('#motiveInput_dispute').prop('disabled', true);
          $('#motiveInput_accidental').prop('disabled', true);
          $('#motiveInput_selfDefense').prop('disabled', true);
          $('#motiveInput_unknown').prop('disabled', true);

          // address
          $('#streetNumberInput').prop('readonly', true);
          $('#streetNameInput').prop('readonly', true);
          $('#cityInput').prop('readonly', true);
          $('#zipCodeInput').prop('readonly', true);

          // victimInformation
          $('#victFirstNameInput').prop('readonly', true);
          $('#victMiddleNameInput').prop('readonly', true);
          $('#victLastNameInput').prop('readonly', true);
          $('#victSexInput').prop('disabled', true);
          $('#victDescInput').prop('readonly', true);
          $('#victAgeInput').prop('readonly', true);
          $('#victIdInput').prop('disabled', true);

          // suspectInformation
          $('#suspFirstNameInput').prop('readonly', true);
          $('#suspMiddleNameInput').prop('readonly', true);
          $('#suspLastNameInput').prop('readonly', true);
          $('#suspSexInput').prop('disabled', true);
          $('#suspSupervisedReleaseStatusInput').prop('disabled', true);
          $('#suspDescInput').prop('readonly', true);
          $('#suspAgeInput').prop('readonly', true);
          $('#juvenileTriedAsAdultInput').prop('disabled', true);
          $('#suspIdInput').prop('disabled', true);

          var save = document.getElementById('button-save-page');
          $(save).prop('disabled', true);

          var edit = document.getElementById('edit');
          edit.onclick = function() {
            $('#drNumInput').removeAttr('readonly');
            $('#masterDrNumInput').removeAttr('readonly');
            $('#divisionInput').removeAttr('disabled');
            $('#bureauInput').removeAttr('disabled');
            $('#notesInput').removeAttr('readonly');
            $('#dateOccuredInput').removeAttr('readonly');
            $('#dateReportedInput').removeAttr('readonly');
            $('#reportingDistrictInput').removeAttr('disabled');
            $('#caseStatusInput').removeAttr('disabled');
            $('#caseStatusDateInput').removeAttr('readonly');
            $('#solvabilityFactorInput').removeAttr('disabled');

            $('#weaponInput_handgun').removeAttr('disabled');
            $('#weaponInput_rifle').removeAttr('disabled');
            $('#weaponInput_bluntForce').removeAttr('disabled');
            $('#weaponInput_bodilyForce').removeAttr('disabled');
            $('#weaponInput_knife').removeAttr('disabled');
            $('#weaponInput_unknown').removeAttr('disabled');

            $('#motiveInput_robbery').removeAttr('disabled');
            $('#motiveInput_burglary').removeAttr('disabled');
            $('#motiveInput_gang').removeAttr('disabled');
            $('#motiveInput_narcotics').removeAttr('disabled');
            $('#motiveInput_domesticViolence').removeAttr('disabled');
            $('#motiveInput_dispute').removeAttr('disabled');
            $('#motiveInput_accidental').removeAttr('disabled');
            $('#motiveInput_selfDefense').removeAttr('disabled');
            $('#motiveInput_unknown').removeAttr('disabled');

            $('#streetNumberInput').removeAttr('readonly');
            $('#streetNameInput').removeAttr('readonly');
            $('#cityInput').removeAttr('readonly');
            $('#zipCodeInput').removeAttr('readonly');

            $('#victFirstNameInput').removeAttr('readonly');
            $('#victMiddleNameInput').removeAttr('readonly');
            $('#victLastNameInput').removeAttr('readonly');
            $('#victSexInput').removeAttr('disabled');
            $('#victDescInput').removeAttr('readonly');
            $('#victAgeInput').removeAttr('readonly');
            $('#victIdInput').removeAttr('disabled');

            $('#suspFirstNameInput').removeAttr('readonly');
            $('#suspMiddleNameInput').removeAttr('readonly');
            $('#suspLastNameInput').removeAttr('readonly');
            $('#suspSexInput').removeAttr('disabled');
            $('#suspSupervisedReleaseStatusInput').removeAttr('disabled');
            $('#suspDescInput').removeAttr('readonly');
            $('#suspAgeInput').removeAttr('readonly');
            $('#juvenileTriedAsAdultInput').removeAttr('disabled');
            $('#suspIdInput').removeAttr('disabled');

            $(save).removeAttr('disabled');
            // $(save).onclick(function() {
            //   $.post('http://localhost:3000/cases/3')
            // })
            // be able to edit items and save changes in the database
          }

          var deleteButton = document.getElementById('delete');
          deleteButton.onclick = function() {
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
          }
        });
      })
    }

  };

})();
