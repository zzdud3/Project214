let currentPath = 'A'; // Track which path (A or B) we are on

// Start Quiz: Show question 1 and hide the welcome screen
function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
}

// Check Answer: Determines if the answer is correct or not and proceeds accordingly
function checkAnswer(questionId, isCorrect) {
    if (isCorrect) {
        proceedCorrectAnswer(questionId);
    } else {
        proceedIncorrectAnswer(questionId);
    }
}

// Handles progression for correct answers
function proceedCorrectAnswer(questionId) {
    if (questionId === 'question1') {
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    } else if (questionId === 'question2') {
        document.getElementById('question2').classList.add('hidden');
        document.getElementById('question3').classList.remove('hidden');
    } else if (questionId === 'question3') {
        document.getElementById('question3').classList.add('hidden');
        document.getElementById('valentine').classList.remove('hidden');
    } else if (questionId === 'question-b1') {
        document.getElementById('question-b1').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    } else if (questionId === 'question-b2') {
        document.getElementById('question-b2').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    } else if (questionId === 'question-b3') {
        document.getElementById('question-b3').classList.add('hidden');
        document.getElementById('question3').classList.remove('hidden');
    }
}

// Handles progression for incorrect answers
function proceedIncorrectAnswer(questionId) {
    if (questionId === 'question1') {
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question-b1').classList.remove('hidden');
    } else if (questionId === 'question-b1') {
        document.getElementById('question-b1').classList.add('hidden');
        document.getElementById('question-b2').classList.remove('hidden');
    } else if (questionId === 'question-b2') {
        document.getElementById('question-b2').classList.add('hidden');
        document.getElementById('question-b3').classList.remove('hidden');
    } else if (questionId === 'question-b3') {
        document.getElementById('question-b3').classList.add('hidden');
        document.getElementById('restart').classList.remove('hidden');
    }
}

// Valentine Question: Move to date selection page if "Yes" is clicked
function goToDateSelection() {
    document.getElementById('valentine').classList.add('hidden');
    document.getElementById('date-selection').classList.remove('hidden');
}

// Simulate sending an email upon confirmation of date & time
function sendEmail() {
    alert('Email sent!');
    document.getElementById('date-selection').classList.add('hidden');
    document.getElementById('thank-you').classList.remove('hidden');
}

// Restart the entire quiz and show the welcome screen
function restartQuiz() {
    document.getElementById('restart').classList.add('hidden');
    document.getElementById('thank-you').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
}
