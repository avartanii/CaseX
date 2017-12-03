

$(document).ready(() => {
  let i = 1;

  function duplicate() {
    const spacer = $('.casex-spacer').clone();

    let selector = $('#newOrExistingSuspectInput').parent().parent();
    const newSelector = selector.clone();
    selector = newSelector.find('newOrExistingSuspectInput');
    selector.attr({ id: 'newOrExistingSuspectInput' }).addClass(`${i}`);
    selector.change(newOrExistingSuspectChangeHandler(i));

    const form = $('#newSuspectForm');
    const newForm = form.clone();
    const formParent = form.parent();
    newForm.attr({ id: 'newSuspectForm', display: 'none' }).addClass(`${i}`);
    formParent.append(newSelector);
    formParent.append(newForm);
    selector.data({ associatedForm: newForm });

    i += 1;

    // console.log(caseUI.newOrExistingSuspectInput);

    // - Use selector.data to directly link created selector to created form.
    // - Then create change handler in page-input.js (line 256)
    // - Call the handler upon completion to handle the results
    // - Good luck
  }
  $('#button-add-suspect').click(() => {
    duplicate();
  });
});
