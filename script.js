let currentScreen = 'welcome-screen';
let incorrectAnswersCount = 0;
let remainingWrongQuestions = ['question-wrong1', 'question-wrong2', 'question-wrong3'];

function startQuiz() {
    // Hide the welcome screen and show the first question
    document.getElementById('welcome-screen').classList.add('hidden');
    showScreen('question1');
}

function showScreen(screenId) {
    // Hide the current screen
    document.getElementById(currentScreen).classList.add('hidden');
    // Show the new screen
    document.getElementById(screenId).classList.remove('hidden');
    // Update the current screen
    currentScreen = screenId;
}

function checkAnswer(questionId, isCorrect) {
    if (isCorrect) {
        // If correct, go to the next question
        if (questionId === 'question1') {
            showScreen('question-wrong1');
        }
    } else {
        // Incorrect answer, go to the wrong question path
        if (questionId === 'question1') {
            showScreen('question-wrong1');
        }
    }
}

function checkWrongAnswer(questionId, isCorrect) {
    if (isCorrect) {
        // Remove the answered incorrect question from the list
        remainingWrongQuestions = remainingWrongQuestions.filter(q => q !== questionId);
        
        if (remainingWrongQuestions.length > 0) {
            // Proceed to the next unanswered incorrect question
            showScreen(remainingWrongQuestions[0]);
        } else {
            // All incorrect questions have been attempted, show the Valentine question
            showScreen('valentine');
        }
    } else {
        // Incorrect answer to an incorrect question will trigger the restart screen
        showScreen('incorrect-final');
    }
}

function goToDateSelection() {
    // Proceed to date selection after the correct answer to the Valentine question
    showScreen('date-selection');
}

function sendEmail() {
    // Handle email sending after date selection (currently triggers the final screen)
    const dateTime = document.getElementById('date-time').value;
    alert('Date and time confirmed: ' + dateTime);
    showScreen('thank-you');
}

function wrongAnswerPath() {
    // Treat "No" as an incorrect answer and trigger restart or proceed with incorrect path
    showScreen('incorrect-final');
}

function restartQuiz() {
    // Restart the quiz by showing the welcome screen again
    incorrectAnswersCount = 0; // Reset incorrect answer count
    remainingWrongQuestions = ['question-wrong1', 'question-wrong2', 'question-wrong3']; // Reset remaining wrong questions
    showScreen('welcome-screen');
}

// Adjusted function for handling correct answers in the incorrect path
function handleCorrectInIncorrectPath() {
    if (remainingWrongQuestions.length > 0) {
        // If an incorrect question was answered correctly, go to the second question in the correct path
        showScreen('question1');
    } else {
        // Proceed to Valentine question after answering all incorrect questions
        showScreen('valentine');
    }
}
