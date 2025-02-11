// Initialize current question index
let currentQuestion = 0;

// Array for questions and answers
const questionsPathA = [
    { question: "Who are you?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 1" },
    { question: "What resides between your nose and chin?", correct: "tulips" },
    { question: "What is my type?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 2" }
];

// Array for Path B (same as Path A for now)
const questionsPathB = [
    { question: "Who are you?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 2" },
    { question: "What resides between your nose and chin?", correct: "tulips" },
    { question: "What is my type?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 3" }
];

// Show the first question after clicking "Proceed"
function startQuiz() {
    document.getElementById('welcome-screen').classList.remove('show'); // Hide the welcome screen
    showQuestion(currentQuestion); // Show the first question
}

// Function to display the current question based on the question index
function showQuestion(questionIndex) {
    // Hide all question screens first
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('show'));

    // Logic to check if we reached the end
    if (questionIndex >= questionsPathA.length) {
        document.getElementById('thank-you').classList.add('show'); // Show Thank You screen
        return;
    }

    // Show the current question based on the index
    const questionId = `question${questionIndex + 1}`;
    document.getElementById(questionId).classList.add('show');
}

// Handle user responses to questions
function answerQuestion(answer) {
    let currentQuestionData;
    
    // Get the current question's data based on current question index
    if (currentQuestion < questionsPathA.length) {
        currentQuestionData = questionsPathA[currentQuestion];
    } else {
        currentQuestionData = questionsPathB[currentQuestion - questionsPathA.length];
    }

    // Check if the answer is correct
    if (answer === currentQuestionData.correct) {
        currentQuestion++; // Move to the next question
        showQuestion(currentQuestion); // Show the next question
    } else {
        // If answer is incorrect, show restart screen or next question in Path B
        if (currentQuestion < questionsPathA.length - 1) {
            showQuestion(currentQuestion); // Stay on the current question if incorrect
        } else {
            document.getElementById('restart-screen').classList.add('show'); // Show the restart screen
        }
    }
}
