let currentPath = "A";  // Tracks which path we're on
let currentQuestionIndex = 0;

const questionsPathA = [
    { question: "Who are you?", correctAnswer: "Arianna OTJ", options: ["Arianna OTJ", "Mini Minaj", "MuscleMami", "Justin Bieber's wife"] },
    { question: "What resides between your nose and chin?", correctAnswer: "tulips", type: "text" },
    { question: "What is my type?", correctAnswer: "Introverted", options: ["Introverted", "Extroverted", "Ambivert", "Maverick"] }
];

const questionsPathB = [
    { question: "What was my Roman Empire?", correctAnswer: "Eagles superbowl win", options: ["RG3's downfall", "Eagles superbowl win", "Getting old"] },
    { question: "What was the first set of flowers I got you?", correctAnswer: "Carnations", options: ["Lilies", "Tulips", "Carnations"] },
    { question: "Why did the tomato turn red?", correctAnswer: "Because it saw the salad dressing", options: ["It was ketchup to its friend", "Because it was a little shady", "Because it saw the salad dressing"] }
];

function startQuiz() {
    document.getElementById('welcome-screen').style.display = 'none';
    showQuestion(questionsPathA[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('screen');
    questionContainer.innerHTML = `<h2>${question.question}</h2>`;
    
    if (question.type === 'text') {
        questionContainer.innerHTML += `<input type="text" id="answer-input" />`;
    } else {
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(question, option);
            questionContainer.appendChild(button);
        });
    }
    document.body.appendChild(questionContainer);
}

function checkAnswer(question, selectedAnswer) {
    const isCorrect = question.correctAnswer === selectedAnswer || (question.type === 'text' && selectedAnswer.toLowerCase().includes(question.correctAnswer.toLowerCase()));
    
    if (isCorrect) {
        proceedToNext();
    } else {
        handleIncorrectAnswer();
    }
}

function proceedToNext() {
    if (currentPath === "A" && currentQuestionIndex < questionsPathA.length - 1) {
        currentQuestionIndex++;
        showQuestion(questionsPathA[currentQuestionIndex]);
    } else if (currentPath === "B") {
        showQuestion(questionsPathA[currentQuestionIndex]);  // Proceed to the next in A
    } else {
        document.getElementById('thank-you').style.display = 'block';
    }
}

function handleIncorrectAnswer() {
    currentPath = "B";
    currentQuestionIndex = 0;
    showQuestion(questionsPathB[currentQuestionIndex]);
}
