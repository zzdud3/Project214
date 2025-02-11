let currentPath = 'A'; // Start path A
let currentQuestion = 1; // Start with question 1

function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
}

function checkAnswer(questionId, isCorrect) {
    if (isCorrect) {
        // Correct answer logic, proceed to next question based on path
        if (currentQuestion === 1) {
            document.getElementById('question1').classList.add('hidden');
            document.getElementById('question2').classList.remove('hidden');
            currentQuestion++;
        } else if (currentQuestion === 2) {
            document.getElementById('question2').classList.add('hidden');
            document.getElementById('question3').classList.remove('hidden');
            currentQuestion++;
        } else if (currentQuestion === 3) {
            document.getElementById('question3').classList.add('hidden');
            document.getElementById('valentine').classList.remove('hidden');
        }
    } else {
        // If the answer is incorrect, start path B logic
        if (currentPath === 'A' && currentQuestion === 1) {
            // Start path B for the first question
            document.getElementById('question1').classList.add('hidden');
            document.getElementById('question-wrong1').classList.remove('hidden');
            currentPath = 'B';
        } else {
            // Handle the logic for incorrect answers in Path B
            handlePathB();
        }
    }
}

function handlePathB() {
    if (currentPath === 'B' && currentQuestion === 1) {
        document.getElementById('question-wrong1').classList.add('hidden');
        document.getElementById('question-wrong2').classList.remove('hidden');
        currentQuestion++;
    } else if (currentPath === 'B' && currentQuestion === 2) {
        document.getElementById('question-wrong2').classList.add('hidden');
        document.getElementById('question-wrong3').classList.remove('hidden');
        currentQuestion++;
    } else if (currentPath === 'B' && currentQuestion === 3) {
        document.getElementById('question-wrong3').classList.add('hidden');
        document.getElementById('incorrect-final').classList.remove('hidden');
        currentQuestion++;
    }
}

function restartQuiz() {
    document.getElementById('thank-you').classList.add('hidden');
    document.getElementById('incorrect-final').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
    currentQuestion = 1;
    currentPath = 'A'; // Reset to Path A
}

function goToDateSelection() {
    document.getElementById('valentine').classList.add('hidden');
    document.getElementById('date-selection').classList.remove('hidden');
}

function sendEmail() {
    const dateTime = document.getElementById('date-time').value;
    alert('Date and time selected: ' + dateTime);
    // Here, you can trigger an email functionality or integration with a backend
    document.getElementById('date-selection').classList.add('hidden');
    document.getElementById('thank-you').classList.remove('hidden');
}
