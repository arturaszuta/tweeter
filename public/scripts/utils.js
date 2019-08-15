//UTILITY FUNCTIONS

//"SANITIZER" - MAKES SURE SCRIPTS CANNOT BE SUBMITTED AS A FORM
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//DATE CALCULATOR - CALCULATES HOW OLD IS THE TWEET
const convertDate = function(timestamp) {
  const now = Date.now();
  let howManyDays = now - timestamp;
  if ((howManyDays / 1000 / 60 / 60 / 24) > 1) {
    return Math.round(howManyDays / 1000 / 60 / 60 / 24) + ' days';
  } else if ((howManyDays / 1000 / 60 / 60) > 1) {
    return Math.round(howManyDays / 1000 / 60 / 60) + ' hours';
  } else if ((howManyDays / 1000 / 60) > 1) {
    return Math.round(howManyDays / 1000 / 60) + ' minutes';
  } else {
    return Math.round(howManyDays / 1000) + ' seconds';
  }
};

//CREATE TWEET FUNNCTION - CREATES AN HTML FOR TWEET WITH GIVEN DATA
const createTweetElement = function(tweetInfo) {    
  const markupTweet = `
  <article class="the-tweet">
        <header>
          <div> 
            <img src="${tweetInfo.user.avatars}">
            <span>${tweetInfo.user.name}</span>
          </div>
          <span class="hoverText">${tweetInfo.user.handle}</span>
        </header>
        <p>
          ${escape(tweetInfo.content.text)}
        </p>
        <footer>
          <span>Posted ${convertDate(tweetInfo.created_at)} ago</span>
          <span><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
        </footer>
      </article>
  `;
  return markupTweet;

};

// FUNCITON WHICH RENDERS TWEET(S)
const renderTweets = function(tweetArray) {
  tweetArray.forEach(element => {
    const newTweet = createTweetElement(element);
    $('.whereTweetsLive').prepend(newTweet);
  });
};

//VALIDATOR - MAKES SURE TWEET HAS CONTEXT AND IS NOT MORE THAN 140 CHARACTERS + DISPLAYS ERROR MESSAGES
const validate = function(input) {
  if (input.length > 140) {
    $('.error span').text('Your tweet is too long!!!!!');
    $('.error').slideDown('slow');
    $('.error').addClass('toggleFlex');
  } else if (!input) {
    $('.error span').text('Tweet must have content!!!!!');
    $('.error').slideDown('slow');
    $('.error').addClass('toggleFlex');
  } else {
    $('.error').slideUp('slow');
    return true;
  }
}