document.addEventListener("DOMContentLoaded", function () { 
  console.log("DOM fully loaded. Showing welcome screen...");
  showScreen("welcome-screen");

  // Ensure background music plays immediately
  playBackgroundMusic();
});

function playBackgroundMusic() {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.src = "https://www.youtube.com/embed/videoseries?list=PL2kgM6nw1kmzfxj4he4S_Z7Jjxb4FgCTT&autoplay=1&loop=1&mute=1";
    console.log("Background music started.");
  } else {
    console.error("Background music element not found.");
  }
}


let pathACurrent = "question1";
const pathAOrder = ["question1", "question2", "question3"];
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];
let pathBUsed = [false, false, false];
let userSelections = { dateTime: "", cuisine: "", activity: "" };

function checkAnswer(currentQuestionId, isCorrect) {
  console.log(checkAnswer() called for ${currentQuestionId}; isCorrect=${isCorrect});
  if (isCorrect) {
    advancePathA(currentQuestionId);
  } else {
    goToNextPathB();
  }
}

function checkFreeResponse(inputId) {
  const userInput = document.getElementById(inputId).value.trim().toLowerCase();
  console.log("checkFreeResponse() - user typed:", userInput);
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
  console.log(checkWrongAnswer() called for ${pathBQuestionId}; isCorrect=${isCorrect});
  if (isCorrect) {
    showScreen(pathACurrent);
  } else {
    goToNextPathB();
  }
}

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
  sendEmail();
}

function sendEmail() {
  userSelections.dateTime = document.getElementById("final-date-time").value;
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
  console.log(showScreen(${screenId}));
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
