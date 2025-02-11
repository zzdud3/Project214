document.addEventListener("DOMContentLoaded", function () {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    showScreen("welcome-screen");
    playBackgroundMusic();
  }, 100);
});

/* ---------------- GLOBAL STATE ---------------- */

// Which Path A question are we currently on? (controls order)
let pathACurrent = "question1";
const pathAOrder = ["question1", "question2", "question3"];

// Array of Path B question IDs in order
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];

// Tracks whether each Path B question is already used (answered incorrectly once).
// false = not yet used, true = used
let pathBUsed = [false, false, false];

// Store the user’s final picks
let userSelections = {
  dateTime: "",
  cuisine: "",
  activity: ""
};

/* ---------------- PATH A FUNCTIONS ---------------- */

/**
 * Called when user answers a Path A question (button click).
 * If correct, move to next question; if wrong, go to next available Path B question.
 */
function checkAnswer(currentQuestionId, isCorrect) {
  if (isCorrect) {
    // Advance path A
    advancePathA(currentQuestionId);
  } else {
    // Send user to the next available Path B question
    goToNextPathB();
  }
}

/**
 * Called specifically by question2's free-response to check text input.
 */
function checkFreeResponse(inputId) {
  const userInput = document.getElementById(inputId).value.trim().toLowerCase();
  if (userInput.includes("tulips")) {
    // correct -> proceed
    advancePathA("question2");
  } else {
    // wrong -> path B
    goToNextPathB();
  }
}

/**
 * Moves from the current question to the next question in pathAOrder.
 * Once question3 is passed, goes to valentine question.
 */
function advancePathA(currentQuestionId) {
  const currentIndex = pathAOrder.indexOf(currentQuestionId);
  if (currentIndex === -1) {
    console.error("Invalid Path A question ID:", currentQuestionId);
    return;
  }
  // If not the last in Path A, move forward
  if (currentIndex < pathAOrder.length - 1) {
    const nextQuestionId = pathAOrder[currentIndex + 1];
    pathACurrent = nextQuestionId;
    showScreen(pathACurrent);
  } else {
    // If we just passed question3, go to valentine
    pathACurrent = "valentine";
    showScreen("valentine");
  }
}

/* ---------------- PATH B FUNCTIONS ---------------- */

/**
 * Finds the next available Path B question that has NOT been used yet (answered incorrectly).
 * If none is available, show 'incorrect-final'.
 */
function goToNextPathB() {
  // Find the first pathB question that is still false in pathBUsed
  const nextIndex = pathBUsed.findIndex(used => used === false);
  if (nextIndex === -1) {
    // If none available, user already used up all 3 => final sorry page
    showScreen("incorrect-final");
  } else {
    // Show that path B question
    showScreen(pathBQuestions[nextIndex]);
  }
}

/**
 * Called when user selects an answer in a path B question.
 * If correct -> return to the same Path A question
 * If wrong -> mark current path B question as used, then see if we have more
 */
function checkWrongAnswer(pathBQuestionId, isCorrect) {
  // Identify which question index is this
  const bIndex = pathBQuestions.indexOf(pathBQuestionId);
  if (bIndex === -1) {
    console.error("Unknown Path B question:", pathBQuestionId);
    return;
  }
  if (isCorrect) {
    // Return to current Path A question (try again)
    showScreen(pathACurrent);
  } else {
    // Mark this Path B question as used
    pathBUsed[bIndex] = true;
    // Next time, user will skip this question
    // Now go to next question in path B or final sorry page
    goToNextPathB();
  }
}

/* ---------------- QUIZ FLOW ---------------- */

/** Valentine question is correct -> date selection */
function goToDateSelection() {
  showScreen("date-selection");
}

/** Store date-time from the first date input, proceed to cuisine */
function proceedToPreferences() {
  userSelections.dateTime = document.getElementById("date-time").value;
  showScreen("cuisine");
}

/** Save cuisine choice, go to activity */
function selectCuisine(choice) {
  userSelections.cuisine = choice;
  showScreen("activity");
}

/** Save activity choice, go to final date confirmation */
function selectActivity(choice) {
  userSelections.activity = choice;
  showScreen("final-date");
}

/** On final confirm, store date/time & show thanks */
function sendEmail() {
  userSelections.dateTime = document.getElementById("final-date-time").value;
  const emailContent = `Date and Time: ${userSelections.dateTime}\nCuisine: ${userSelections.cuisine}\nActivity: ${userSelections.activity}`;
  console.log("Sending Email with content:\n", emailContent);
  showScreen("thank-you");
}

/** From thank-you page, user can pick final date */
function proceedToFinalDate() {
  showScreen("final-date");
}

/** 
 * Called from the final sorry page or from the No button 
 * in Valentine question -> fully reset 
 */
function restartQuiz() {
  // Reset states
  pathACurrent = "question1";
  pathBUsed = [false, false, false];
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
