document.addEventListener("DOMContentLoaded", function () {
  // Directly show welcome-screen on load—no setTimeout for debugging.
  showScreen("welcome-screen");
  // Temporarily comment out the background music call to rule out errors.
  // playBackgroundMusic();
});

/* ===============================
   GLOBAL STATE
=============================== */

let pathACurrent = "question1";
const pathAOrder = ["question1", "question2", "question3"];

// Path B questions in order
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];
// Track usage of each Path B question
let pathBUsed = [false, false, false];

// Store final picks
let userSelections = {
  dateTime: "",
  cuisine: "",
  activity: ""
};

/* ===============================
   PATH A FUNCTIONS
=============================== */
function checkAnswer(currentQuestionId, isCorrect) {
  if (isCorrect) {
    advancePathA(currentQuestionId);
  } else {
    goToNextPathB();
  }
}

function checkFreeResponse(inputId) {
  const userInput = document.getElementById(inputId).value.trim().toLowerCase();
  if (userInput.includes("tulips")) {
    advancePathA("question2");
  } else {
    goToNextPathB();
  }
}

function advancePathA(currentQuestionId) {
  const currentIndex = pathAOrder.indexOf(currentQuestionId);
  if (currentIndex === -1) {
    console.error("Invalid Path A question ID:", currentQuestionId);
    return;
  }
  if (currentIndex < pathAOrder.length - 1) {
    // Move to next question in Path A
    pathACurrent = pathAOrder[currentIndex + 1];
    showScreen(pathACurrent);
  } else {
    // If we just passed question3, go to valentine
    pathACurrent = "valentine";
    showScreen("valentine");
  }
}

/* ===============================
   PATH B FUNCTIONS
=============================== */
function goToNextPathB() {
  const nextIndex = pathBUsed.findIndex(used => used === false);
  if (nextIndex === -1) {
    // All used => show final sorry page
    showScreen("incorrect-final");
  } else {
    // Show next unused Path B question
    showScreen(pathBQuestions[nextIndex]);
  }
}

function checkWrongAnswer(pathBQuestionId, isCorrect) {
  const bIndex = pathBQuestions.indexOf(pathBQuestionId);
  if (bIndex === -1) {
    console.error("Unknown Path B question:", pathBQuestionId);
    return;
  }
  if (isCorrect) {
    // Return to current Path A question
    showScreen(pathACurrent);
  } else {
    // Mark this question as used
    pathBUsed[bIndex] = true;
    goToNextPathB();
  }
}

/* ===============================
   QUIZ FLOW
=============================== */
function startQuiz() {
  showScreen("question1");
}

function goToDateSelection() {
  showScreen("date-selection");
}

function proceedToPreferences() {
  userSelections.dateTime = document.getElementById("date-time").value;
  showScreen("cuisine");
}

function selectCuisine(choice) {
  userSelections.cuisine = choice;
  showScreen("activity");
}

function selectActivity(choice) {
  userSelections.activity = choice;
  showScreen("final-date");
}

function sendEmail() {
  userSelections.dateTime = document.getElementById("final-date-time").value;
  const emailContent = `Date and Time: ${userSelections.dateTime}\nCuisine: ${userSelections.cuisine}\nActivity: ${userSelections.activity}`;
  console.log("Sending Email with content:\n", emailContent);
  showScreen("thank-you");
}

function proceedToFinalDate() {
  showScreen("final-date");
}

function restartQuiz() {
  // Reset everything
  pathACurrent = "question1";
  pathBUsed = [false, false, false];
  userSelections = { dateTime: "", cuisine: "", activity: "" };
  showScreen("welcome-screen");
}

/* ===============================
   SCREEN & (COMMENTED) MUSIC
=============================== */
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.add("hidden");
  });
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.remove("hidden");
  } else {
    console.error("Screen not found:", screenId);
  }
}

function playBackgroundMusic() {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.src = "https://www.youtube.com/embed/YOUR_PLAYLIST_ID?autoplay=1&loop=1&playlist=YOUR_PLAYLIST_ID&mute=0";
  } else {
    console.error("Background music element not found");
  }
}
