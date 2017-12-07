
$(document).ready(() => {
  let formCounter = 0;

  function duplicateSuspectForm() {
    const spacer = $('.casex-spacer').clone().addClass(`${formCounter}`);

    const selectorParent = $('#newOrExistingSuspectInput').parent().parent();
    const newSelector = selectorParent.clone();
    const selector = newSelector.find('#newOrExistingSuspectInput');
    selector.attr({ id: 'newOrExistingSuspectInput' }).addClass(`${formCounter}`);

    const newSusForm = $('#newSuspectForm');
    const newNewForm = newSusForm.clone();
    const formParent = newSusForm.parent();
    newNewForm.attr({ id: 'newSuspectForm', style: 'display: none' }).addClass(`${formCounter}`);

    selector.data({ associatedNewSuspectForm: newNewForm });

    const existSusForm = $('#existingSuspectForm');
    const newExistForm = existSusForm.clone();
    newExistForm.attr({ id: 'existingSuspectForm', style: 'display: none' }).addClass(`${formCounter}`);
    formParent.append(spacer);
    formParent.append(newSelector);
    formParent.append(newNewForm);
    formParent.append(newExistForm);

    selector.data({ associatedExistingSuspectForm: newExistForm });

    $(`#newOrExistingSuspectInput.${formCounter}`).change(function change() {
      newOrExistingSuspectChangeHandler($(this));
    });

    formCounter += 1;
  }

  $('#button-add-suspect').click(() => {
    duplicateSuspectForm();
  });
});
