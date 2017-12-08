const getCookie = function getCookie(cname) {
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
};

$(document).ready(() => {
  const token = window.sessionStorage.getItem('userInfo-token');
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    headers: {
      'x-access-token': token
    }
  }).done((response) => {
    const email = getCookie('email');
    let name;
    for (let i = 0; i < response.length; i += 1) {
      if (response[i]['email'] === email) {
        name = `${response[i]['name']['first']} ${response[i]['name']['middle'].charAt(0)}. ${response[i]['name']['last']}`;
      }
    }
    $('#username-text').text(name);
  });
});
