var checkCookies = function () {
  var cookieString = decodeURIComponent(document.cookie);
  var cookies = cookieString.split(';');
  console.log(cookieString);
  console.log(cookies);
  for (var i = 0; i < cookies.length; i++) {
    var index = cookies[i].indexOf('loggedIn');
    console.log('Cookie: ', cookies[i]);
    console.log('Index: ', index);
    if (index > -1) {
      var equalIndex = cookies[i].indexOf('=') + 1;
      var value = cookies[i].substring(equalIndex);
      console.log('equalIndex: ', equalIndex);
      console.log('Value: ', value);
      return  value === 'false' ? true : false;
    }
  }
  return true;
};

var checkRedirect = function () {
  var redirect = checkCookies();
  if (redirect) {
    window.location.href = '/login';
  }
};

$(document).ready(function () {
  checkRedirect();
});
