// Initialize the current question index
let currentQuestionIndex = 0;

// Array for questions and answers
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
    showQuestion(currentQuestionIndex); // Show the first question
}

// Function to display the current question based on the question index
function showQuestion(questionIndex) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('show')); // Hide all screens

    // Logic to show the appropriate question based on the index
    if (questionIndex < questionsPathA.length) {
        const questionId = `question${questionIndex + 1}`;
        document.getElementById(questionId).classList.add('show'); // Show the current question screen
    } else {
        document.getElementById('thank-you').classList.add('show'); // Show Thank You screen if all questions are done
    }
}

// Handle user responses to questions
function answerQuestion(answer) {
    let currentQuestionData;
    
    // Get the current question's data based on current question index
    if (currentQuestionIndex < questionsPathA.length) {
        currentQuestionData = questionsPathA[currentQuestionIndex];
    }

    // Check if the answer is correct
    if (answer === currentQuestionData.correct) {
        currentQuestionIndex++; // Move to the next question
        showQuestion(currentQuestionIndex); // Show the next question
    } else {
        document.getElementById('restart-screen').classList.add('show'); // If incorrect, show the restart screen
    }
}
