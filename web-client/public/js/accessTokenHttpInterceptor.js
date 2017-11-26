/* eslint-disable */

// Sets up ajax success handler to store JWT in sessionStorage

$( document ).ajaxSuccess(function( event, request, settings ) {
  if (request.resonseJSON && request.responseJSON.hasOwnProperty('success') && !request.responseJSON.hasOwnProperty('validationError') && !request.responseJSON.success) {
    alert("Session expired. Redirecting to login.");
    window.location.href = '/login';
  }

  if (settings.url === 'http://localhost:3000/authenticate' && request.responseJSON.success) {
    var token = request.responseJSON.token;
    window.sessionStorage.setItem('userInfo-token', token);
  }
});
