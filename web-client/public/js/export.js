
function exportCSV() {
  const token = window.sessionStorage.getItem('userInfo-token');
  
  $.ajax({
    url: 'http://localhost:3000/export',
    type: 'GET',
    headers: {
      'x-access-token': token
    }
  }).done((response) => {
    const data = response.data;
    const filename = response.filename;

    console.log('DATA: ', data);

    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  });
}

$(document).ready(() => {
  $('#export-button').click(exportCSV);
});
