window.InputController = (() => {
  return {
    init: () => {
      const token = window.sessionStorage.getItem('userInfo-token');
      $.getScript('js/caseFieldFunctionality.js', () => {

        updateVictimInputsVisibility();
        updateSuspectInputsVisibility();

        caseUI.newOrExistingVictimInput.change(() => {
          updateVictimInputsVisibility();
        });

        // Necessary for original suspect form
        caseUI.newOrExistingSuspectInput.change(() => {
          updateSuspectInputsVisibility();
        });

        // function updateVictimInputsVisibility() {
        //   const val = caseUI.newOrExistingVictimInput.val();
        //   if (val === 'default') {
        //     caseUI.newVictimForm.hide();
        //     caseUI.existingVictimForm.hide();
        //   } else if (val === 'new') {
        //     caseUI.newVictimForm.show();
        //     caseUI.existingVictimForm.hide();
        //   } else if (val === 'old') {
        //     caseUI.newVictimForm.hide();
        //     caseUI.existingVictimForm.show();
        //   }
        // }
        //
        // updateVictimInputsVisibility();
        //
        // function updateSuspectInputsVisibility(input, newSusForm, existSusForm) {
        //   const val = (!input ? caseUI.newOrExistingSuspectInput : input).val();
        //   const newSuspectForm = (!newSusForm ? caseUI.newSuspectForm : newSusForm);
        //   const existingSuspectForm = (!existSusForm ? caseUI.existingSuspectForm : existSusForm);
        //
        //   if (val === 'default') {
        //     newSuspectForm.hide();
        //     existingSuspectForm.hide();
        //   } else if (val === 'new') {
        //     newSuspectForm.show();
        //     existingSuspectForm.hide();
        //   } else if (val === 'old') {
        //     newSuspectForm.hide();
        //     existingSuspectForm.show();
        //   }
        // }
        //
        // updateSuspectInputsVisibility();
        //
        // caseUI.newOrExistingVictimInput.change(() => {
        //   updateVictimInputsVisibility();
        // });
        //
        // // Necessary for original suspect form
        // caseUI.newOrExistingSuspectInput.change(() => {
        //   updateSuspectInputsVisibility();
        // });
        //
        // newOrExistingSuspectChangeHandler = function handler(input) {
        //   const $this = input;
        //   const $associatedNewForm = $this.data('associatedNewSuspectForm');
        //   const $associatedExistingForm = $this.data('associatedExistingSuspectForm');
        //   updateSuspectInputsVisibility($this, $associatedNewForm, $associatedExistingForm);
        // };
      });
    }
  };
})();
