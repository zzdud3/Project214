document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded. Showing welcome screen...");
    showScreen("welcome-screen");

    // Wait for user interaction to play background music
    document.getElementById("welcome-screen").addEventListener("click", function () {
        playBackgroundMusic();
    });
});

function playBackgroundMusic() {
    const bgMusic = document.getElementById("bg-music");
    if (bgMusic) {
        bgMusic.src = "https://www.youtube.com/embed/CBx6e9cZlBQ?autoplay=1&loop=1&playlist=CBx6e9cZlBQ&mute=0&enablejsapi=1";
        bgMusic.allow = "autoplay; encrypted-media";
        console.log("Background music started.");
    } else {
        console.error("Background music element not found.");
    }
}

function startQuiz() {
    console.log("Starting quiz, moving to first question.");
    showScreen("question1");
}

let pathACurrent = "question1";
const pathAOrder = ["question1", "question2", "question3"];
const pathBQuestions = ["question-wrong1", "question-wrong2", "question-wrong3"];
let pathBUsed = [false, false, false];
let userSelections = { dateTime: "", cuisine: "", activity: "" };

function checkAnswer(currentQuestionId, isCorrect) {
    console.log(`checkAnswer() called for ${currentQuestionId}; isCorrect=${isCorrect}`);
    if (isCorrect) {
        advancePathA(currentQuestionId);
    } else {
        goToNextPathB();
    }
}

function checkFreeResponse(inputId) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        console.error("Input element not found:", inputId);
        return;
    }
    
    const userInput = inputElement.value.trim().toLowerCase();
    console.log(`checkFreeResponse() - user typed: ${userInput}`);
    
    if (userInput.includes("tulips")) {
        advancePathA("question2");
    } else {
        goToNextPathB();
    }
}

function advancePathA(currentQuestionId) {
    const currentIndex = pathAOrder.indexOf(currentQuestionId);
    if (currentIndex < pathAOrder.length - 1) {
        pathACurrent = pathAOrder[currentIndex + 1];
        showScreen(pathACurrent);
    } else {
        pathACurrent = "valentine";
        showScreen("valentine");
    }
}
function declineValentine() {
    console.log("User selected 'No' for Valentine's question.");
    goToNextPathB();
}
function goToNextPathB() {
    const nextIndex = pathBUsed.findIndex(used => used === false);
    if (nextIndex === -1) {
        console.log("All Path B questions answered incorrectly. Restarting quiz...");
        setTimeout(() => restartQuiz(), 3000);
    } else {
        pathBUsed[nextIndex] = true;
        showScreen(pathBQuestions[nextIndex]);
    }
}

function checkWrongAnswer(pathBQuestionId, isCorrect) {
    console.log(`checkWrongAnswer() called for ${pathBQuestionId}; isCorrect=${isCorrect}`);
    if (isCorrect) {
        showScreen(pathACurrent);
    } else {
        goToNextPathB();
    }
}

function goToDateSelection() {
    showScreen("date-selection");
}

function proceedToPreferences() {
    userSelections.dateTime = document.getElementById("date-time").value;
    if (!userSelections.dateTime) {
        alert("Please select a date and time.");
        return;
    }
    showScreen("cuisine");
}

function selectCuisine(choice) {
    userSelections.cuisine = choice;
    showScreen("activity");
}

function selectActivity(choice) {
    userSelections.activity = choice;
    sendEmail();
}

function sendEmail() {
    userSelections.dateTime = document.getElementById("date-time").value;
    
    let emailRecipient = "rehmanzaine9@gmail.com";
    let subject = "Valentine's Date Selection"; 
    let body = `Here are the selected details for our date: \n\n- **Date & Time:** ${userSelections.dateTime}\n- **Cuisine Preference:** ${userSelections.cuisine}\n- **Activity Choice:** ${userSelections.activity}\n\nLooking forward to it! 😊`;
    
    let mailtoLink = `mailto:${emailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    showScreen("thank-you");
}

function restartQuiz() {
    pathACurrent = "question1";
    pathBUsed = [false, false, false];
    userSelections = { dateTime: "", cuisine: "", activity: "" };
    showScreen("welcome-screen");
}

function showScreen(screenId) {
    console.log(`showScreen(${screenId})`);

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove("hidden");
        targetScreen.style.display = "block";
    } else {
        console.error("Screen not found:", screenId);
    }
}
