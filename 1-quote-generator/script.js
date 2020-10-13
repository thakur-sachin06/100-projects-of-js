const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const spinner = document.getElementById('spinner');

function showLoadingSpinner() {
  spinner.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!spinner.hidden) {
    spinner.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  // for cors problem we have create proxy url on heroku
  const proxyUrl = 'https://sheltered-escarpment-37549.herokuapp.com/';

  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    authorText.innerText = data.quoteAuthor ? data.quoteAuthor : 'Unknown';

    // for larger quotes we are adding a css class which we have defined in styles.css with font-size=2rem.
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    }
    // removing above added class if length<120.
    else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    hideLoadingSpinner();
  }
  catch (error) {
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listener

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Loading first time
getQuote();