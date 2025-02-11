let currentQuestion = 1;
let pathBAnsweredIncorrectly = false;
let pathBQuestionsAnswered = { question4: false, question5: false, question6: false };
let cuisineAnswer = '';
let activityAnswer = '';
let whenAnswer = '';
let selectedDate = '';

// Start the quiz
function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
}

// Process answer for each question
function answerQuestion(questionId, answer) {
    if (questionId === 'question1') {
        showNextQuestion('question2');
    }
}

function checkAnswer(questionId, answer) {
    let correctAnswers = {
        'question2': ['tulips'],
        'question3': ['Introverted'],
        'question4': ['Eagles superbowl win'],
        'question5': ['Tulips'],
        'question6': ['Because it saw the salad dressing']
    };

    if (correctAnswers[questionId].includes(answer.toLowerCase())) {
        if (questionId === 'question3') {
            showValentinesQuestion();
        } else if (questionId === 'question5' || questionId === 'question6') {
            showNextQuestion('question1');
        } else {
            showNextQuestion('question4');
        }
    } else {
        pathBAnsweredIncorrectly = true;
        showNextQuestion('question5');
    }
}

// Show the next question
function showNextQuestion(nextQuestionId) {
    document.querySelectorAll('.screen').forEach((screen) => {
        screen.classList.add('hidden');
    });

    // Prevent Path B questions from repeating
    if (nextQuestionId === 'question4' && !pathBQuestionsAnswered.question4) {
        document.getElementById(nextQuestionId).classList.remove('hidden');
        pathBQuestionsAnswered.question4 = true;
    } else if (nextQuestionId === 'question5' && !pathBQuestionsAnswered.question5) {
        document.getElementById(nextQuestionId).classList.remove('hidden');
        pathBQuestionsAnswered.question5 = true;
    } else if (nextQuestionId === 'question6' && !pathBQuestionsAnswered.question6) {
        document.getElementById(nextQuestionId).classList.remove('hidden');
        pathBQuestionsAnswered.question6 = true;
    } else {
        // If Path B questions have been answered, skip to the next one
        if (pathBAnsweredIncorrectly) {
            if (!pathBQuestionsAnswered.question4) {
                document.getElementById('question4').classList.remove('hidden');
            } else if (!pathBQuestionsAnswered.question5) {
                document.getElementById('question5').classList.remove('hidden');
            } else if (!pathBQuestionsAnswered.question6) {
                document.getElementById('question6').classList.remove('hidden');
            } else {
                showRestartScreen();
            }
        }
    }
}

// Show Valentine's question
function showValentinesQuestion() {
    document.getElementById('question3').classList.add('hidden');
    document.getElementById('valentines-question').classList.remove('hidden');
}

// Process the Valentine's Question answer
function handleValentinesAnswer(answer) {
    if (answer === 'Yes') {
        showDateAndTimePage();
    } else {
        showRestartScreen();
    }
}

// Show the Date and Time page
function showDateAndTimePage() {
    document.getElementById('valentines-question').classList.add('hidden');
    document.getElementById('date-time-selection').classList.remove('hidden');
}

// Show Cuisine page
function showCuisinePage() {
    selectedDate = document.getElementById('datetime').value;
    document.getElementById('date-time-selection').classList.add('hidden');
    document.getElementById('cuisine').classList.remove('hidden');
}

// Capture and store Cuisine answer
function answerCuisine(answer) {
    cuisineAnswer = answer;
    showActivityPage();
}

// Show Activity page
function showActivityPage() {
    document.getElementById('cuisine').classList.add('hidden');
    document.getElementById('activity').classList.remove('hidden');
}

// Capture and store Activity answer
function answerActivity(answer) {
    activityAnswer = answer;
    showWhenPage();
}

// Show When page
function showWhenPage() {
    document.getElementById('activity').classList.add('hidden');
    document.getElementById('when').classList.remove('hidden');
}

// Capture When date and time
function captureWhen() {
    whenAnswer = document.getElementById('when-time').value;
    submitAnswers();
}

// Submit the answers and send an email
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

// Send email (Replace with your email sending service)
function sendEmail(content) {
    const email = "youremail@example.com"; // Replace with your email
    const subject = "Quiz Responses";
    const body = encodeURIComponent(content);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

// Show Thank You screen
function showThankYouScreen() {
    document.getElementById('thank-you').classList.remove('hidden');
    document.getElementById('when').classList.add('hidden');
}

// Show restart screen
function showRestartScreen() {
    document.getElementById('restart-screen').classList.remove('hidden');
    document.querySelectorAll('.screen').forEach((screen) => {
        screen.classList.add('hidden');
    });
}

// Show restart page when the user answers incorrectly in Path B
function restartQuiz() {
    pathBAnsweredIncorrectly = false;
    currentQuestion = 1;
    document.getElementById('restart-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
    resetAllQuestions();
}

// Reset questions when restarting
function resetAllQuestions() {
    document.querySelectorAll('.screen').forEach((screen) => {
        screen.classList.add('hidden');
    });
}
