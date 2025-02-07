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
  welcomeScreen.classList.add("hidden");
  question1Screen.classList.remove("hidden");

  // Start the background correct audio
  correctAudio.play();
  correctAudio.loop = true;
}

// Function to check the answer for Question 1 (Correct Path)
function checkAnswer(question, answer) {
  if (answer === 'correct') {
    question1Screen.classList.add("hidden");
    question2Screen.classList.remove("hidden");
  } else {
    showIncorrectPath();
  }
}

// Function to check the answer for the flower question
function checkFlowerAnswer() {
  const answer = document.getElementById("flower-answer").value.trim().toLowerCase();
  if (answer === 'rose') { // Change 'rose' to the correct answer if needed
    question2Screen.classList.add("hidden");
    valentineScreen.classList.remove("hidden");
  } else {
    showIncorrectPath();
  }
}

// Valentine screen navigation
function goToDateSelection() {
  valentineScreen.classList.add("hidden");
  dateSelectionScreen.classList.remove("hidden");
}

// Function to handle incorrect answers
function showIncorrectPath() {
  // Hide current screens and show the incorrect question path
  correctAudio.pause();
  incorrectAudio.play();
  question1Screen.classList.add("hidden");
  question2Screen.classList.add("hidden");
  valentineScreen.classList.add("hidden");
  dateSelectionScreen.classList.add("hidden");
  questionWrong1Screen.classList.remove("hidden");
}

// Check answers for incorrect questions
function checkWrongAnswer(question, isCorrect) {
  if (isCorrect) {
    switch (question) {
      case 1:
        questionWrong1Screen.classList.add("hidden");
        question1Screen.classList.remove("hidden");
        break;
      case 2:
        questionWrong2Screen.classList.add("hidden");
        question2Screen.classList.remove("hidden");
        break;
      case 3:
        questionWrong3Screen.classList.add("hidden");
        valentineScreen.classList.remove("hidden");
        break;
    }
    incorrectAudio.pause();
    correctAudio.play();
    correctAudio.loop = true;
  } else {
    incorrectAudio.pause();
    incorrectAudio.play();
    questionWrong1Screen.classList.add("hidden");
    questionWrong2Screen.classList.add("hidden");
    questionWrong3Screen.classList.add("hidden");
    incorrectFinalScreen.classList.remove("hidden");
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
  incorrectFinalScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  incorrectAudio.pause();
  correctAudio.play();
  correctAudio.loop = true;
}

// Handling screen visibility (hide and show functionality for each screen)
function hideAllScreens() {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.add("hidden"));
}

// Function to hide audio when switching between paths
function switchToCorrectPath() {
  incorrectAudio.pause();
  correctAudio.play();
}
