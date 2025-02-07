let correctAudio = new Audio("https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPOSITORY/main/assets/audio/correct-audio.mp3");
let incorrectAudio = new Audio("https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPOSITORY/main/assets/audio/incorrect-audio.mp3");
let lastIncorrectQuestion = null; 

function startQuiz() {
    correctAudio.play();
    showScreen("question1");
}

function showScreen(screenId) {
    let screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.classList.add("hidden"));
    document.getElementById(screenId).classList.remove("hidden");
}

function checkAnswer(questionNumber, answerType) {
    if (answerType === "correct") {
        correctAudio.play();
        showScreen(questionNumber === 1 ? "question2" : "valentine");
    } else {
        incorrectAudio.play();
        lastIncorrectQuestion = questionNumber; 
        showScreen(`question-wrong${answerType.slice(-1)}`);
    }
}

function checkFlowerAnswer() {
    let answer = document.getElementById("flower-answer").value.trim().toLowerCase();
    if (answer.includes("tulip")) {
        correctAudio.play();
        showScreen("valentine");
    } else {
        incorrectAudio.play();
        lastIncorrectQuestion = 2;
        showScreen("question-wrong1");
    }
}

function checkIncorrectAnswer() {
    incorrectAudio.play();
    showScreen("incorrect-path");
}

function correctFromWrongBank() {
    if (lastIncorrectQuestion) {
        showScreen(`question${lastIncorrectQuestion}`);
        correctAudio.play();
        lastIncorrectQuestion = null;
    }
}

function goToDateSelection() {
    correctAudio.play();
    showScreen("date-selection");
}

function sendEmail() {
    let dateTime = document.getElementById("date-time").value;
    if (!dateTime) {
        alert("Please select a date and time.");
        return;
    }

    let mailtoLink = `mailto:rehmanzaine9@gmail.com?subject=Valentine's Date Selection&body=The selected date and time is: ${dateTime}`;
    window.location.href = mailtoLink;

    showScreen("thank-you");
}

function restartQuiz() {
    incorrectAudio.pause();
    correctAudio.play();
    showScreen("welcome-screen");
}
