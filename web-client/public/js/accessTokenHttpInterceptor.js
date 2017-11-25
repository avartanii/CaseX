/* eslint-disable */
//Create a http interceptor factory

$( document ).ajaxSuccess(function( event, request, settings ) {

  if (request.resonseJSON.hasOwnProperty('success') && !request.responseJSON.success) {
    alert("Session expired. Redirecting to login.");
    window.location.href = '/login';
  }

  if (settings.url === 'http://localhost:3000/authenticate' && request.responseJSON.success) {
    var token = request.responseJSON.token;
    window.sessionStorage.setItem('userInfo-token', token);
  }
});
