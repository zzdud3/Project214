// Store the questions for Path A and Path B
const questionsPathA = [
  { question: "Who are you?", options: ["Arianna OTJ", "Mini Minaj", "MuscleMami", "Justin Bieber's wife"], correct: 0 },
  { question: "What resides between your nose and chin?", options: ["Tulips", "Lipstick", "Nose ring", "Chin dimple"], correct: 0, type: "freeResponse" },
  { question: "What is my type?", options: ["Athletic", "Creative", "Bookish", "Muscular"], correct: 1 },
];

const questionsPathB = [
  { question: "What was my Roman Empire?", options: ["RG3's downfall", "Eagles superbowl win", "Getting old", "Life of a rockstar"], correct: 1 },
  { question: "What was the first set of flowers I got you?", options: ["Lilies", "Tulips", "Carnations", "Daisies"], correct: 2 },
  { question: "Why did the tomato turn red?", options: ["It was ketchup to its friend", "Because it was a little shady", "Because it saw the salad dressing", "It was hot"], correct: 2 },
];

let currentPathAIndex = 0;
let currentPathBIndex = 0;

// Show the welcome screen initially
document.getElementById('welcome-screen').classList.remove('hidden');

// Start quiz function
function startQuiz() {
  document.getElementById('welcome-screen').classList.add('hidden');
  showQuestionPathA();
}

// Show a question from Path A
function showQuestionPathA() {
  if (currentPathAIndex < questionsPathA.length) {
    const currentQuestion = questionsPathA[currentPathAIndex];
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
      <h2>${currentQuestion.question}</h2>
      ${currentQuestion.options.map((option, index) => 
        `<button onclick="checkAnswerPathA(${index})">${option}</button>`
      ).join('')}
    `;
    document.getElementById('question-container').classList.remove('hidden');
  } else {
    // No more Path A questions, proceed to Valentine question
    showValentineQuestion();
  }
}

// Check the answer for Path A
function checkAnswerPathA(selectedIndex) {
  const currentQuestion = questionsPathA[currentPathAIndex];
  if (selectedIndex === currentQuestion.correct) {
    currentPathAIndex++;
    showQuestionPathA(); // Show next Path A question
  } else {
    // Incorrect answer in Path A, go to Path B
    currentPathBIndex = 0; // Reset Path B index
    showQuestionPathB();
  }
}

// Show a question from Path B
function showQuestionPathB() {
  if (currentPathBIndex < questionsPathB.length) {
    const currentQuestion = questionsPathB[currentPathBIndex];
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
      <h2>${currentQuestion.question}</h2>
      ${currentQuestion.options.map((option, index) => 
        `<button onclick="checkAnswerPathB(${index})">${option}</button>`
      ).join('')}
    `;
    document.getElementById('question-container').classList.remove('hidden');
  } else {
    // All questions in Path B are answered incorrectly, restart the quiz
    restartQuiz();
  }
}

// Check the answer for Path B
function checkAnswerPathB(selectedIndex) {
  const currentQuestion = questionsPathB[currentPathBIndex];
  if (selectedIndex === currentQuestion.correct) {
    currentPathBIndex++;
    if (currentPathBIndex < questionsPathB.length) {
      showQuestionPathB(); // Show next Path B question
    } else {
      // After Path B, return to Path A if any questions remain
      currentPathAIndex++;
      if (currentPathAIndex < questionsPathA.length) {
        showQuestionPathA();
      } else {
        showValentineQuestion(); // End of quiz
      }
    }
  } else {
    currentPathBIndex++;
    if (currentPathBIndex < questionsPathB.length) {
      showQuestionPathB(); // Show next question in Path B
    } else {
      // If all questions in Path B have been answered incorrectly, restart
      restartQuiz();
    }
  }
}

// Valentine question (end of quiz path)
function showValentineQuestion() {
  const valentineScreen = document.getElementById('valentine');
  valentineScreen.classList.remove('hidden');
}

// Handle the 'Yes' or 'No' answer to the Valentine question
function handleValentineResponse(response) {
  if (response === 'yes') {
    showDateSelection();
  } else {
    restartQuiz();
  }
}

// Show the date selection page
function showDateSelection() {
  const dateSelectionScreen = document.getElementById('
