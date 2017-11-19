
function importExcel() {
  const formData = new FormData();
  console.log(($('#upload')));
  const file = ($('#upload'))[0].files[0];
  const filename = ($('#upload'))[0].files[0].name;
  console.log(filename);
  formData.append('file', ($('#upload'))[0].files[0], filename);
  const object = {
    files: file
  };

  $.post('http://localhost:3000/import', object)
    .done((response) => {
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
}

$(document).ready(() => {
  $('#import-button').click(importExcel);
});
