let correctAudio = document.getElementById("correct-audio");
let incorrectAudio = document.getElementById("incorrect-audio");
let correctAudioTime = 0; 

document.addEventListener("DOMContentLoaded", () => {
    correctAudio.play();
});

function startQuiz() {
    pauseIncorrectAudio();
    resumeCorrectAudio();
    showScreen("question1");
}

function checkAnswer(question, answer) {
    if (answer === "correct") {
        resumeCorrectAudio();
        showScreen("question2");
    } else {
        playIncorrectAudio();
        let wrongPath = `question-wrong${answer.charAt(answer.length - 1)}`;
        showScreen(wrongPath);
    }
}

function checkFlowerAnswer() {
    let answer = document.getElementById("flower-answer").value.toLowerCase();
    if (answer.includes("tulip")) {
        resumeCorrectAudio();
        showScreen("valentine");
    } else {
        playIncorrectAudio();
        showScreen("question-wrong1");
    }
}

function checkWrongAnswer() {
    goToIncorrectFinalPage();
}

function goToDateSelection() {
    showScreen("date-selection");
}

function goToIncorrectFinalPage() {
    pauseCorrectAudio();
    playIncorrectAudio();
    showScreen("incorrect-final");
}

function restartQuiz() {
    pauseIncorrectAudio();
    correctAudioTime = 0;
    correctAudio.currentTime = 0;
    correctAudio.play();
    showScreen("welcome-screen");
}

// Audio Control Functions
function playIncorrectAudio() {
    correctAudioTime = correctAudio.currentTime;
    correctAudio.pause();
    incorrectAudio.play();
}

function pauseIncorrectAudio() {
    incorrectAudio.pause();
    incorrectAudio.currentTime = 0;
}

function pauseCorrectAudio() {
    correctAudio.pause();
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
function sendEmail() {
    let dateTime = document.getElementById("date-time").value;
    if (!dateTime) {
        alert("Please select a date and time.");
        return;
    }

    let emailAddress = "rehmanzaine9@gmail.com";  // Replace with your email
    let subject = "Valentine's Date Selection";
    let body = `The selected date and time is: ${dateTime}`;

    let mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    showScreen("thank-you");
}
