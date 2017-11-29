// Sets up ajax success handler to store JWT in sessionStorage

$(document).ajaxSuccess(( event, request, settings ) => {
  if (settings.url === 'http://localhost:3000/authenticate' && request.responseJSON.success) {
    const token = request.responseJSON.token;
    window.sessionStorage.setItem('userInfo-token', token);
  }
});

$(document).ajaxError((event, request, settings) => {
  if (request.responseJSON && request.responseJSON.hasOwnProperty('success')
    && request.responseJSON.hasOwnProperty('validationError')
    && !request.responseJSON.validationError && !request.responseJSON.success) {
    alert('Session expired. Redirecting to login.');
    window.location.href = '/login';
  }
});
