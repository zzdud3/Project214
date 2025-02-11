document.addEventListener("DOMContentLoaded", function () {
    showScreen("welcome-screen"); // Ensure welcome screen is visible on load
    playBackgroundMusic(); // Start playing background music immediately
});

let userSelections = {
    dateTime: "",
    cuisine: "",
    activity: ""
};

function startQuiz() {
    showScreen("question1");
}

function checkAnswer(question, isCorrect) {
    if (isCorrect) {
        if (question === "question1") showScreen("question2");
        else if (question === "question2") showScreen("question3");
        else if (question === "question3") showScreen("valentine");
    } else {
        showScreen("question-wrong1"); // Incorrect answers always lead to Path B
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

let incorrectPathBCounter = 0; // Tracks incorrect Path B answers
const maxPathBQuestions = 3; // Maximum incorrect path B questions before restart

function checkWrongAnswer(question, isCorrect) {
    if (isCorrect) {
        if (question === "question-wrong1") showScreen("question2");
        else if (question === "question-wrong2") showScreen("question3");
        else if (question === "question-wrong3") showScreen("question3");
    } else {
        incorrectPathBCounter++;
        
        if (incorrectPathBCounter >= maxPathBQuestions) {
            showScreen("incorrect-final"); // Restart after all Path B questions are answered incorrectly
            incorrectPathBCounter = 0; // Reset counter
        } else {
            if (question === "question-wrong1") showScreen("question-wrong2");
            else if (question === "question-wrong2") showScreen("question-wrong3");
        }
    }
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
    let emailContent = `Date and Time: ${userSelections.dateTime}\nCuisine: ${userSelections.cuisine}\nActivity: ${userSelections.activity}`;
    console.log("Sending Email with content:", emailContent);
    showScreen("thank-you");
}

function proceedToFinalDate() {
    showScreen("final-date");
}

function restartQuiz() {
    incorrectPathBCounter = 0; // Reset Path B tracking on restart
    userSelections = { dateTime: "", cuisine: "", activity: "" }; // Reset stored selections
    showScreen("welcome-screen");
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
    document.getElementById(screenId).classList.remove("hidden");
}

function playBackgroundMusic() {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.src = "https://www.youtube.com/embed/YOUR_PLAYLIST_ID?autoplay=1&loop=1&playlist=YOUR_PLAYLIST_ID&mute=0";
}
