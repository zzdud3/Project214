document.addEventListener("DOMContentLoaded", function () {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        showScreen("welcome-screen"); 
        playBackgroundMusic(); 
    }, 100);
});

// Store user selections
let userSelections = {
    dateTime: "",
    cuisine: "",
    activity: ""
};

// Path B tracking
let incorrectPathBCounter = 0;
const maxPathBQuestions = 3; // how many Path B questions exist?

function startQuiz() {
    showScreen("question1");
}

function checkAnswer(question, isCorrect) {
    if (isCorrect) {
        if (question === "question1") {
            showScreen("question2");
        } else if (question === "question2") {
            showScreen("question3");
        } else if (question === "question3") {
            showScreen("valentine");
        }
    } else {
        // Any incorrect answer from Path A sends user to question-wrong1
        showScreen("question-wrong1");
    }
}

function checkFreeResponse(inputId) {
    let answer = document.getElementById(inputId).value.toLowerCase();
    if (answer.includes("tulips")) {
        showScreen("question3");
    } else {
        showScreen("question-wrong1");
    }
}

function checkWrongAnswer(question, isCorrect) {
    if (isCorrect) {
        // Correct B answer returns user to correct step in Path A
        if (question === "question-wrong1") {
            showScreen("question2");
        } else if (question === "question-wrong2") {
            showScreen("question3");
        } else if (question === "question-wrong3") {
            showScreen("question3");
        }
    } else {
        incorrectPathBCounter++;
        if (incorrectPathBCounter >= maxPathBQuestions) {
            // If user fails all B questions, go to final restart
            showScreen("incorrect-final");
            incorrectPathBCounter = 0;
        } else {
            // Move to next Path B question
            if (question === "question-wrong1") {
                showScreen("question-wrong2");
            } else if (question === "question-wrong2") {
                showScreen("question-wrong3");
            }
        }
    }
}

// Transition to date selection after Valentine question
function goToDateSelection() {
    showScreen("date-selection");
}

// Save the date-time from the first date input, proceed to next preferences
function proceedToPreferences() {
    userSelections.dateTime = document.getElementById("date-time").value;
    showScreen("cuisine");
}

// Save cuisine choice, go to activity
function selectCuisine(choice) {
    userSelections.cuisine = choice;
    showScreen("activity");
}

// Save activity choice, go to final date confirmation
function selectActivity(choice) {
    userSelections.activity = choice;
    showScreen("final-date");
}

// On final confirm, re-capture date/time & log
function sendEmail() {
    userSelections.dateTime = document.getElementById("final-date-time").value;
    let emailContent = `Date and Time: ${userSelections.dateTime}\nCuisine: ${userSelections.cuisine}\nActivity: ${userSelections.activity}`;
    console.log("Sending Email with content:\n", emailContent);
    showScreen("thank-you");
}

// From thank-you page, user can pick final date
function proceedToFinalDate() {
    showScreen("final-date");
}

// Restart entire quiz
function restartQuiz() {
    incorrectPathBCounter = 0;
    userSelections = { dateTime: "", cuisine: "", activity: "" };
    showScreen("welcome-screen");
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
    let targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove("hidden");
    } else {
        console.error("Screen not found:", screenId);
    }
}

// Play background music from the hidden iframe
function playBackgroundMusic() {
    let bgMusic = document.getElementById("bg-music");
    if (bgMusic) {
        bgMusic.src = "https://www.youtube.com/embed/YOUR_PLAYLIST_ID?autoplay=1&loop=1&playlist=YOUR_PLAYLIST_ID&mute=0";
    } else {
        console.error("Background music element not found");
    }
}
