// Variables to manage the audio
const correctAudio = document.getElementById("correct-audio");
const incorrectAudio = document.getElementById("incorrect-audio");

// Elements for each screen
const welcomeScreen = document.getElementById("welcome-screen");
const question1Screen = document.getElementById("question1");
const question2Screen = document.getElementById("question2");
const valentineScreen = document.getElementById("valentine");
const dateSelectionScreen = document.getElementById("date-selection");
const thankYouScreen = document.getElementById("thank-you");
const questionWrong1Screen = document.getElementById("question-wrong1");
const questionWrong2Screen = document.getElementById("question-wrong2");
const questionWrong3Screen = document.getElementById("question-wrong3");
const incorrectFinalScreen = document.getElementById("incorrect-final");

// Start quiz function (called when "Proceed" button is clicked on the welcome screen)
function startQuiz() {
  // Hide the welcome screen and show the first question
  showScreen('question1');
  correctAudio.play();
  correctAudio.loop = true;
}

// Function to handle screen visibility (show/hide elements)
function showScreen(screenId) {
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => {
    screen.classList.add('hidden');
  });
  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.remove('hidden');
  }
}

// Function to check the answer for Question 1 (Correct Path)
function checkAnswer(question, answer) {
  if (answer === 'correct') {
    showScreen('question2');
  } else {
    showIncorrectPath();
  }
}

// Function to check the answer for the flower question
function checkFlowerAnswer() {
  const answer = document.getElementById("flower-answer").value.trim().toLowerCase();
  if (answer === 'rose') { // Change 'rose' to the correct answer if needed
    showScreen('valentine');
  } else {
    showIncorrectPath();
  }
}

// Valentine screen navigation
function goToDateSelection() {
  showScreen('date-selection');
}

// Function to handle incorrect answers
function showIncorrectPath() {
  correctAudio.pause();
  incorrectAudio.play();
  showScreen('question-wrong1');
}

// Check answers for incorrect questions
function checkWrongAnswer(question, isCorrect) {
  if (isCorrect) {
    switch (question) {
      case 1:
        showScreen('question1');
        break;
      case 2:
        showScreen('question2');
        break;
      case 3:
        showScreen('valentine');
        break;
    }
    incorrectAudio.pause();
    correctAudio.play();
    correctAudio.loop = true;
  } else {
    incorrectAudio.pause();
    incorrectAudio.play();
    showScreen('incorrect-final');
  }
}

// Send email function (called when the user confirms date selection)
function sendEmail() {
  const dateTime = document.getElementById("date-time").value;
  // Implement email sending logic here
  alert("Date and time confirmed: " + dateTime);
}

// Restart quiz (called when the user clicks "Restart" on the incorrect final page)
function restartQuiz() {
  showScreen('welcome-screen');
  incorrectAudio.pause();
  correctAudio.play();
  correctAudio.loop = true;
}
