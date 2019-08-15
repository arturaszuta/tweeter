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
  $("form").submit(function(event) {
    event.preventDefault();
    let $form = $(this),
      term = $('#tweetText').val(),
      url = $form.attr("action");
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
      });
    } else {
      event.preventDefault();
    }
  });

  //DOM MANIPULATION BELOW

  //TOGGLE NEW TWEET FIELD
  $('.toggle1').on('click', function() {
    $('.new-tweet').addClass('toggleVis');
    $('.new-tweet').slideToggle();
    $('#tweetText').focus();
  });

  //SHOW/HIDE FAST SCROLLER & CREATE NEW TWEET ELEMENT
  $(document).on('scroll', () => {
    if ($(this).scrollTop() >= 350) {
      $('#scroller').css('opacity', '.8');
      $('.nav-right').css('opacity', '0');
      if ($(window).width() < 1024) {
        $('nav').css('background-color', '#4056A1');
      }
    } else if ($(this).scrollTop() < 325) {
      $('#scroller').css('opacity', '0');
      $('.nav-right').css('opacity', '1');
      if ($(window).width() < 1024) {
        $('nav').css('background-color', 'transparent');
      }
    }
  });

  //FAST SCROLLER ELEMENT
  $("#scroller").on('click',function() {
    $('html, body').animate({
      'scrollTop' : $("#mainNav").position().top,
    });
    $('.new-tweet').slideDown();
    $('#tweetText').focus();
  });

  // ERROR HIDE ON REFOCUS
  $('textarea').on('focus', () => {
    $('.error').slideUp('fast');
  });


});

