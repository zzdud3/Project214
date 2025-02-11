// Define questions and answers for both Path A and Path B
const questionsPathA = [
    { question: "Who are you?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: "Option 1" },
    { question: "What resides between your nose and chin?", correctAnswer: "tulips", type: "freeResponse" },
    { question: "What is my type?", options: ["Introverted", "Extroverted", "Ambivert", "Maverick"], correctAnswer: "Introverted" }
];

const questionsPathB = [
    { question: "What was my Roman Empire?", options: ["Eagles superbowl win", "RG3's downfall", "Getting old"], correctAnswer: "Eagles superbowl win" },
    { question: "What was the first set of flowers I got you?", options: ["Tulips", "Lilies", "Carnations"], correctAnswer: "Tulips" },
    { question: "Why did the tomato turn red?", options: ["Because it saw the salad dressing", "It was ketchup to its friend", "Because it was a little shady"], correctAnswer: "Because it saw the salad dressing" }
];

// Track the current question indices for Path A and Path B
let currentPathAIndex = 0;
let currentPathBIndex = 0;
let answeredIncorrectlyPathB = [];

// Function to start the quiz
function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    showQuestion(1);  // Start showing the first question (Path A)
}

// Function to show the current question
function showQuestion(questionNumber) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));

    // Determine which question to show (either Path A or Path B)
    let question;
    if (questionNumber <= 3) {
        question = questionsPathA[questionNumber - 1]; // Path A questions
        document.getElementById(`question${questionNumber}`).classList.remove('hidden');
        document.querySelector(`#question${questionNumber} h2`).textContent = question.question;

        if (question.options) {
            question.options.forEach((option, index) => {
                document.querySelector(`#question${questionNumber} button:nth-child(${index + 1})`).textContent = option;
            });
        }
    } else {
        question = questionsPathB[questionNumber - 4]; // Path B questions
        document.getElementById(`question${questionNumber}`).classList.remove('hidden');
        document.querySelector(`#question${questionNumber} h2`).textContent = question.question;

        if (question.options) {
            question.options.forEach((option, index) => {
                document.querySelector(`#question${questionNumber} button:nth-child(${index + 1})`).textContent = option;
            });
        }
    }
}

// Function to check the answer
function checkAnswer(questionNumber, selectedAnswer) {
    let correctAnswer;
    let nextQuestionNumber;

    // Check Path A questions
    if (questionNumber <= 3) {
        correctAnswer = questionsPathA[questionNumber - 1].correctAnswer;
        nextQuestionNumber = questionNumber + 1;
        // For free-response question, check if answer contains correct word
        if (questionsPathA[questionNumber - 1].type === "freeResponse") {
            if (selectedAnswer.toLowerCase().includes(correctAnswer.toLowerCase())) {
                proceedToNextQuestion(nextQuestionNumber);
            } else {
                showRestartScreen();
            }
        }
        // For multiple-choice questions, check if the selected option matches the correct answer
        else if (selectedAnswer === correctAnswer) {
            proceedToNextQuestion(nextQuestionNumber);
        } else {
            showRestartScreen();
        }
    }

    // Check Path B questions
    else if (questionNumber > 3) {
        correctAnswer = questionsPathB[questionNumber - 4].correctAnswer;
        nextQuestionNumber = questionNumber + 1;

        // If the current Path B question was answered incorrectly, add it to the "answeredIncorrectlyPathB" list
        if (selectedAnswer !== correctAnswer) {
            answeredIncorrectlyPathB.push(questionNumber);
        }

        // If all Path B questions are answered incorrectly, show the restart screen
        if (answeredIncorrectlyPathB.length === 3) {
            showRestartScreen();
        } else {
            // Proceed to the next question in Path B if the answer is correct
            if (selectedAnswer === correctAnswer) {
                proceedToNextQuestion(nextQuestionNumber);
            } else {
                // Show the next question in Path B, without repeating the already attempted ones
                let nextUnansweredQuestion = getNextUnansweredQuestion();
                if (nextUnansweredQuestion !== null) {
                    showQuestion(nextUnansweredQuestion);
                } else {
                    showRestartScreen();
                }
            }
        }
    }
}

// Function to get the next unanswered question from Path B
function getNextUnansweredQuestion() {
    // Look for the next question that has not been answered incorrectly yet
    for (let i = currentPathBIndex; i < questionsPathB.length; i++) {
        if (!answeredIncorrectlyPathB.includes(i + 4)) {
            return i + 4;
        }
    }
    return null;
}

// Function to proceed to the next question
function proceedToNextQuestion(nextQuestionNumber) {
    if (nextQuestionNumber <= 3) {
        currentPathAIndex++;
        showQuestion(nextQuestionNumber);
    } else if (nextQuestionNumber <= 6) {
        currentPathBIndex++;
        showQuestion(nextQuestionNumber);
    } else {
        showThankYouScreen();
    }
}

// Function to show the Restart screen
function showRestartScreen() {
    document.getElementById('restart-screen').classList.remove('hidden');
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
}

// Function to show the Thank You screen
function showThankYouScreen() {
    document.getElementById('thank-you').classList.remove('hidden');
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
}

// Function to restart the quiz
function restartQuiz() {
    currentPathAIndex = 0;
    currentPathBIndex = 0;
    answeredIncorrectlyPathB = [];
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('restart-screen').classList.add('hidden');
    document.getElementById('thank-you').classList.add('hidden');
}
