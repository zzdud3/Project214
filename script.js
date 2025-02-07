// Get audio elements
const correctAudio = document.getElementById("correct-audio");
const incorrectAudio = document.getElementById("incorrect-audio");

// Function to start the quiz
function startQuiz() {
    showScreen("question1");
    playCorrectAudio();
}

// Function to show a screen
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
    document.getElementById(screenId).classList.remove("hidden");
}

// Function to play correct audio
function playCorrectAudio() {
    incorrectAudio.pause();
    correctAudio.play();
}

// Function to play incorrect audio
function playIncorrectAudio() {
    correctAudio.pause();
    incorrectAudio.play();
}

// Function to check answer for multiple-choice questions
function checkAnswer(questionNum, answerType) {
    if (answerType === "correct") {
        if (questionNum === 1) {
            showScreen("question2");
        } else if (questionNum === 2) {
            showScreen("valentine");
        }
        playCorrectAudio();
    } else {
        handleIncorrectAnswer(questionNum);
    }
}

// Function to handle incorrect answers
function handleIncorrectAnswer(questionNum) {
    playIncorrectAudio();
    if (questionNum === 1) {
        showScreen("question-wrong1");
    } else if (questionNum === 2) {
        showScreen("question-wrong2");
    }
}

// Function to check the free-response answer
function checkFlowerAnswer() {
    const answer = document.getElementById("flower-answer").value.trim().toLowerCase();
    if (answer.includes("tulip")) {
        showScreen("valentine");
        playCorrectAudio();
    } else {
        showScreen("question-wrong3");
        playIncorrectAudio();
    }
}

// Function to process incorrect path answers
function checkWrongAnswer(questionNum, isCorrect) {
    if (isCorrect) {
        // If correct, return to the corresponding correct question
        if (questionNum === 1) {
            showScreen("question1");
        } else if (questionNum === 2) {
            showScreen("question2");
        } else if (questionNum === 3) {
            showScreen("valentine");
        }
        playCorrectAudio();
    } else {
        // If incorrect, go to the incorrect final page
        showScreen("incorrect-path");
        playIncorrectAudio();
    }
}

// Function to handle the valentine question
function goToDateSelection() {
    showScreen("date-selection");
    playCorrectAudio();
}

// Function to process incorrect valentine answer
function wrongAnswerPath() {
    showScreen("incorrect-path");
    playIncorrectAudio();
}

// Function to restart quiz from the incorrect final page
function restartQuiz() {
    showScreen("welcome-screen");
    playCorrectAudio();
}

// Function to send email with selected date and time
function sendEmail() {
    const dateTime = document.getElementById("date-time").value;
    if (!dateTime) {
        alert("Please select a date and time.");
        return;
    }

    const email = "rehmanzaine9@gmail.com"; // Replace with your email
    const subject = encodeURIComponent("Valentine's Date Confirmation");
    const body = encodeURIComponent(`The selected date and time is: ${dateTime}`);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    showScreen("thank-you");
    playCorrectAudio();
}
