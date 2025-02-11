document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded. Showing welcome screen...");
  showScreen("welcome-screen");
});

/* ===============================
   GLOBAL STATE
=============================== */

// Ensure Path A progresses in order
let pathACurrent = "question1";
const pathAOrder = ["question1", "question2", "question3"];

// Track Path B question usage
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];
let pathBUsed = [false, false, false];

let userSelections = {
  dateTime: "",
  cuisine: "",
  activity: ""
};

/* ===============================
   PATH A FUNCTIONS
=============================== */

/**
 * Called when user clicks an answer for a Path A question.
 * Moves forward if correct, otherwise sends to next available Path B question.
 */
function checkAnswer(currentQuestionId, isCorrect) {
  console.log(`checkAnswer() called for ${currentQuestionId}; isCorrect=${isCorrect}`);
  if (isCorrect) {
    advancePathA(currentQuestionId);
  } else {
    goToNextPathB();
  }
}

/**
 * Handles free-response questions (question2). 
 * Moves forward if "tulips" is found in the answer.
 */
function checkFreeResponse(inputId) {
  const userInput = document.getElementById(inputId).value.trim().toLowerCase();
  console.log("checkFreeResponse() - user typed:", userInput);
  if (userInput.includes("tulips")) {
    advancePathA("question2");
  } else {
    goToNextPathB();
  }
}

/**
 * Advances through Path A questions sequentially.
 * Moves to 'valentine' screen after 'question3'.
 */
function advancePathA(currentQuestionId) {
  const currentIndex = pathAOrder.indexOf(currentQuestionId);
  if (currentIndex === -1) {
    console.error("Invalid Path A question ID:", currentQuestionId);
    return;
  }

  if (currentIndex < pathAOrder.length - 1) {
    pathACurrent = pathAOrder[currentIndex + 1];
    console.log(`Moving to next Path A question: ${pathACurrent}`);
    showScreen(pathACurrent);
  } else {
    pathACurrent = "valentine";
    console.log("All Path A questions done; showing valentine");
    showScreen("valentine");
  }
}

/* ===============================
   PATH B FUNCTIONS
=============================== */

/**
 * Finds the next unused Path B question.
 * If all used, directs to 'incorrect-final' screen.
 */
function goToNextPathB() {
  const nextIndex = pathBUsed.findIndex(used => used === false);
  if (nextIndex === -1) {
    console.log("All Path B questions used; showing incorrect-final");
    showScreen("incorrect-final");
  } else {
    console.log(`Going to next Path B question: ${pathBQuestions[nextIndex]}`);
    pathBUsed[nextIndex] = true;
    showScreen(pathBQuestions[nextIndex]);
  }
}

/**
 * Handles Path B question answers.
 * If correct, sends the user back to the Path A question they missed.
 */
function checkWrongAnswer(pathBQuestionId, isCorrect) {
  console.log(`checkWrongAnswer() called for ${pathBQuestionId}; isCorrect=${isCorrect}`);
  if (isCorrect) {
    console.log("Correct in Path B => Returning to Path A question:", pathACurrent);
    showScreen(pathACurrent);
  } else {
    goToNextPathB();
  }
}

/* ===============================
   QUIZ FLOW
=============================== */

/**
 * Initiates the quiz, moving from welcome screen to question1.
 */
function startQuiz() {
  console.log("startQuiz() called => Transitioning to question1");
  showScreen("question1");
}

/**
 * Moves to Date Selection screen after answering 'Yes' to Valentine.
 */
function goToDateSelection() {
  console.log("User accepted valentine; proceeding to date-selection.");
  showScreen("date-selection");
}

/**
 * Stores date-time input and moves to cuisine selection.
 */
function proceedToPreferences() {
  userSelections.dateTime = document.getElementById("date-time").value;
  console.log("Storing user date-time:", userSelections.dateTime);
  showScreen("cuisine");
}

/**
 * Stores cuisine choice and moves to activity selection.
 */
function selectCuisine(choice) {
  console.log("User chose cuisine:", choice);
  userSelections.cuisine = choice;
  showScreen("activity");
}

/**
 * Stores activity choice and moves to final date confirmation.
 */
function selectActivity(choice) {
  console.log("User chose activity:", choice);
  userSelections.activity = choice;
  showScreen("final-date");
}

/**
 * Logs email submission details and moves to Thank You page.
 */
function sendEmail() {
  userSelections.dateTime = document.getElementById("final-date-time").value;
  console.log("Sending Email:\n", userSelections);
  showScreen("thank-you");
}

/**
 * Returns to final-date page from Thank You screen.
 */
function proceedToFinalDate() {
  showScreen("final-date");
}

/**
 * Resets quiz state and returns to welcome screen.
 */
function restartQuiz() {
  console.log("Restarting quiz...");
  pathACurrent = "question1";
  pathBUsed = [false, false, false];
  userSelections = { dateTime: "", cuisine: "", activity: "" };
  showScreen("welcome-screen");
}

/* ===============================
   SCREEN TOGGLING
=============================== */

/**
 * Toggles visibility of screens based on given ID.
 */
function showScreen(screenId) {
  console.log(`showScreen(${screenId})`);
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

/* ===============================
   BACKGROUND MUSIC (TEMPORARILY OFF)
=============================== */

function playBackgroundMusic() {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.src = "https://www.youtube.com/embed/videoseries?si=CoWnY5fbLySxr51i&amp;list=PL2kgM6nw1kmzfxj4he4S_Z7Jjxb4FgCTT?autoplay=1&loop=1&playlist=YOUR_PLAYLIST_ID&mute=0";
  } else {
    console.error("Background music element not found");
  }
}
