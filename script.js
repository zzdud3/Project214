document.addEventListener("DOMContentLoaded", function () {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    showScreen("welcome-screen");
    playBackgroundMusic();
  }, 100);
});

// Keep track of user’s Path A and path B states, plus final form data
let userSelections = {
  dateTime: "",
  cuisine: "",
  activity: ""
};

// Index for path B questions
let pathBIndex = 0;
// A reference to the IDs of each Path B question in sequence
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];

function startQuiz() {
  showScreen("question1");
}

/* ---------------- PATH A LOGIC ---------------- */
function checkAnswer(questionId, isCorrect) {
  if (isCorrect) {
    // Move to next question in Path A
    if (questionId === "question1") {
      showScreen("question2");
    } else if (questionId === "question2") {
      showScreen("question3");
    } else if (questionId === "question3") {
      showScreen("valentine");
    }
  } else {
    // Any incorrect answer from Path A -> start Path B from first question
    pathBIndex = 0;
    showScreen(pathBQuestions[pathBIndex]);
  }
}

function checkFreeResponse(inputId) {
  const answer = document.getElementById(inputId).value.toLowerCase();
  if (answer.includes("tulips")) {
    showScreen("question3");
  } else {
    // Wrong -> go to first Path B question
    pathBIndex = 0;
    showScreen(pathBQuestions[pathBIndex]);
  }
}

/* ---------------- PATH B LOGIC ---------------- */
function checkWrongAnswer(questionId, isCorrect) {
  if (isCorrect) {
    // A correct Path B answer routes the user back to the correct place in Path A
    if (questionId === "question-wrong1") {
      showScreen("question2");
    } else if (questionId === "question-wrong2") {
      showScreen("question3");
    } else if (questionId === "question-wrong3") {
      showScreen("question3");
    }
    // Reset pathBIndex
    pathBIndex = 0;
  } else {
    // Move to the next question in Path B
    pathBIndex++;
    // If user has exhausted all path B questions
    if (pathBIndex >= pathBQuestions.length) {
      // Show the special screen with restart button
      showScreen("incorrect-final");
    } else {
      // Show next Path B question
      showScreen(pathBQuestions[pathBIndex]);
    }
  }
}

/* ---------------- QUIZ FLOW LOGIC ---------------- */
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

// Start playing background music from a hidden iframe
function playBackgroundMusic() {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.src = "https://www.youtube.com/embed/YOUR_PLAYLIST_ID?autoplay=1&loop=1&playlist=YOUR_PLAYLIST_ID&mute=0";
  } else {
    console.error("Background music element not found");
  }
}
