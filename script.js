// On page load, ensure the welcome screen is visible
window.onload = function() {
    document.getElementById("welcome-screen").classList.remove("hidden");
};

// Start the quiz when the "Proceed" button is clicked
function startQuiz() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("question1").classList.remove("hidden");
}

// Handle correct answers for Path A
function checkAnswer(questionId, isCorrect) {
    if (isCorrect) {
        if (questionId === "question1") {
            document.getElementById("question1").classList.add("hidden");
            document.getElementById("question-wrong1").classList.remove("hidden");
        }
    } else {
        document.getElementById(questionId).classList.add("hidden");
        document.getElementById("question-wrong1").classList.remove("hidden");
    }
}

// Handle incorrect answers for Path B
function checkWrongAnswer(questionId, isCorrect) {
    if (isCorrect) {
        document.getElementById(questionId).classList.add("hidden");
        document.getElementById("question-wrong2").classList.remove("hidden");
    } else {
        document.getElementById(questionId).classList.add("hidden");
        document.getElementById("question-wrong3").classList.remove("hidden");
    }
}

// Valentine’s Question Logic
function goToDateSelection() {
    document.getElementById("valentine").classList.add("hidden");
    document.getElementById("date-selection").classList.remove("hidden");
}

function restartQuiz() {
    document.getElementById("thank-you").classList.add("hidden");
    document.getElementById("incorrect-final").classList.add("hidden");
    document.getElementById("welcome-screen").classList.remove("hidden");
}
