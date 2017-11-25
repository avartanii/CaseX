var createVictim = function() {
  return $.ajax({
    url: 'http://localhost:3000/victim',
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
    }
  });
}

var createSuspect = function(suspect) {
  if (suspect) {
    return suspect;
  } else {
    return $.ajax({
      url: 'http://localhost:3000/suspect',
      type: 'POST',
      data: {
        suspName: {
          first: 'Suspect',
          middle: 'Middle Name',
          last: 'Last Name'
        },
        suspSex: 'Male',
        supervisedReleaseStatus: 'probation' ,
        suspDesc: 'descriptions',
        suspAge: 123,
        juvenileTriedAsAdult: false
      }
    });
  }
}

Promise.all([createVictim(), createSuspect('hi')]).then((values) => {
  console.log(values);
}).catch((err) => {
  console.log(err);
});

function getSpreadsheet(){
  axios.get('http://localhost:3000/export').then(function(response) {
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  })
}

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
