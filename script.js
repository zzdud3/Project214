let player;

document.addEventListener("DOMContentLoaded", function () { 
  console.log("DOM fully loaded. Showing welcome screen...");
  showScreen("welcome-screen");

  // Load YouTube API script dynamically
  loadYouTubeAPI();
});

function loadYouTubeAPI() {
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(script);
}

// YouTube API callback function (runs when API loads)
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    height: "0", // Hide player
    width: "0",  // Hide player
    videoId: "CBx6e9cZlBQ", // Your video ID from the embed link
    playerVars: {
      autoplay: 1,  // Attempt to autoplay
      loop: 1,      // Loop video
      mute: 1,      // Start muted (needed to allow autoplay)
      playlist: "CBx6e9cZlBQ" // Ensures looping works
    },
    events: {
      onReady: function(event) {
        console.log("YouTube Player Ready. Video is muted.");
      }
    }
  });
}

// Function to unmute and start playing music when the user clicks "Proceed"
function unmuteBackgroundMusic() {
  if (player) {
    player.unMute();
    player.playVideo();
    console.log("Background music unmuted.");
  }
}

// Modify startQuiz() to unmute music when proceeding
function startQuiz() {
  console.log("Starting quiz, moving to first question.");
  unmuteBackgroundMusic(); // Unmute music after interaction
  showScreen("question1");
}

let pathACurrent = "question1";
const pathAOrder = ["question1", "question2", "question3"];
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];
let pathBUsed = [false, false, false];
let userSelections = { dateTime: "", cuisine: "", activity: "" };

function checkAnswer(currentQuestionId, isCorrect) {
  console.log(`checkAnswer() called for ${currentQuestionId}; isCorrect=${isCorrect}`);
  if (isCorrect) {
    advancePathA(currentQuestionId);
  } else {
    goToNextPathB();
  }
}

function checkFreeResponse(inputId) {
  const userInput = document.getElementById(inputId).value.trim().toLowerCase();
  console.log(`checkFreeResponse() - user typed: ${userInput}`);
  if (userInput.includes("tulips")) {
    advancePathA("question2");
  } else {
    goToNextPathB();
  }
}

function advancePathA(currentQuestionId) {
  const currentIndex = pathAOrder.indexOf(currentQuestionId);
  if (currentIndex < pathAOrder.length - 1) {
    pathACurrent = pathAOrder[currentIndex + 1];
    showScreen(pathACurrent);
  } else {
    pathACurrent = "valentine";
    showScreen("valentine");
  }
}

function goToNextPathB() {
  const nextIndex = pathBUsed.findIndex(used => used === false);
  if (nextIndex === -1) {
    showScreen("incorrect-final");
  } else {
    pathBUsed[nextIndex] = true;
    showScreen(pathBQuestions[nextIndex]);
  }
}

function checkWrongAnswer(pathBQuestionId, isCorrect) {
  console.log(`checkWrongAnswer() called for ${pathBQuestionId}; isCorrect=${isCorrect}`);
  if (isCorrect) {
    showScreen(pathACurrent);
  } else {
    goToNextPathB();
  }
}

function startQuiz() {
  console.log("Starting quiz, moving to first question.");
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
  sendEmail();
}

function sendEmail() {
  userSelections.dateTime = document.getElementById("date-time").value; // Fixed reference
  console.log("Sending Email:", userSelections);
  showScreen("thank-you");
}

function restartQuiz() {
  pathACurrent = "question1";
  pathBUsed = [false, false, false];
  userSelections = { dateTime: "", cuisine: "", activity: "" };
  showScreen("welcome-screen");
}

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
