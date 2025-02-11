let currentScreen = 'welcome-screen';
let incorrectAnswersCount = 0;

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
        // Correct answer, proceed to the next screen
        if (questionId === 'question1') {
            showScreen('question2');
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
        incorrectAnswersCount = 0; // Reset count when the user answers correctly in the incorrect path
        if (questionId === 'question-wrong1') {
            showScreen('question-wrong2');
        } else if (questionId === 'question-wrong2') {
            showScreen('question-wrong3');
        } else if (questionId === 'question-wrong3') {
            showScreen('valentine'); // Move to the Valentine question after all wrong answers
        }
    } else {
        incorrectAnswersCount++;
        if (incorrectAnswersCount >= 3) {
            // Trigger restart after 3 incorrect answers
            showScreen('incorrect-final');
        } else {
            // Continue through the incorrect path
            if (questionId === 'question-wrong1') {
                showScreen('question-wrong2');
            } else if (questionId === 'question-wrong2') {
                showScreen('question-wrong3');
            }
        }
    }
}

function goToDateSelection() {
    // Proceed to date selection after the correct answer to the Valentine question
    showScreen('date-selection');
}

function sendEmail() {
    // Handle email sending after date selection
    const dateTime = document.getElementById('date-time').value;
    alert('Date and time confirmed: ' + dateTime);
    showScreen('thank-you');
}

function restartQuiz() {
    // Restart the quiz by showing the welcome screen again
    incorrectAnswersCount = 0; // Reset incorrect answer count
    showScreen('welcome-screen');
}
