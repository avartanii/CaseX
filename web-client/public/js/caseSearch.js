function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    c = c.trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function findCase(data) {
  const drNum = $('#case-search').val();
  for (let i = 0; i < data.length; i += 1) {
    if (data[i]['drNumber'] === +drNum) {
      document.cookie = `id=${data[i]['_id']}`;
      // window.location = '/case';
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
