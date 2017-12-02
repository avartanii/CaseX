

$(document).ready(() => {
  let i = 0;
  function duplicate() {
    const spacer = $('.casex-spacer').clone();

    let selector = $('#newOrExistingSuspectInput').parent().parent();
    const newSelector = selector.clone();
    selector = newSelector.find('#newOrExistingSuspectInput');
    selector.attr({ id: `newOrExistingSuspectInput${i}` });

    const form = $('#newSuspectForm');
    const newForm = form.clone();
    const formParent = form.parent();
    newForm.attr({ id: `newSuspectForm${i}` });
    formParent.append(newSelector);
    formParent.append(newForm);

    i += 1;
  }
  $('#button-add-suspect').click(() => {
    duplicate();
  });
});
