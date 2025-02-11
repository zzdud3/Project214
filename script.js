let currentQuestionIndex = 0;
let pathBIndex = 0;
let selectedDate = '';
let cuisineAnswer = '';
let activityAnswer = '';
let whenAnswer = '';

const questionsPathA = [
    { id: 'question1', correct: 'Option 2', next: 'question2' },
    { id: 'question2', correct: 'tulips', next: 'question3' },
    { id: 'question3', correct: 'Introverted', next: 'valentines-question' }
];

const questionsPathB = [
    { id: 'question4', correct: 'Eagles superbowl win', next: 'question2' },
    { id: 'question5', correct: 'Tulips', next: 'question3' },
    { id: 'question6', correct: 'Because it saw the salad dressing', next: 'question1' }
];

let pathBAnswered = new Set(); // Keeps track of answered Path B questions

function startQuiz() {
    hideAllScreens();
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById(questionsPathA[0].id).classList.remove('hidden');
    currentQuestionIndex = 0;
    pathBIndex = 0;
    pathBAnswered.clear();
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
}

function answerQuestion(questionId, selectedAnswer) {
    const currentQuestion = questionsPathA.find(q => q.id === questionId);
    if (currentQuestion) {
        if (selectedAnswer.toLowerCase() === currentQuestion.correct.toLowerCase()) {
            showNextQuestion(currentQuestion.next);
        } else {
            showNextPathBQuestion();
        }
    }
}

function checkAnswer(questionId, selectedAnswer) {
    const currentQuestion = questionsPathB.find(q => q.id === questionId);
    if (currentQuestion) {
        if (selectedAnswer.toLowerCase() === currentQuestion.correct.toLowerCase()) {
            showNextQuestion(currentQuestion.next);
        } else {
            pathBAnswered.add(questionId);
            showNextPathBQuestion();
        }
    }
}

function showNextPathBQuestion() {
    hideAllScreens();

    // Check if all Path B questions have been attempted
    if (pathBAnswered.size >= questionsPathB.length) {
        showRestartScreen();
        return;
    }

    // Find next unanswered Path B question
    while (pathBIndex < questionsPathB.length) {
        let nextQuestion = questionsPathB[pathBIndex];
        pathBIndex++;
        if (!pathBAnswered.has(nextQuestion.id)) {
            document.getElementById(nextQuestion.id).classList.remove('hidden');
            return;
        }
    }

    showRestartScreen();
}

function showNextQuestion(nextQuestionId) {
    hideAllScreens();
    if (nextQuestionId === 'valentines-question') {
        document.getElementById(nextQuestionId).classList.remove('hidden');
    } else {
        document.getElementById(nextQuestionId).classList.remove('hidden');
    }
}

function handleValentinesAnswer(answer) {
    if (answer === 'Yes') {
        showDateAndTimePage();
    } else {
        showRestartScreen();
    }
}

function showDateAndTimePage() {
    hideAllScreens();
    document.getElementById('date-time-selection').classList.remove('hidden');
}

function showCuisinePage() {
    selectedDate = document.getElementById('datetime').value;
    hideAllScreens();
    document.getElementById('cuisine').classList.remove('hidden');
}

function answerCuisine(answer) {
    cuisineAnswer = answer;
    showActivityPage();
}

function showActivityPage() {
    hideAllScreens();
    document.getElementById('activity').classList.remove('hidden');
}

function answerActivity(answer) {
    activityAnswer = answer;
    showWhenPage();
}

function showWhenPage() {
    hideAllScreens();
    document.getElementById('when').classList.remove('hidden');
}

function captureWhen() {
    whenAnswer = document.getElementById('when-time').value;
    submitAnswers();
}

function submitAnswers() {
    const emailContent = `
        Cuisine: ${cuisineAnswer}
        Activity: ${activityAnswer}
        When: ${whenAnswer}
        Date Selected: ${selectedDate}
    `;
    
    sendEmail(emailContent);
    showThankYouScreen();
}

function sendEmail(content) {
    const email = "youremail@example.com"; 
    const subject = "Quiz Responses";
    const body = encodeURIComponent(content);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

function showThankYouScreen() {
    hideAllScreens();
    document.getElementById('thank-you').classList.remove('hidden');
}

function showRestartScreen() {
    hideAllScreens();
    document.getElementById('restart-screen').classList.remove('hidden');
}
