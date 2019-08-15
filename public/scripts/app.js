/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // INITIAL TWEET RENDER ONCE THE PAGE LOADS
  $.ajax('/tweets', { method: 'GET' })
    .done(function(value) {
      renderTweets(value);
    });

  // SUBMIT FORM EVENT - WHICH POSTS NEW TWEETS
  $( "form" ).submit(function(event) {
    event.preventDefault();
    let $form = $(this),
      term = $('#tweetText').val(),
      url = $form.attr( "action");
    if (validate(term)) {
      $.post(url, $form.serialize()).done(() => {
        $.ajax('/tweets', { method: 'GET' })
          .done(function(value) {
            $('.whereTweetsLive').empty();
            renderTweets(value);
          });
        $('textarea').val('');
        $('.counter').text(140);
        event.preventDefault();
      })
    } else {
      event.preventDefault();
    }
  });

  //TOGGLE NEW TWEET FIELD
  $('.toggle1').on('click', function() {
    $('.new-tweet').addClass('toggleVis');
    $('.new-tweet').slideToggle();
    $('#tweetText').focus();
  });


});

