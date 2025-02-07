let correctAudio = new Audio("correct-audio.mp3");
let incorrectAudio = new Audio("incorrect-audio.mp3");
let lastIncorrectQuestion = null; // To track which correct question was answered incorrectly

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
        if (questionNumber === 1) {
            showScreen("question2");
        } else if (questionNumber === 2) {
            showScreen("valentine");
        }
    } else {
        incorrectAudio.play();
        lastIncorrectQuestion = questionNumber; // Store the last incorrect question
        if (answerType === "wrong1") {
            showScreen("question-wrong1");
        } else if (answerType === "wrong2") {
            showScreen("question-wrong2");
        } else if (answerType === "wrong3") {
            showScreen("question-wrong3");
        }
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

function goToIncorrectPath() {
    incorrectAudio.play();
    showScreen("incorrect-path");
}

function correctFromWrongBank() {
    if (lastIncorrectQuestion) {
        showScreen(`question${lastIncorrectQuestion}`);
        correctAudio.play();
        lastIncorrectQuestion = null; // Reset tracking
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

    let emailAddress = "rehmanzaine9@gmail.com";  // Replace with your actual email
    let subject = "Valentine's Date Selection";
    let body = `The selected date and time is: ${dateTime}`;

    let mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    showScreen("thank-you");
}

function restartQuiz() {
    incorrectAudio.pause();
    incorrectAudio.currentTime = 0;
    correctAudio.play();
    showScreen("welcome-screen");
}
