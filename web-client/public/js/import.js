let allCases;
const token = window.sessionStorage.getItem('userInfo-token');

function getVictim() {
  return $.ajax({
    url: 'http://localhost:3000/victims',
    type: 'GET',
    headers: {
      'x-access-token': token
    }
  }).done((response) => {
    return response;
  });
}

function getSuspects() {
  return $.ajax({
    url: 'http://localhost:3000/suspects',
    type: 'GET',
    headers: {
      'x-access-token': token
    }
  }).done((response) => {
    return response;
  });
}

const fillData = function fill(caseInfo) {
  return Promise.all([getVictim(), getSuspects()])
    .then((values) => {
      const victimData = values[0];
      const suspectData = values[1];
      const weaponArray = ['handgun', 'rifle', 'blunt force', 'bodily force', 'knife', 'unknown'];
      const motiveArray = ['robbery', 'burglary', 'gang', 'narcotics', 'domestic violence', 'dispute', 'accidental', 'selfDefense', 'unknown'];

      function parseDate(date) {
        const d = new Date(date);
        return d.toISOString().substring(0, 10);
      }

      function indexOfData(index, dataInIndex) {
        let indexData = caseInfo[index];
        if (typeof caseInfo[index] === 'string') {
          indexData = indexData.toLowerCase();
        }
        return indexData.indexOf(dataInIndex);
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


      let address = caseInfo['address'];
      let streetNum;
      let streetName;
      let city;
      let zip;

      if (typeof address === 'string') {
        address = JSON.stringify(caseInfo['address']).slice(1, -1).split('\\r\\n');
        streetNum = address[0].split(' ')[0];
        streetName = address[0].split(' ')[1];
        city = address[1];
        zip = address[2];
      } else {
        streetNum = address.streetNumber;
        streetName = address.streetName;
        city = address.city;
        zip = address.zipCode;
      }

      caseUI.fields['streetNumber']['input'].val(streetNum);
      caseUI.fields['streetName']['input'].val(streetName);
      caseUI.fields['city']['input'].val(city);
      caseUI.fields['zipCode']['input'].val(zip);


      const victim = caseInfo['victim'];
      let victimId;
      if (typeof victim === 'string') {
        victimId = caseInfo['victim'];
      } else {
        victimId = caseInfo['victim']['_id'];
      }

      for (let i = 0; i < victimData.length; i += 1) {
        if (victimId === victimData[i]['_id']) {
          caseUI.fields['victFirstName']['input'].val(victimData[i]['victName']['first']);
          caseUI.fields['victMiddleName']['input'].val(victimData[i]['victName']['middle']);
          caseUI.fields['victLastName']['input'].val(victimData[i]['victName']['last']);
          caseUI.fields['victSex']['input'].val(victimData[i]['victSex']);
          caseUI.fields['victDesc']['input'].val(victimData[i]['victDesc']);
          caseUI.fields['victAge']['input'].val(victimData[i]['victAge']);
          caseUI.fields['victId']['input'].val(victimData[i]['_id']);
        }
      }

      caseUI.newOrExistingVictimInput.val('old');
      caseUI.existingVictimForm.show();


      const suspects = caseInfo['suspects'];
      let suspectIds = [];
      if (Array.isArray(suspects)) {
        suspects.forEach((suspect) => {
          suspectIds.push(suspect['_id']);
        });
      } else {
        suspectIds = caseInfo['suspects'].split('\r\n');
      }

      for (let i = 0; i < suspectIds.length; i += 1) {
        for (let j = 0; j < suspectData.length; j += 1) {
          if (suspectIds[i] === suspectData[j]['_id']) {
            if (i === 0) {
              caseUI.fields['suspFirstName']['input'].val(suspectData[j]['suspName']['first']);
              caseUI.fields['suspMiddleName']['input'].val(suspectData[j]['suspName']['middle']);
              caseUI.fields['suspLastName']['input'].val(suspectData[j]['suspName']['last']);
              caseUI.fields['suspSex']['input'].val(suspectData[j]['suspSex']);
              caseUI.fields['suspSupervisedReleaseStatus']['input'].val(suspectData[j]['supervisedReleaseStatus']);
              caseUI.fields['suspDesc']['input'].val(suspectData[j]['suspDesc']);
              caseUI.fields['suspAge']['input'].val(suspectData[j]['suspAge']);
              caseUI.fields['juvenileTriedAsAdult']['input'].prop('selectedIndex', suspectData[j]['juvenileTriedAsAdult'] ? 1 : 2);
              caseUI.fields['suspId']['input'].val(suspectData[j]['_id']);
            } else {
              $('#button-add-suspect').trigger('click');
              const newForm = $(`#newSuspectForm.${i - 1}`);
              const existForm = $(`#existingSuspectForm.${i - 1}`);

              newForm.find('#suspFirstNameInput').val(suspectData[j]['suspName']['first']);
              newForm.find('#suspMiddleNameInput').val(suspectData[j]['suspName']['middle']);
              newForm.find('#suspLastNameInput').val(suspectData[j]['suspName']['last']);
              newForm.find('#suspSexInput').val(suspectData[j]['suspSex']);
              newForm.find('#suspSupervisedReleaseStatusInput').val(suspectData[j]['supervisedReleaseStatus']);
              newForm.find('#suspDescInput').val(suspectData[j]['suspDesc']);
              newForm.find('#suspAgeInput').val(suspectData[j]['suspAge']);
              newForm.find('#juvenileTriedAsAdultInput').prop('selectedIndex', suspectData[j]['juvenileTriedAsAdult'] ? 1 : 2);

              existForm.find('#suspIdInput').val(suspectData[j]['_id']);
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

      return true;
    });
};

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
    crossDomain: true,
    headers: {
      'x-access-token': token
    }
  }).done((data) => {
    caseData = data;
    allCases = JSON.parse(caseData);
    totalNumber = allCases.length;
    checkCases();
  }).fail(() => {
    console.log('FAILURE');
  });
}

$('#upload-form').on('change', importExcel);
