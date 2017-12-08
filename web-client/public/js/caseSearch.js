function findCase() {
  document.cookie = `DR=${$('#case-search').val()}`;
  window.location = '/case';
}

$(document).ready(() => {
  $('#search-button').click(findCase);
});
