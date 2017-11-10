window.CaseController = (() => {
  return {
    init: () => {
      axios.get('http://localhost:3000/case/3').then(function(response) {
        var data = JSON.parse(JSON.stringify(response.data));
        console.log(data);
        $.getScript('js/caseFieldFunctionality.js', function() {
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
          // weapon used
          // motive
          // caseUI.fields['motive']['inputs'].val(data.motive);
          caseUI.fields['streetNumber']['input'].val(data.address.streetNumber);
          caseUI.fields['streetName']['input'].val(data.address.streetName);
          caseUI.fields['city']['input'].val(data.address.city);
          caseUI.fields['zipCode']['input'].val(data.address.zipCode);
          caseUI.fields['victFirstName']['input'].val();
          caseUI.fields['victMiddleName']['input'].val();
          caseUI.fields['victLastName']['input'].val();
          caseUI.fields['victSex']['input'].val();
          caseUI.fields['victDesc']['input'].val();
          caseUI.fields['victAge']['input'].val();
          // caseUI.fields['victId']['victIdInput'].val(data.victim);
          // victimId
          caseUI.fields['suspFirstName']['input'].val();
          caseUI.fields['suspMiddleName']['input'].val();
          caseUI.fields['suspLastName']['input'].val();
          caseUI.fields['suspSex']['input'].val();
          caseUI.fields['suspSupervisedReleaseStatus']['input'].val();
          caseUI.fields['suspDesc']['input'].val();
          caseUI.fields['suspAge']['input'].val();
          caseUI.fields['juvenileTriedAsAdult']['input'].val();
          // suspectID
        });
      })
    }

  };

})();
