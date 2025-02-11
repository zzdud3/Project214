// Define Path A and Path B questions with the correct answers
const questionsPathA = [
    { question: "Who are you?", options: ["Option 1"], correct: 0 },
    { question: "What resides between your nose and chin?", correctAnswer: "tulips", type: "freeResponse" },
    { question: "What is my type?", options: ["Maverick"], correct: 0 }
];

const questionsPathB = [
    { question: "What was my Roman Empire?", options: ["Eagles superbowl win"], correct: 0 },
    { question: "What was the first set of flowers I got you?", options: ["Carnations"], correct: 0 },
    { question: "Why did the tomato turn red?", options: ["Because it saw the salad dressing"], correct: 0 }
];

// Track the current question indices for Path A and Path B
let currentPathAIndex = 0;
let currentPathBIndex = 0;

// Function to start the quiz
function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    showQuestion('question1', questionsPathA);
}

// Function to show the questions
function showQuestion(questionId, path) {
    const question = path[currentPathAIndex] || path[currentPathBIndex];
    if (question) {
        const questionContainer = document.getElementById(questionId);
        questionContainer.classList.remove('hidden');
        document.querySelector(`#${questionId} h2`).textContent = question.question;

        // For multiple-choice questions, populate the options
        if (question.options) {
            question.options.forEach((option, index) => {
                document.querySelector(`#${questionId} button:nth-child(${index + 1})`).textContent = option;
            });
        }
    }
}

// Function to check the answers
function checkAnswer(questionId, selectedAnswer) {
    const question = questionsPathA[currentPathAIndex] || questionsPathB[currentPathBIndex];

    if (question) {
        // For multiple-choice questions, check the selected answer
        if (question.options) {
            if (selectedAnswer === question.options[question.correct]) {
                proceedToNextQuestion();
            } else {
                showRestartScreen();
            }
        }
        // For free-text questions, check the entered answer
        else if (question.type === "freeResponse") {
            if (selectedAnswer.toLowerCase().includes(question.correctAnswer.toLowerCase())) {
                proceedToNextQuestion();
            } else {
                showRestartScreen();
            }
        }
    }
}

// Proceed to the next question
function proceedToNextQuestion() {
    // If it's Path A, move to the next question
    if (currentPathAIndex < questionsPathA.length - 1) {
        currentPathAIndex++;
        showQuestion(`question${currentPathAIndex + 1}`, questionsPathA);
    } else {
        // If it's Path B, proceed to Path B
        showQuestion(`question${currentPathBIndex + 4}`, questionsPathB);
    }
}

// Show the Restart screen if the answers are wrong
function showRestartScreen() {
    document.getElementById('restart-screen').classList.remove('hidden');
}

// Restart the quiz
function restartQuiz() {
    currentPathAIndex = 0;
    currentPathBIndex = 0;
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('restart-screen').classList.add('hidden');
    document.getElementById('thank-you').classList.add('hidden');
}
