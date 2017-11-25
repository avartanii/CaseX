// Thanks to user Kapil at https://stackoverflow.com/questions/35427641/how-to-dynamically-set-the-active-class-in-bootstrap-navbar/35428555

$(document).ready(function () {
  var url = window.location;
  $('nav a[href="'+ url +'"]').parent().addClass('active');
  $('nav a').filter(function() {
   return this.href == url;
  }).parent().addClass('active');
});
