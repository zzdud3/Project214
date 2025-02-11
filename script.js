document.addEventListener("DOMContentLoaded", function () {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    showScreen("welcome-screen");
    playBackgroundMusic();
  }, 100);
});

// Keep track of user’s Path A progress & final form data
let pathACurrent = "question1"; // Which Path A question is next?
const pathAOrder = ["question1", "question2", "question3", "valentine"]; 

let userSelections = {
  dateTime: "",
  cuisine: "",
  activity: ""
};

// Track how many Path B questions have been answered incorrectly
let pathBIndex = 0;
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];
const maxPathB = pathBQuestions.length;

/* ---------------- PATH A LOGIC ---------------- */
/** 
 * Moves to the next question in pathAOrder when correct, 
 * or branches to Path B (question-wrong1) when incorrect.
 */
function checkAnswer(currentQuestion, isCorrect) {
  if (isCorrect) {
    // If correct, move forward in the Path A array
    advancePathA(currentQuestion);
  } else {
    // Wrong -> Path B start
    pathBIndex = 0;
    showScreen(pathBQuestions[pathBIndex]);
  }
}

/** 
 * Free-response version (question2). If the user types 'tulips', correct;
 * otherwise, to Path B.
 */
function checkFreeResponse(inputId) {
  const userInput = document.getElementById(inputId).value.trim().toLowerCase();
  if (userInput.includes("tulips")) {
    advancePathA("question2");
  } else {
    pathBIndex = 0;
    showScreen(pathBQuestions[pathBIndex]);
  }
}

/**
 * Increments pathACurrent to the next question in pathAOrder
 */
function advancePathA(currentQuestion) {
  // Find index of currentQuestion in pathAOrder
  const currentIndex = pathAOrder.indexOf(currentQuestion);
  if (currentIndex >= 0 && currentIndex < pathAOrder.length - 1) {
    // Move to next
    pathACurrent = pathAOrder[currentIndex + 1];
    showScreen(pathACurrent);
  } else {
    // If at the last in array (valentine), just show valentine
    showScreen("valentine");
  }
}

/* ---------------- PATH B LOGIC ---------------- */
/**
 * If user answers a Path B question correctly, 
 * they return to the *same* Path A question they missed 
 * (so they don't skip question2 or question3).
 */
function checkWrongAnswer(currentBQuestion, isCorrect) {
  if (isCorrect) {
    // Return to the missed Path A question
    showScreen(pathACurrent);
    // reset pathB index
    pathBIndex = 0;
  } else {
    // Move to next Path B question
    pathBIndex++;
    if (pathBIndex >= maxPathB) {
      // If exhausted all path B questions incorrectly => final screen
      showScreen("incorrect-final");
    } else {
      // Show next question in Path B
      showScreen(pathBQuestions[pathBIndex]);
    }
  }
}

/* ---------------- QUIZ FLOW ---------------- */
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
  // Grab final date/time again
  userSelections.dateTime = document.getElementById("final-date-time").value;
  const emailContent = `Date and Time: ${userSelections.dateTime}
Cuisine: ${userSelections.cuisine}
Activity: ${userSelections.activity}`;
  console.log("Sending Email with content:\n", emailContent);
  showScreen("thank-you");
}

function proceedToFinalDate() {
  showScreen("final-date");
}

function restartQuiz() {
  // Reset everything
  pathACurrent = "question1";
  pathBIndex = 0;
  userSelections = { dateTime: "", cuisine: "", activity: "" };
  showScreen("welcome-screen");
}

/* ---------------- SCREEN & MUSIC ---------------- */
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
