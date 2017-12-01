

$(document).ready(() => {
  let i = 0;
  function duplicate() {
    const form = $('#newSuspectForm');
    const newForm = form.clone();
    const parent = form.parent();
    newForm.attr({ id: `newSuspectForm${i}` });
    parent.append(newForm);
    i += 1;
  }
  $('#button-add-suspect').click(() => {
    duplicate();
  });
});
