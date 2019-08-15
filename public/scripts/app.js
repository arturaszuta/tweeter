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

});

