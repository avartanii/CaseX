var setCookies = function () {
  document.cookie = 'loggedIn=false';
};

var logout = function () {
  setCookies();
  window.location.href = '/login';

};

$(document).ready(function () {
  $('#logout').click(logout);
});
