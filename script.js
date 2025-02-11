const pathA = [
    { question: "Who are you?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: "Option 1" },
    { question: "What resides between your nose and chin?", type: "free-response", correct: "tulips" },
    { question: "What is my type?", options: ["Introverted", "Extroverted", "Ambivert", "Maverick"], correct: "Introverted" }
];

const pathB = [
    { question: "What was my Roman Empire?", options: ["Eagles superbowl win", "RG3's downfall", "Getting old"], correct: "Eagles superbowl win" },
    { question: "What was the first set of flowers I got you?", options: ["Tulips", "Lilies", "Carnations"], correct: "Tulips" },
    { question: "Why did the tomato turn red?", options: ["Because it saw the salad dressing", "It was ketchup to its friend", "Because it was a little shady"], correct: "Because it saw the salad dressing" }
];

let currentPath = "A";
let pathAIndex = 0;
let pathBIndex = 0;
let usedPathBQuestions = new Set();

function startQuiz() {
    document.getElementById("welcome-screen").classList.remove("active");
    document.getElementById("quiz-container").classList.add("active");
    pathAIndex = 0;
    pathBIndex = 0;
    usedPathBQuestions.clear();
    currentPath = "A";
    showQuestion();
}

function showQuestion() {
    let questionData = currentPath === "A" ? pathA[pathAIndex] : pathB[pathBIndex];

    if (!questionData) {
        document.getElementById("restart-screen").classList.add("active");
        document.getElementById("quiz-container").classList.remove("active");
        return;
    }

    document.getElementById("question-text").innerText = questionData.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    if (questionData.type === "free-response") {
        document.getElementById("free-response").style.display = "block";
        document.getElementById("submit-answer").style.display = "block";
    } else {
        document.getElementById("free-response").style.display = "none";
        document.getElementById("submit-answer").style.display = "none";

        questionData.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => checkAnswer(option, questionData.correct);
            optionsContainer.appendChild(button);
        });
    }
}

function checkAnswer(selected, correct) {
    if (selected.toLowerCase() === correct.toLowerCase()) {
        if (currentPath === "A") {
            pathAIndex++;
            if (pathAIndex >= pathA.length) {
                document.getElementById("date-selection-screen").classList.add("active");
                document.getElementById("quiz-container").classList.remove("active");
                return;
            }
        } else {
            pathAIndex++;
            currentPath = "A";
        }
    } else {
        if (currentPath === "A") {
            if (pathBIndex < pathB.length) {
                currentPath = "B";
            } else {
                document.getElementById("restart-screen").classList.add("active");
                return;
            }
        } else {
            pathBIndex++;
        }
    }
    showQuestion();
}

function proceedToPreferences() {
    document.getElementById("date-selection-screen").classList.remove("active");
    document.getElementById("preferences-screen").classList.add("active");
}
