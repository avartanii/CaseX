
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

  // Get victim
  axios.get('http://localhost:3000/victims')
    .then((response) => {
      const responseData = response.data;
      const victimId = caseInfo['victim'];
      for (let i = 0; i < responseData.length; i += 1) {
        if (victimId === responseData[i]['_id']) {
          caseUI.fields['victFirstName']['input'].val(responseData[i]['victName']['first']);
          caseUI.fields['victMiddleName']['input'].val(responseData[i]['victName']['middle']);
          caseUI.fields['victLastName']['input'].val(responseData[i]['victName']['last']);
          caseUI.fields['victSex']['input'].val(responseData[i]['victSex']);
          caseUI.fields['victDesc']['input'].val(responseData[i]['victDesc']);
          caseUI.fields['victAge']['input'].val(responseData[i]['victAge']);
          caseUI.fields['victId']['input'].val(responseData[i]['_id']);
        }
      }
    });

  // Get suspect
  axios.get('http://localhost:3000/suspects')
    .then((response) => {
      const responseData = response.data;
      const suspectIds = caseInfo['suspects'].split('\r\n');
      suspectIds.forEach((suspectId) => {
        for (let i = 0; i < responseData.length; i += 1) {
          if (suspectId === responseData[i]['_id']) {
            caseUI.fields['suspFirstName']['input'].val(responseData[i]['suspName']['first']);
            caseUI.fields['suspMiddleName']['input'].val(responseData[i]['suspName']['middle']);
            caseUI.fields['suspLastName']['input'].val(responseData[i]['suspName']['last']);
            caseUI.fields['suspSex']['input'].val(responseData[i]['suspSex']);
            caseUI.fields['suspSupervisedReleaseStatus']['input'].val(responseData[i]['supervisedReleaseStatus']);
            caseUI.fields['suspDesc']['input'].val(responseData[i]['suspDesc']);
            caseUI.fields['suspAge']['input'].val(responseData[i]['suspAge']);
            caseUI.fields['juvenileTriedAsAdult']['input'].prop('selectedIndex', responseData[i]['juvenileTriedAsAdult'] ? 1 : 2);
            caseUI.fields['suspId']['input'].val(responseData[i]['_id']);
          }
        }
      });
    });
}

function importExcel() {
  const formData = new FormData();
  const file = ($('#upload-form'))[0].files[0];
  const filename = ($('#upload-form'))[0].files[0].name;
  let caseData;
  formData.append('file', file, filename);

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

$(document).ready(() => {
  $('#import-button').click(importExcel);
});

$('#upload-form').on('change', importExcel);
