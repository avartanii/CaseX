/* eslint-disable */
var importExcel = function () {

  var formData = new FormData();
  console.log(($('#upload')));
  var file = ($('#upload'))[0].files[0];
  var filename = ($('#upload'))[0].files[0].name;
  console.log(filename);
  formData.append('file', ($('#upload'))[0].files[0], filename);
  var object = {
    files: file
  };

  $.post('http://localhost:3000/import', object)
    .done(function (response) {
      console.log('SUCCESS: ', typeof response);
      console.log('DATA: ', response);
    });

  // $.post('http://localhost:3000/import', )
  //   .done(function (response) {
  //     var formData = new FormData();
  //     console.log(($('#upload')));
  //     var filename = ($('#upload'))[0].files[0].name;
  //     console.log(filename);
  //     formData.append('file', ($('#upload'))[0].files[0], filename);
  //     $.ajax({
  //       url: 'http://localhost:3000/import',
  //       data: formData,
  //       processData: false,
  //       contentType: false,
  //       crossDomain: true, // Added
  //       type: 'POST',
  //       success: function (data) {
  //         console.log('SUCCESS: ', typeof data);
  //         console.log('DATA: ', data);
  //       }
  //     });
  //   });
};

$(document).ready(function () {
  $('#import-button').click(importExcel);
});
