window.InputController = (() => {
  return {
    init: () => {

      // Link UI inputs
      var drNumInput = $("#drNumInput");
      var masterDrNumInput = $("#masterDrNumInput");
      var divisionInput = $("#divisionInput");
      var bureauInput = $("#bureauInput");
      var notesInput = $("#notesInput");
      var dateOccuredInput = $("#dateOccuredInput");
      var dateReportedInput = $("#dateReportedInput");
      var reportingDistrictInput = $("#reportingDistrictInput");
      var caseStatusInput = $("#caseStatusInput");
      var caseStatusDateInput = $("#caseStatusDateInput");
      var solvabilityFactorInput = $("#solvabilityFactorInput");
      var weaponInput_handgun = $("#weaponInput_handgun");
      var weaponInput_rifle = $("#weaponInput_rifle");
      var weaponInput_bluntForce = $("#weaponInput_bluntForce");
      var weaponInput_bodilyForce = $("#weaponInput_bodilyForce");
      var weaponInput_knife = $("#weaponInput_knife");
      var weaponInput_unknown = $("#weaponInput_unknown");
      var motiveInput_robbery = $("#motiveInput_robbery");
      var motiveInput_burglary = $("#motiveInput_burglary");
      var motiveInput_gang = $("#motiveInput_gang");
      var motiveInput_narcotics = $("#motiveInput_narcotics");
      var motiveInput_domesticViolence = $("#motiveInput_domesticViolence");
      var motiveInput_dispute = $("#motiveInput_dispute");
      var motiveInput_accidental = $("#motiveInput_accidental");
      var motiveInput_selfDefense = $("#motiveInput_selfDefense");
      var motiveInput_unknown = $("#motiveInput_unknown");
      var streetNumberInput = $("#streetNumberInput");
      var streetNameInput = $("#streetNameInput");
      var cityInput = $("#cityInput");
      var zipCodeInput = $("#zipCodeInput");
      var victNameInput = $("#victNameInput");
      var victSexInput = $("#victSexInput");
      var victSupervisedReleaseStatusInput = $("#victSupervisedReleaseStatusInput");
      var victDescInput = $("#victDescInput");
      var victAgeInput = $("#victAgeInput");
      var victIdInput = $("#victIdInput");
      var suspNameInput = $("#suspNameInput");
      var suspSexInput = $("#suspSexInput");
      var suspSupervisedReleaseStatusInput = $("#suspSupervisedReleaseStatusInput");
      var suspDescInput = $("#suspDescInput");
      var suspAgeInput = $("#suspAgeInput");
      var suspIdInput = $("#suspIdInput");
      var newOrExistingVictimInput = $("#newOrExistingVictimInput");
      var newOrExistingSuspectInput = $("#newOrExistingSuspectInput");

      const formToJSON = elements => [].reduce.call(elements, (data, element) => {
        data[element.name] = element.value;
        return data;
      }, {});

      function attemptFormSubmission() {
        if (checkFormValidityAndAnnotate()) {
          submitCaseForm(getCaseDataAsJSON());
        }
      }

      function checkFormValidityAndAnnotate() {
        var isValid = true;
        if () {
          // TODO: Highlight UI
          isValid = false;
        } else if () {
          // TODO: Highlight UI
          isValid = false;
        }
        else {
          return isValid;
        }
      }

      function submitCaseForm(data) {

        const caseForm = document.getElementsByClassName('caseForm')[0]
        const caseData = formToJSON(caseForm.elements);

        // Trying Ajax:
        $.ajax({
          type: 'POST',
          url: "http://localhost:3000/case",
          data: JSON.stringify(data, null, "  "),
          contentType: "application/json",
          dataType: "json",
          accept: "application/json",
          processData: false,
          contentType: false,
          crossDomain: true, // Added
          success: function(data){
            alert(data);
          },
          complete: function () {
            console.log("DEBUG: Found data:")
            console.log(JSON.stringify(data, null, "  "));;
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

      $('#button-submit-forms').on('click', function(){
        attemptFormSubmission();
      })

      // TODO: hide/show UI



    }

  };

})();
