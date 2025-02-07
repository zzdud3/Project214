// Track which question the user has reached in the correct and incorrect paths
let userProgress = {
    currentQuestion: "question1", // Start at the first question in the correct path
    correctAnswers: [], // Store the correct answers the user has given
    incorrectAnswers: [] // Track the incorrect answers
};

// Function to start the quiz from the welcome screen
function startQuiz() {
    showScreen('question1');
    correctAudio.play();
    correctAudio.loop = true;
}

// Function to show or hide screens
function showScreen(screenId) {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.add('hidden');
    });
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.remove('hidden');
    }
}

// Check answers in the correct question bank
function checkAnswer(question, answer) {
    if (answer === 'correct') {
        userProgress.correctAnswers.push(question); // Track the correct answer
        if (question === "question1") {
            showScreen('question2');
        } else if (question === "question2") {
            showScreen('valentine');
        } else if (question === "valentine") {
            showScreen('date-selection');
        }
    } else {
        userProgress.incorrectAnswers.push(question); // Track the incorrect answer
        showIncorrectPath(question);
    }
}

// Handle incorrect answers in the correct question path
function showIncorrectPath(question) {
    correctAudio.pause();
    incorrectAudio.play();
    showScreen('question-wrong1');
    userProgress.currentQuestion = question; // Track the current question in the incorrect path
}

// Handle incorrect questions and allow returning to correct questions on correct answers
function checkWrongAnswer(question, isCorrect) {
    if (isCorrect) {
        switch (question) {
            case "question1":
                showScreen('question1');
                break;
            case "question2":
                showScreen('question2');
                break;
            case "question3":
                showScreen('valentine');
                break;
        }
        userProgress.correctAnswers.push(question); // Track as correct
        incorrectAudio.pause();
        correctAudio.play();
        correctAudio.loop = true;
    } else {
        incorrectAudio.pause();
        incorrectAudio.play();
        showScreen('incorrect-final');
    }
}

// Flower answer (specific to question 2)
function checkFlowerAnswer() {
    const answer = document.getElementById("flower-answer").value.trim().toLowerCase();
    if (answer === 'tulips') { // Correct answer
        checkAnswer('question2', 'correct'); // Return to the correct question bank
    } else {
        checkAnswer('question2', 'wrong'); // Incorrect answer leads to the incorrect path
    }
}

// Handle incorrect final page and restart
function restartQuiz() {
    userProgress = { // Reset user progress when restarting
        currentQuestion: "question1",
        correctAnswers: [],
        incorrectAnswers: []
    };
    showScreen('welcome-screen');
    incorrectAudio.pause();
    correctAudio.play();
    correctAudio.loop = true;
}

// Final screen after successful date selection
function sendEmail() {
    const dateTime = document.getElementById("date-time").value;
    // Implement email sending logic here
    alert("Date and time confirmed: " + dateTime);
}

// Incorrect question screens and flow
function showIncorrectQuestion(question) {
    if (question === "question-wrong1") {
        showScreen('question-wrong1');
    } else if (question === "question-wrong2") {
        showScreen('question-wrong2');
    } else if (question === "question-wrong3") {
        showScreen('question-wrong3');
    }
}

// Handle the restart button from the incorrect final page
function restartFromIncorrect() {
    showScreen('welcome-screen');
    incorrectAudio.pause();
    correctAudio.play();
    correctAudio.loop = true;
}

// Example of how to structure the HTML question screens
function generateQuestionScreen(questionId, questionText, answers) {
    return `
    <div id="${questionId}" class="screen hidden">
        <h2>${questionText}</h2>
        ${answers.map(answer => `
            <button onclick="checkAnswer('${questionId}', '${answer.correct ? 'correct' : 'wrong'}')">${answer.text}</button>
        `).join('')}
    </div>`;
}
