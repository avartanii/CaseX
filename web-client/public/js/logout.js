// var setCookies = function () {
//   document.cookie = 'loggedIn=false';
// };

const logout = () => {
  window.sessionStorage.setItem('userInfo-token', null);
  window.location.href = '/login';
};

$(document).ready(() => {
  $('#logout').click(logout);
});
