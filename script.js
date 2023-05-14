const analyzeButton = document.getElementById('analyze-button');
const textInput = document.getElementById('text-input');
const resultDiv = document.getElementById('result');

const apiKey = 'AIzaSyBqQu_jTj3wvP30MQfWwNLQucH4dInUTKM';


analyzeButton.addEventListener('click', () => {
  const text = textInput.value;

  // Make an API request to the Google Cloud Natural Language API and display the result
  fetch(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      document: {
        type: 'PLAIN_TEXT',
        content: text
      },
      encodingType: 'UTF8'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      const score = data.documentSentiment.score;
      const magnitude = data.documentSentiment.magnitude;

      let sentiment;
if (score < -0.8) {
  sentiment = 'Extremely Negative';
} else if (score < -0.5) {
  sentiment = 'Very Negative';
} else if (score < 0) {
  sentiment = 'Negative';
} else if (score === 0) {
  sentiment = 'Neutral';
} else if (score <= 0.5) {
  sentiment = 'Positive';
} else if (score <= 0.8) {
  sentiment = 'Very Positive';
} else {
  sentiment = 'Extremely Positive';
}

// Select the body element
const body = document.querySelector('body');

// Remove any previously added classes
body.classList.remove('extremely-negative', 'very-negative', 'negative', 'neutral', 'positive', 'very-positive', 'extremely-positive');

// Add a class to the body element based on the value of sentiment
if (sentiment === 'Extremely Negative') {
  body.classList.add('extremely-negative');
} else if (sentiment === 'Very Negative') {
  body.classList.add('very-negative');
} else if (sentiment === 'Negative') {
  body.classList.add('negative');
} else if (sentiment === 'Neutral') {
  body.classList.add('neutral');
} else if (sentiment === 'Positive') {
  body.classList.add('positive');
} else if (sentiment === 'Very Positive') {
  body.classList.add('very-positive');
} else if (sentiment === 'Extremely Positive') {
  body.classList.add('extremely-positive');
}
// Select the textarea element
const textarea = document.querySelector('textarea');

// Update the text color of the textarea element based on the value of sentiment
if (sentiment === 'Extremely Negative') {
  textarea.style.color = '#FFF';
} else if (sentiment === 'Very Negative') {
  textarea.style.color = '#FF8C00';
} else if (sentiment === 'Negative') {
  textarea.style.color = '#FFF';
} else if (sentiment === 'Neutral') {
  textarea.style.color = '#333833';
} else if (sentiment === 'Positive') {
  textarea.style.color = '#4CAF50';
} else if (sentiment === 'Very Positive') {
  textarea.style.color = '#4B0082';
} else if (sentiment === 'Extremely Positive') {
  textarea.style.color = '#2E0854';
}      

      let magnitudeExplanation;
      if (magnitude < 0.2) {
        magnitudeExplanation = 'very little';
      } else if (magnitude < 0.5) {
        magnitudeExplanation = 'little';
      } else if (magnitude < 1) {
        magnitudeExplanation = 'moderate';
      } else if (magnitude < 2) {
        magnitudeExplanation = 'high';
      } else if (magnitude < 3) {
        magnitudeExplanation = 'very high';
      } else {
        magnitudeExplanation = 'extremely high';
      }

      resultDiv.innerHTML = `Sentiment: <b>${sentiment}</b><br>Score: <b>${score.toFixed(2)}</b><br>Magnitude: <b>${magnitude.toFixed(2)}</b><br> intent: <b>${magnitudeExplanation}</b>`;

    })
    .catch(error => console.error(error));
});
