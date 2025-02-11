function loadBackgroundMusic() {
    const musicContainer = document.getElementById("bg-music-container");
    
    // Clear existing iframe (prevents duplicates)
    musicContainer.innerHTML = ""; 

    // Create a new iframe dynamically
    const iframe = document.createElement("iframe");
    iframe.width = "0";
    iframe.height = "0";
    iframe.src = "https://www.youtube.com/embed/CBx6e9cZlBQ?autoplay=1&loop=1&playlist=CBx6e9cZlBQ";
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;

    // Append iframe to container
    musicContainer.appendChild(iframe);

    console.log("Background music started.");
}

// Triggered when the user clicks "Proceed"
function startQuiz() {
    console.log("Starting quiz, moving to first question.");
    
    // Start background music
    loadBackgroundMusic();

    // Ensure transition to the first question
    showScreen("question1");
}

function showScreen(screenId) {
    console.log(`showScreen(${screenId})`);
    
    // Hide all screens
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    // Show the requested screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove("hidden");
    } else {
        console.error("Screen not found:", screenId);
    }
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
