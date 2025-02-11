let currentQuestionIndex = 0;
let currentPath = "A";  // Tracks which path we're on

const questionsPathA = [
    { 
        question: "Who are you?", 
        correctAnswer: "Arianna OTJ", 
        options: ["Arianna OTJ", "Mini Minaj", "MuscleMami", "Justin Bieber's wife"] 
    },
    { 
        question: "What resides between your nose and chin?", 
        correctAnswer: "tulips", 
        type: "text"
    },
    { 
        question: "What is my type?", 
        correctAnswer: "Introverted", 
        options: ["Introverted", "Extroverted", "Ambivert", "Maverick"] 
    }
];

const questionsPathB = [
    { 
        question: "What was my Roman Empire?", 
        correctAnswer: "Eagles superbowl win", 
        options: ["RG3's downfall", "Eagles superbowl win", "Getting old"] 
    },
    { 
        question: "What was the first set of flowers I got you?", 
        correctAnswer: "Tulips", 
        options: ["Lilies", "Tulips", "Carnations"]
    },
    { 
        question: "Why did the tomato turn red?", 
        correctAnswer: "Because it saw the salad dressing", 
        options: ["It was ketchup to its friend", "Because it was a little shady", "Because it saw the salad dressing"]
    }
];

function startQuiz() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('question1').style.display = 'block';
}

function checkAnswer(questionId, selectedAnswer) {
    const question = getCurrentQuestion();
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
        document.getElementById('question' + (currentQuestionIndex + 1)).style.display = 'block';
    } else {
        document.getElementById('thank-you').style.display = 'block';
    }
}

function handleIncorrectAnswer() {
    currentPath = "B";
    currentQuestionIndex = 0;
    document.getElementById('restart-screen').style.display = 'block';
}

function getCurrentQuestion() {
    return currentPath === "A" ? questionsPathA[currentQuestionIndex] : questionsPathB[currentQuestionIndex];
}
