let currentPath = 'A'; // Start path A
let currentQuestion = 1; // Start with question 1

function startQuiz() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('question1').classList.remove('hidden');
}

function checkAnswer(questionId, isCorrect) {
  if (isCorrect) {
    if (currentQuestion === 1) {
      // Proceed to the next question
      document.getElementById('question1').classList.add('hidden');
      document.getElementById('question-wrong1').classList.add('hidden');
      document.getElementById('question-wrong2').classList.add('hidden');
      document.getElementById('question-wrong3').classList.add('hidden');
      document.getElementById('question-wrong1').classList.remove('hidden');
      currentQuestion++;
    }
    else if (currentQuestion === 2) {
      document.getElementById('question-wrong1').classList.add('hidden');
      document.getElementById('question-wrong2').classList.remove('hidden');
      currentQuestion++;
    }
    else if (currentQuestion === 3) {
      document.getElementById('question-wrong2').classList.add('hidden');
      document.getElementById('question-wrong3').classList.remove('hidden');
      currentQuestion++;
    }
    else {
      // Valentine Question
      document.getElementById('question-wrong3').classList.add('hidden');
      document.getElementById('valentine').classList.remove('hidden');
    }
  } else {
    wrongAnswerPath();
  }
}

function checkWrongAnswer(questionId, isCorrect) {
  if (isCorrect) {
    // Go back to correct path after incorrect answers
    if (currentQuestion === 1) {
      document.getElementById('question-wrong1').classList.add('hidden');
      document.getElementById('question-wrong2').classList.remove('hidden');
    }
    else if (currentQuestion === 2) {
      document.getElementById('question-wrong2').classList.add('hidden');
      document.getElementById('question-wrong3').classList.remove('hidden');
    }
    else {
      document.getElementById('question-wrong3').classList.add('hidden');
      document.getElementById('valentine').classList.remove('hidden');
    }
  } else {
    // If the answer is incorrect again, proceed to final incorrect page
    if (currentQuestion === 3) {
      document.getElementById('question-wrong3').classList.add('hidden');
      document.getElementById('incorrect-final').classList.remove('hidden');
    }
  }
}

function goToDateSelection() {
  document.getElementById('valentine').classList.add('hidden');
  document.getElementById('date-selection').classList.remove('hidden');
}

function wrongAnswerPath() {
  // Go to wrong answer screen
  document.getElementById('valentine').classList.add('hidden');
  document.getElementById('incorrect-final').classList.remove('hidden');
}

function sendEmail() {
  const dateTime = document.getElementById('date-time').value;
  alert('Date and time selected: ' + dateTime);
  // You can add email sending functionality here
  document.getElementById('date-selection').classList.add('hidden');
  document.getElementById('thank-you').classList.remove('hidden');
}

function restartQuiz() {
  // Reset and start over
  document.getElementById('thank-you').classList.add('hidden');
  document.getElementById('incorrect-final').classList.add('hidden');
  document.getElementById('welcome-screen').classList.remove('hidden');
  currentQuestion = 1;
  currentPath = 'A';
}
