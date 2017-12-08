let formCounter;
$(document).ready(() => {
  formCounter = 0;

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

    const explanations = {
      suspFirstName: 'Suspect first name is required.',
      suspLastName: 'Suspect last name is required.',
      suspSex: 'Suspect sex is required.',
      suspSupervisedReleaseStatus: 'Suspect supervised release status is required.',
      suspDesc: 'Suspect description is required.',
      suspAge: 'Suspect age is required.',
      juvenileTriedAsAdult: 'Juvenile tried as adult is required.',
      suspId: 'Suspect ID is required.'
    };

    const tests = {
      suspFirstName: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find('#suspFirstNameinput').val() !== '';
        }
        return true;
      },
      suspLastName: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find('#suspLastNameinput').val() !== '';
        }
        return true;
      },
      suspSex: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find('#suspSexinput').val() !== '' && newNewForm.find('#suspSexinput').val() !== null;
        }
        return true;
      },
      suspSupervisedReleaseStatus: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find('#suspSupervisedReleaseStatusinput').val() !== '' && newNewForm.find('#suspSupervisedReleaseStatusinput').val() !== null;
        }
        return true;
      },
      suspDesc: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find('#suspDescinput').val() !== '';
        }
        return true;
      },
      suspAge: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find('#suspAgeinput').val() !== '';
        }
        return true;
      },
      juvenileTriedAsAdult: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find('#juvenileTriedAsAdultinput').val() !== '' && newNewForm.find('#juvenileTriedAsAdultinput').val() !== null;
        }
        return true;
      },
      suspId: function test() {
        if (selector.val() === 'old') {
          return newNewForm.find('#suspIdinput').val() !== '' && newNewForm.find('#suspIdinput').val() !== null;
        }
        return true;
      }
    };

    newNewForm.find('.formLabel').each(function addReq(index, form) {
      console.log('FOUND: ', form);
      const component = {
        label: form,
        input: $(this).parent().parent().find('.form-control'),
        small: $(this).parent().parent().find('.text-danger')
      };

      const name = component.input.attr('name');

      if (name !== 'suspMiddleName') {
        caseUI.reqs.push({
          field: component,
          explanation: explanations[name],
          testIfValid: tests[name]
        });
        console.log('NEW REQ: ', caseUI.reqs[caseUI.reqs.length - 1]);
      }
    });

    formCounter += 1;
  }

  $('#button-add-suspect').click(() => {
    duplicateSuspectForm();
  });
});
