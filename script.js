// Global variable to keep track of the current question
let currentQuestion = 0;

// Initialize arrays for Path A and B questions
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

// Function to start the quiz
function startQuiz() {
    document.getElementById('welcome-screen').classList.remove('show'); // Hide welcome screen
    showQuestion(0); // Show the first question
}

// Function to display the next question
function showQuestion(questionIndex) {
    currentQuestion = questionIndex;

    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('show'));

    // Get the appropriate question screen
    const currentQuestionScreen = document.getElementById(`question${currentQuestion + 1}`);
    currentQuestionScreen.classList.add('show'); // Show the current question
}

// Function to handle question answering logic
function answerQuestion(questionIndex, answer) {
    const currentQuestionData = currentQuestion < questionsPathA.length ? questionsPathA[currentQuestion] : questionsPathB[currentQuestion];

    if (answer === currentQuestionData.correct) {
        if (currentQuestion < questionsPathA.length - 1) {
            showQuestion(currentQuestion + 1); // Move to the next question
        } else {
            document.getElementById('thank-you').classList.add('show'); // Show the Thank You screen
        }
    } else {
        // Handle incorrect answers, navigate through path B if necessary
        if (currentQuestion < questionsPathA.length - 1) {
            showQuestion(currentQuestion + 1); // Move to the next question in path B
        } else {
            document.getElementById('restart-screen').classList.add('show'); // Show restart screen if all questions answered incorrectly
        }
    }
}
