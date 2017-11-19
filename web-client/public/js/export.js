
function exportCSV() {
  $.get('http://localhost:3000/export')
    .then((response) => {
      const { data } = response.data;
      const { filename } = response.filename;

      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    });
}

$(document).ready(() => {
  $('#export-button').click(exportCSV);
});
