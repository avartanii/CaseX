let allCases;

const fillData = function fill(data) {
  const caseInfo = data;
  const token = window.sessionStorage.getItem('userInfo-token');
  const weaponArray = ['handgun', 'rifle', 'blunt force', 'bodily force', 'knife', 'unknown'];
  const motiveArray = ['robbery', 'burglary', 'gang', 'narcotics', 'domestic violence', 'dispute', 'accidental', 'selfDefense', 'unknown'];

  function parseDate(date) {
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  function indexOfData(index, dataInIndex) {
    return caseInfo[index].toLowerCase().indexOf(dataInIndex);
  }

  caseUI.fields['drNum']['input'].val(caseInfo['drNumber']);
  caseUI.fields['masterDrNum']['input'].val(caseInfo['masterDrNumber']);
  caseUI.fields['division']['input'].val(caseInfo['division']);
  caseUI.fields['bureau']['input'].val(caseInfo['bureau']);

  caseUI.fields['dateOccured']['input'].val(parseDate(caseInfo['dateOccured']));
  caseUI.fields['dateReported']['input'].val(parseDate(caseInfo['dateReported']));

  caseUI.fields['reportingDistrict']['input'].val(caseInfo['reportingDistrict']);
  caseUI.fields['caseStatus']['input'].val(caseInfo['caseStatus']);
  caseUI.fields['caseStatusDate']['input'].val(parseDate(caseInfo['caseStatusDate']));
  caseUI.fields['solvabilityFactor']['input'].val(caseInfo['solvabilityFactor']);

  for (let i = 0; i < weaponArray.length; i += 1) {
    caseUI.fields['weapon']['inputs'][i].prop('checked', indexOfData('weaponUsed', weaponArray[i]) > -1);
  }

  for (let i = 0; i < motiveArray.length; i += 1) {
    caseUI.fields['motive']['inputs'][i].prop('checked', indexOfData('motive', motiveArray[i]) > -1);
  }

  // I know it's ugly, but it's necessary.
  // Possibly redo using .split(\r\n)
  const address = JSON.stringify(caseInfo['address']);
  const streetNumIndex = address.indexOf('\u0020');
  const streetNameIndex = address.indexOf('\\r');
  const cityIndex = address.substring(streetNameIndex + 4).indexOf('\\r') + streetNameIndex + 4;
  const streetNum = address.substring(1, streetNumIndex);
  const streetName = address.substring(streetNumIndex + 1, streetNameIndex);
  const city = address.substring(streetNameIndex + 4, cityIndex);
  const zip = address.substring(cityIndex + 4, address.length - 1);

  caseUI.fields['streetNumber']['input'].val(streetNum);
  caseUI.fields['streetName']['input'].val(streetName);
  caseUI.fields['city']['input'].val(city);
  caseUI.fields['zipCode']['input'].val(zip);

  $.ajax({
    url: 'http://localhost:3000/victims',
    type: 'GET',
    headers: {
      'x-access-token': token
    }
  }).done((response) => {
    const victimId = caseInfo['victim'];
    for (let i = 0; i < response.length; i += 1) {
      if (victimId === response[i]['_id']) {
        caseUI.fields['victFirstName']['input'].val(response[i]['victName']['first']);
        caseUI.fields['victMiddleName']['input'].val(response[i]['victName']['middle']);
        caseUI.fields['victLastName']['input'].val(response[i]['victName']['last']);
        caseUI.fields['victSex']['input'].val(response[i]['victSex']);
        caseUI.fields['victDesc']['input'].val(response[i]['victDesc']);
        caseUI.fields['victAge']['input'].val(response[i]['victAge']);
        caseUI.fields['victId']['input'].val(response[i]['_id']);
      }
    }

    caseUI.newOrExistingVictimInput.val('old');
    caseUI.existingVictimForm.show();
  });

  $.ajax({
    url: 'http://localhost:3000/suspects',
    type: 'GET',
    headers: {
      'x-access-token': token
    }
  }).done((response) => {
    const suspectIds = caseInfo['suspects'].split('\r\n');
    for (let i = 0; i < suspectIds.length; i += 1) {
    // suspectIds.forEach((suspectId) => {
      for (let j = 0; j < response.length; j += 1) {
        if (suspectIds[i] === response[j]['_id']) {
          if (i === 0) {
            caseUI.fields['suspFirstName']['input'].val(response[j]['suspName']['first']);
            caseUI.fields['suspMiddleName']['input'].val(response[j]['suspName']['middle']);
            caseUI.fields['suspLastName']['input'].val(response[j]['suspName']['last']);
            caseUI.fields['suspSex']['input'].val(response[j]['suspSex']);
            caseUI.fields['suspSupervisedReleaseStatus']['input'].val(response[j]['supervisedReleaseStatus']);
            caseUI.fields['suspDesc']['input'].val(response[j]['suspDesc']);
            caseUI.fields['suspAge']['input'].val(response[j]['suspAge']);
            caseUI.fields['juvenileTriedAsAdult']['input'].prop('selectedIndex', response[j]['juvenileTriedAsAdult'] ? 1 : 2);
            caseUI.fields['suspId']['input'].val(response[j]['_id']);
          } else {
            $('#button-add-suspect').trigger('click');
            const newForm = $(`#newSuspectForm.${i - 1}`);
            const existForm = $(`#existingSuspectForm.${i - 1}`);

            newForm.find('#suspFirstNameInput').val(response[j]['suspName']['first']);
            newForm.find('#suspMiddleNameInput').val(response[j]['suspName']['middle']);
            newForm.find('#suspLastNameInput').val(response[j]['suspName']['last']);
            newForm.find('#suspSexInput').val(response[j]['suspSex']);
            newForm.find('#suspSupervisedReleaseStatusInput').val(response[j]['supervisedReleaseStatus']);
            newForm.find('#suspDescInput').val(response[j]['suspDesc']);
            newForm.find('#suspAgeInput').val(response[j]['suspAge']);
            newForm.find('#juvenileTriedAsAdultInput').prop('selectedIndex', response[j]['juvenileTriedAsAdult'] ? 1 : 2);

            existForm.find('#suspIdInput').val(response[j]['_id']);
          }
        }
      }
    }

    $('[id="newOrExistingSuspectInput"]').each(function set() {
      $(this).val('old');
    });

    $('[id="existingSuspectForm"]').each(function set() {
      $(this).show();
    });
  });
}

function importExcel() {
  const formData = new FormData();
  const file = ($('#upload-form'))[0].files[0];
  const filename = ($('#upload-form'))[0].files[0].name;
  const token = window.sessionStorage.getItem('userInfo-token');
  let caseData;
  formData.append('file', file, filename);

  $.ajax({
    url: 'http://localhost:3000/import',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    crossDomain: true,
    headers: {
      'x-access-token': token
    }
  }).done((data) => {
    caseData = data;
    allCases = JSON.parse(caseData);
    checkCases();
  }).fail(() => {
    console.log('FAILURE');
  });
}

$('#upload-form').on('change', importExcel);
