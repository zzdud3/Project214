let correctAudio = document.getElementById("correct-audio");
let incorrectAudio = document.getElementById("incorrect-audio");
let correctAudioTime = 0; // Store correct audio time

document.addEventListener("DOMContentLoaded", () => {
    correctAudio.play();
});

function startQuiz() {
    showScreen("question1");
}

function checkAnswer(question, answer) {
    if (answer === "correct") {
        resumeCorrectAudio();
        if (question === 1) showScreen("question2");
    } else {
        playIncorrectAudio();
        if (question === 1) showScreen(`question-wrong${answer.charAt(answer.length - 1)}`);
    }
}

function checkFlowerAnswer() {
    let userAnswer = document.getElementById("flower-answer").value.trim().toLowerCase();
    if (userAnswer.includes("tulip")) {
        resumeCorrectAudio();
        showScreen("valentine");
    } else {
        playIncorrectAudio();
        showScreen("incorrect-path");
    }
}

function goToDateSelection() {
    resumeCorrectAudio();
    showScreen("date-selection");
}

function sendEmail() {
    let dateTime = document.getElementById("date-time").value;
    if (dateTime) {
        window.location.href = `mailto:your-email@example.com?subject=Valentine's Date&body=I chose ${dateTime}!`;
        showScreen("thank-you");
    }
}

function playIncorrectAudio() {
    correctAudioTime = correctAudio.currentTime;
    correctAudio.pause();
    incorrectAudio.currentTime = 0;
    incorrectAudio.play();
}

function resumeCorrectAudio() {
    incorrectAudio.pause();
    correctAudio.currentTime = correctAudioTime;
    correctAudio.play();
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
}
