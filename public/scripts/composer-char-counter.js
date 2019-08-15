//FUNCTION WHICH MANIPULATES CHAR COUNTER IN THE CREATE NEW TWEET ELEMENT
$(document).ready(function() {

  $('textarea').on("keyup", function() {
    let count = $('textarea').val().length;
    if (count > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }
    $('.counter').text(140 - count);
  });
  
});