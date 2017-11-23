
function importExcel() {
  const formData = new FormData();
  console.log(($('#upload-form')));
  const file = ($('#upload-form'))[0].files[0];
  const filename = ($('#upload-form'))[0].files[0].name;
  let caseData;
  console.log(filename);
  formData.append('file', ($('#upload-form'))[0].files[0], filename);

  $.ajax({
    url: 'http://localhost:3000/import',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    crossDomain: true
  }).done((data) => {
    // console.log('SUCCESS', data);
    caseData = data;
    fillData(caseData);
  }).fail(() => {
    console.log('FAILURE');
  });
}

function fillData(data) {
  const caseInfo = JSON.parse(data)[0];
  const weaponArray = ['handgun', 'rifle', 'blunt force', 'bodily force', 'knife', 'unknown'];
  const motiveArray = ['robbery', 'burglary', 'gang', 'narcotics', 'domestic violence', 'dispute', 'accidental', 'selfDefense', 'unknown'];

  function parseDate(date) {
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  function indexOfData(index, dataInIndex) {
    return caseInfo[index].toLowerCase().indexOf(dataInIndex);
  }

  // const caseInfo = data['Sheet1'][0];
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
}

$(document).ready(() => {
  $('#import-button').click(importExcel);
});

$('#upload-form').on('change', importExcel);
