let currentQuestionIndex = 0;
let pathAIndex = 0;
let pathBIndex = 0;
let usedPathBQuestions = new Set();
let answers = {};

const questionsPathA = [
    { question: "Who are you?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 1" },
    { question: "What resides between your nose and chin?", type: "text", correct: "tulips" },
    { question: "What is my type?", options: ["Introverted", "Extroverted", "Ambivert", "Maverick"], correct: "Introverted" }
];

const questionsPathB = [
    { question: "What was my Roman Empire?", options: ["Eagles superbowl win", "RG3's downfall", "Getting old"], correct: "Eagles superbowl win" },
    { question: "What was the first set of flowers I got you?", options: ["Tulips", "Lilies", "Carnations"], correct: "Tulips" },
    { question: "Why did the tomato turn red?", options: ["Because it saw the salad dressing", "It was ketchup to its friend", "Because it was a little shady"], correct: "Because it saw the salad dressing" }
];

function startQuiz() {
    document.getElementById("welcome-screen").classList.remove("active");
    showQuestion(questionsPathA[pathAIndex]);
}

function showQuestion(question) {
    let questionContainer = document.getElementById("question-container");
    let questionText = document.getElementById("question-text");
    let answerButtons = document.getElementById("answer-buttons");
    let freeResponse = document.getElementById("free-response");
    let submitButton = document.getElementById("submit-answer");

    questionContainer.classList.add("active");
    questionText.innerText = question.question;
    answerButtons.innerHTML = "";

    if (question.type === "text") {
        freeResponse.style.display = "block";
        submitButton.style.display = "block";
    } else {
        freeResponse.style.display = "none";
        submitButton.style.display = "none";
        question.options.forEach(option => {
            let button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => checkAnswer(question, option);
            answerButtons.appendChild(button);
        });
    }
}

function checkAnswer(question, selectedAnswer) {
    if (question.correct.toLowerCase() === selectedAnswer.toLowerCase()) {
        pathAIndex++;
        if (pathAIndex >= questionsPathA.length) {
            document.getElementById("date-selection-screen").classList.add("active");
        } else {
            showQuestion(questionsPathA[pathAIndex]);
        }
    } else {
        if (pathBIndex < questionsPathB.length && !usedPathBQuestions.has(pathBIndex)) {
            usedPathBQuestions.add(pathBIndex);
            showQuestion(questionsPathB[pathBIndex]);
            pathBIndex++;
        } else {
            document.getElementById("restart-screen").classList.add("active");
        }
    }
}

function proceedToFinal() {
    document.getElementById("date-selection-screen").classList.remove("active");
    document.getElementById("final-question1").classList.add("active");
}

function selectFinalChoice(choice) {
    document.getElementById("thank-you").classList.add("active");
    sendEmail();
}

function sendEmail() {
    console.log("Sending email with selected date, time, and preferences...");
}

function restartQuiz() {
    location.reload();
}
