let currentPath = 'A'; // Track which path (A or B) we are on

function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
}

function checkAnswer(questionId, isCorrect) {
    if (isCorrect) {
        proceedCorrectAnswer(questionId);
    } else {
        proceedIncorrectAnswer(questionId);
    }
}

function proceedCorrectAnswer(questionId) {
    if (questionId === 'question1') {
        // Correct answer for question 1 (Path A)
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    } else if (questionId === 'question2') {
        // Correct answer for question 2 (Path A)
        document.getElementById('question2').classList.add('hidden');
        document.getElementById('question3').classList.remove('hidden');
    } else if (questionId === 'question3') {
        // Correct answer for question 3 (Path A)
        document.getElementById('question3').classList.add('hidden');
        document.getElementById('valentine').classList.remove('hidden');
    } else if (questionId === 'question-b1') {
        // Path B first question correct, go to second question in Path A
        document.getElementById('question-b1').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    } else if (questionId === 'question-b2') {
        // Path B second question correct, go to second question in Path A
        document.getElementById('question-b2').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    } else if (questionId === 'question-b3') {
        // Path B third question correct, go to third question in Path A
        document.getElementById('question-b3').classList.add('hidden');
        document.getElementById('question3').classList.remove('hidden');
    }
}

function proceedIncorrectAnswer(questionId) {
    if (questionId === 'question1') {
        // Incorrect answer for question 1 (Path A), go to Path B first question
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question-b1').classList.remove('hidden');
    } else if (questionId === 'question-b1') {
        // Path B first question incorrect, go to Path B second question
        document.getElementById('question-b1').classList.add('hidden');
        document.getElementById('question-b2').classList.remove('hidden');
    } else if (questionId === 'question-b2') {
        // Path B second question incorrect, go to Path B third question
        document.getElementById('question-b2').classList.add('hidden');
        document.getElementById('question-b3').classList.remove('hidden');
    } else if (questionId === 'question-b3') {
        // Path B third question incorrect, restart the quiz
        document.getElementById('question-b3').classList.add('hidden');
        document.getElementById('restart').classList.remove('hidden');
    }
}

function goToDateSelection() {
    document.getElementById('valentine').classList.add('hidden');
    document.getElementById('date-selection').classList.remove('hidden');
}

function sendEmail() {
    alert('Email sent!'); // Simulate email sending
    document.getElementById('date-selection').classList.add('hidden');
    document.getElementById('thank-you').classList.remove('hidden');
}

function restartQuiz() {
    document.getElementById('restart').classList.add('hidden');
    document.getElementById('thank-you').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
}
