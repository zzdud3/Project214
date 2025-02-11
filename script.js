document.addEventListener("DOMContentLoaded", function () {
    showScreen("welcome-screen"); // Ensure welcome screen is visible on load
});

function startQuiz() {
    showScreen("question1");
}

function checkAnswer(question, isCorrect) {
    if (isCorrect) {
        if (question === "question1") showScreen("question2");
        else if (question === "question2") showScreen("question3");
        else if (question === "question3") showScreen("valentine");
    } else {
        if (question === "question1") showScreen("question-wrong1");
        else showScreen("question-wrong2");
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
        if (question === "question-wrong1") showScreen("question2");
        else if (question === "question-wrong2") showScreen("question3");
        else if (question === "question-wrong3") showScreen("question3");
    } else {
        if (question === "question-wrong1") showScreen("question-wrong2");
        else if (question === "question-wrong2") showScreen("question-wrong3");
        else showScreen("incorrect-final");
    }
}

function goToDateSelection() {
    showScreen("date-selection");
}

function sendEmail() {
    showScreen("thank-you");
}

function restartQuiz() {
    showScreen("welcome-screen");
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
    document.getElementById(screenId).classList.remove("hidden");
}
