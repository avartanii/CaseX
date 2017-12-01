function findCase(data) {
  const drNum = $('#case-search').val();
  for (let i = 0; i < data.length; i += 1) {
    if (data[i]['drNumber'] === +drNum) {
      document.cookie = `id=${data[i]['_id']}`;
      window.location = '/case';
    }
  }
}

$(document).ready(() => {
  const token = window.sessionStorage.getItem('userInfo-token');
  $.ajax({
    url: 'http://localhost:3000/cases',
    type: 'GET',
    headers: {
      'x-access-token': token
    }
  }).done((response) => {
    $('#search-button').click(() => {
      findCase(response);
    });
  });
});
