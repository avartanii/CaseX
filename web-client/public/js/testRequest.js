
function submitTestRequest() {
    axios.get('http://localhost:3000/cases')
      .then(function(userResponse) {
        axios.get('http://localhost:3000/users')
          .then(function(caseResponse) {
            console.log(userResponse, caseResponse, window);
          })
      })
      .catch(function(error) {
        console.log(error);
      });
}

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
