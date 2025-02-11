// Initialize current question index
let currentQuestion = 0;

// Array for questions (Path A and B)
const questionsPathA = [
    { question: "Who are you?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 1" },
    { question: "What resides between your nose and chin?", correct: "tulips" },
    { question: "What is my type?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 2" }
];

const questionsPathB = [
    { question: "Who are you?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 2" },
    { question: "What resides between your nose and chin?", correct: "tulips" },
    { question: "What is my type?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 3" }
];

// Show the first question after clicking "Proceed"
function startQuiz() {
    document.getElementById('welcome-screen').classList.remove('show'); // Hide the welcome screen
    showQuestion(0); // Show the first question
}

// Function to display the next question based on the current index
function showQuestion(questionIndex) {
    currentQuestion = questionIndex;

    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('show'));

    // Get the appropriate question screen
    const currentQuestionScreen = document.getElementById(`question${currentQuestion + 1}`);
    if (currentQuestionScreen) {
        currentQuestionScreen.classList.add('show'); // Show the current question screen
    }
}

// Handle user responses to questions
function answerQuestion(questionIndex, answer) {
    // Determine if the answer is correct for the current question
    const currentQuestionData = currentQuestion < questionsPathA.length ? questionsPathA[currentQuestion] : questionsPathB[currentQuestion];

    // If the answer is correct, move to the next question
    if (answer === currentQuestionData.correct) {
        if (currentQuestion < questionsPathA.length - 1) {
            showQuestion(currentQuestion + 1); // Show next question
        } else {
            document.getElementById('thank-you').classList.add('show'); // Show Thank You screen
        }
    } else {
        // If the answer is incorrect, move to Path B or Restart
        if (currentQuestion < questionsPathA.length - 1) {
            showQuestion(currentQuestion + 1); // Move to the next question in Path B
        } else {
            document.getElementById('restart-screen').classList.add('show'); // Show restart screen if all answers are incorrect
        }
    }
}
