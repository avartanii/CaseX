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
          return newNewForm.find(`#suspFirstNameInput`).val() !== '';
        }
        return true;
      },
      suspLastName: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find(`#suspLastNameInput`).val() !== '';
        }
        return true;
      },
      suspSex: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find(`#suspSexInput`).val() !== '' && newNewForm.find(`#suspSexInput`).val() !== null;
        }
        return true;
      },
      suspSupervisedReleaseStatus: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find(`#suspSupervisedReleaseStatusInput`).val() !== '' && newNewForm.find(`#suspSupervisedReleaseStatusInput`).val() !== null;
        }
        return true;
      },
      suspDesc: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find(`#suspDescInput`).val() !== '';
        }
        return true;
      },
      suspAge: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find(`#suspAgeInput`).val() !== '';
        }
        return true;
      },
      juvenileTriedAsAdult: function test() {
        if (selector.val() === 'new') {
          return newNewForm.find(`#juvenileTriedAsAdultInput`).val() !== '' && newNewForm.find(`#juvenileTriedAsAdultInput`).val() !== null;
        }
        return true;
      },
      suspId: function test() {
        if (selector.val() === 'old') {
          return newNewForm.find(`#suspIdInput`).val() !== '' && newNewForm.find(`#suspIdInput`).val() !== null;
        }
        return true;
      }
    };

    console.log(tests.suspFirstName.toString());

    function addComponent(component) {
      const name = component.input.attr('name');
      // console.log('name: ', component.input.getAttribute('name'));

      if (name !== 'suspMiddleName') {
        caseUI.reqs.push({
          field: component,
          explanation: explanations[name],
          testIfValid: tests[name]
        });
        caseUI.fields[`${name}${formCounter}`] = component;
        // console.log('NEW REQ: ', caseUI.reqs[caseUI.reqs.length - 1]);
        console.log('NEW FIELD: ', caseUI.fields[`${name}${formCounter}`]);
      }
    }

    newNewForm.find('.formLabel').each(function addReq() {
      // console.log('FOUND: ', form);
      const component = {
        label: $(this),
        input: $(this).parent().parent().find('.form-control'),
        small: $(this).parent().parent().find('.text-danger')
      };

      addComponent(component);
    });

    formCounter += 1;
  }

  $('#button-add-suspect').click(() => {
    duplicateSuspectForm();
  });
});
