function createVictim() {
  const token = window.sessionStorage.getItem('userInfo-token');
  return $.ajax({
    url: 'http://localhost:3000/victims',
    type: 'POST',
    data: {
      victName: {
        first: 'Eileen',
        middle: 'Middle',
        last: 'Last'
      },
      victSex: 'Female',
      victDesc: 'descriptions',
      victAge: 12
    },
    headers: {
      'x-access-token': token
    }
  });
}

function createSuspect(suspect) {
  if (suspect) {
    return suspect;
  }

  const token = window.sessionStorage.getItem('userInfo-token');
  return $.ajax({
    url: 'http://localhost:3000/suspects',
    type: 'POST',
    data: {
      suspName: {
        first: 'Suspect',
        middle: 'Middle Name',
        last: 'Last Name'
      },
      suspSex: 'Male',
      supervisedReleaseStatus: 'probation',
      suspDesc: 'descriptions',
      suspAge: 123,
      juvenileTriedAsAdult: false
    },
    headers: {
      'x-access-token': token
    }
  });
}

Promise.all([createVictim(), createSuspect('hi')]).then((values) => {
  console.log('Values: ', values);
}).catch((err) => {
  console.log('Error: ', err);
});

// function getSpreadsheet() {
//   axios.get('http://localhost:3000/export').then((response) => {
//     console.log(response);
//   })
//     .catch((error) => {
//       console.log(error);
//     })
// }

// https://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery

$('#upload').on('change', () => {
  // var formData = new FormData();
  // formData.append('file', ($('#upload'))[0].files[0]);
  // var filename = ($('#upload'))[0].files[0].name;
  // $.ajax({
  //   url: 'http://localhost:3000/upload',
  //   data: formData,
  //   processData: false,
  //   contentType: false,
  //   crossDomain: true, // Added
  //   type: 'POST',
  //   success: function(data){
  //     alert(data);
  //   }
  // });
  // request.post({
  //   url: 'http:localhost:3000/upload',
  //   formData: formData
  // }, function (err, httpResponse, body){
  //   if (err) {
  //     return console.error('upload failed:', err);
  //   }
  //   console.log('Upload successful!  Server responded with: ', body);
  // });
});
