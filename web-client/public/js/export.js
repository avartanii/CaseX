
var exportCSV = function () {
  $.get('http://localhost:3000/export')
    .then(function (response) {
      var data = response.data;
      var filename = response.filename;

      var link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    });
};

$(document).ready(function () {
  $('#export-button').click(exportCSV);
});
