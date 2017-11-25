const checkRedirect = () => {
  const redirect = !window.sessionStorage.getItem('userInfo-token');
  if (redirect) {
    window.location.href = '/login';
  }
};

$(document).ready(() => {
  checkRedirect();
});
