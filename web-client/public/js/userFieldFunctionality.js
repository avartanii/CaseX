var fields = {
  userFirstName: {
    label: $('#userFirstNameLabel'),
    input: $('#userFirstNameInput'),
    small: $('#userFirstNameSmall')
  },
  userMiddleName: {
    label: $('#userMiddleNameLabel'),
    input: $('#userMiddleNameInput'),
    small: $('#userMiddleNameSmall')
  },
  userLastName: {
    label: $('#userLastNameLabel'),
    input: $('#userLastNameInput'),
    small: $('#userLastNameSmall')
  },
  userEmployeeId: {
    label: $('#userEmployeeIdLabel'),
    input: $('#userEmployeeIdInput'),
    small: $('#userEmployeeIdSmall')
  },
  userPermissionLevel: {
    label: $('#userPermissionLevelLabel'),
    input: $('#userPermissionLevelInput'),
    small: $('#userPermissionLevelSmall')
  },
  userEmail: {
    label: $('#userEmailLabel'),
    input: $('#userEmailInput'),
    small: $('#userEmailSmall')
  },
  userPassword: {
    label: $('#userPasswordLabel'),
    input: $('#userPasswordInput'),
    small: $('#userPasswordSmall')
  },
  userConfirmPassword: {
    label: $('#userConfirmPasswordLabel'),
    input: $('#userConfirmPasswordInput'),
    small: $('#userConfirmPasswordSmall')
  }
};

var reqs = [
  {
    field: fields['userFirstName'],
    explanation: 'First name is required.',
    testIfValid: function() {
      return fields['userFirstName']['input'].val() != '';
    }
  },
  {
    field: fields['userLastName'],
    explanation: 'Last name is required.',
    testIfValid: function() {
      return fields['userLastName']['input'].val() != '';
    }
  },
  {
    field: fields['userEmployeeId'],
    explanation: 'Employee ID is required.',
    testIfValid: function() {
      return fields['userEmployeeId']['input'].val() != '';
    }
  },
  {
    field: fields['userPermissionLevel'],
    explanation: 'Permission level is required.',
    testIfValid: function() {
      return fields['userPermissionLevel']['input'].val() != null;
    }
  },
  {
    field: fields['userEmail'],
    explanation: 'Email address is required.',
    testIfValid: function() {
      return fields['userEmail']['input'].val() != '';
    }
  },
  {
    field: fields['userPassword'],
    explanation: 'Password is required.',
    testIfValid: function() {
      return fields['userPassword']['input'].val() != '';
    }
  },
  {
    field: fields['userPassword'],
    explanation: 'Password must be at least 8 characters long.',
    testIfValid: function() {
      return fields['userPassword']['input'].val().length >= 8;
    }
  },
  {
    field: fields['userConfirmPassword'],
    explanation: 'Please enter password a second time to confirm.',
    testIfValid: function() {
      return fields['userConfirmPassword']['input'].val() != '';
    }
  },
  {
    field: fields['userConfirmPassword'],
    explanation: 'Password fields must match.',
    testIfValid: function() {
      return fields['userConfirmPassword']['input'].val() == fields['userPassword']['input'].val();
    }
  }
];

function removeWarning(field) {
  field['label'].removeClass('text-danger');
  if (field['input'] == undefined) {
    for (input in field['inputs']) {
      field['inputs'][input].removeClass('is-invalid');
    }
  } else {
    field['input'].removeClass('is-invalid');
  }
  if (field['small'] != 'undefined') {
    field['small'].text('');
  }
}

function applyWarning(field, message) {
  field['label'].addClass('text-danger');
  if (field['input'] == undefined) {
    for (input in field['inputs']) {
      field['inputs'][input].addClass('is-invalid');
    }
  } else {
    field['input'].addClass('is-invalid');
  }
  field['small'].text(field['small'].text() + ' ' + message);
}

function removeAllWarnings() {
  for (field in fields) {
    removeWarning(fields[field]);
  }
  $('#submitFormSmall').removeClass('text-danger');
  $('#submitFormSmall').removeClass('text-success');
}

function checkFormValidityAndAnnotate() {

  var isValid = true;

  removeAllWarnings();

  for (req in reqs) {
    if (!reqs[req]['testIfValid']()) {
      applyWarning(reqs[req]['field'], reqs[req]['explanation']);
      isValid = false;
    }
  }

  if (!isValid) {
    $('#submitFormSmall').addClass('text-danger');
    $('#submitFormSmall').text('Oops! Could not submit form. Please see errors above.');
  } else {
    $('#submitFormSmall').text('');
  }

  return isValid;

}

var userUI = {
  fields: fields,
  reqs: reqs,
  removeWarning: removeWarning,
  applyWarning: applyWarning,
  removeAllWarnings: removeAllWarnings,
  checkFormValidityAndAnnotate: checkFormValidityAndAnnotate

}
