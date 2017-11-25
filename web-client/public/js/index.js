/* eslint-disable */
var checkCookies = function () {
  return !window.sessionStorage.getItem('userInfo-token');
  // var cookieString = decodeURIComponent(document.cookie);
  // var cookies = cookieString.split(';');
  // for (var i = 0; i < cookies.length; i++) {
  //   var index = cookies[i].indexOf('loggedIn');
  //   if (index > -1) {
  //     var equalIndex = cookies[i].indexOf('=') + 1;
  //     var value = cookies[i].substring(equalIndex);
  //     return  value === 'false' ? true : false;
  //   }
  // }
  // return true;
};

var checkRedirect = function () {
  var redirect = checkCookies();
  if (redirect) {
    window.location.href = '/login';
  }
};


checkRedirect();
