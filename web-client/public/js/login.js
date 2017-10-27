
function loginUser(username, password) {
    axios.get('http://localhost:3000/users')
      .then(function(response) {
        console.log(username, password, response)
      })
      .catch(function(error) {
        console.log(error);
      });
}

$("#upload").on("change", () => {
  var formData = new FormData();
  formData.append("file", ($("#upload"))[0].files[0]);
  var filename = ($("#upload"))[0].files[0].name;
  $.ajax({
    url: 'http://localhost:3000/upload',
    data: formData,
    processData: false,
    contentType: false,
    crossDomain: true, // Added
    type: 'POST',
    success: function(data){
      alert(data);
    }
  });
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
