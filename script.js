let currentQuestion = 0; // Track the current question
let currentPath = 'correct'; // Start on the correct path

// Function to start the quiz
function startQuiz() {
    console.log("Starting quiz...");
    document.getElementById('welcome-screen').classList.add('hidden');
    showQuestion('question1');
    playAudio('correct'); // Play background audio for the correct path
}

// Show a specific question based on its ID
function showQuestion(questionId) {
    // Hide all screens first
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));

    // Show the target question screen
    const questionScreen = document.getElementById(questionId);
    if (questionScreen) {
        questionScreen.classList.remove('hidden');
    }
}

// Function to handle the answer to a question
function checkAnswer(questionId, isCorrect) {
    const questionElement = document.getElementById(questionId);
    const correctPathScreen = document.getElementById('question2'); // Example of the next correct question screen

    if (isCorrect) {
        console.log(`Answer for ${questionId}: Correct`);
        if (questionId === 'question1') {
            showQuestion('question2');
        }
    } else {
        console.log(`Answer for ${questionId}: Incorrect`);
        showWrongPath(questionId);
    }
}

// Show the wrong path for a question
function showWrongPath(questionId) {
    console.log(`Showing incorrect path from ${questionId}`);
    const wrongPathScreens = ['question-wrong1', 'question-wrong2', 'question-wrong3'];

    for (let i = 0; i < wrongPathScreens.length; i++) {
        const wrongPathScreen = document.getElementById(wrongPathScreens[i]);
        if (!wrongPathScreen.classList.contains('hidden')) {
            wrongPathScreen.classList.add('hidden');
        }
    }

    showQuestion(wrongPathScreens[0]); // Show the first incorrect question
}

// Function to handle answering a wrong question
function checkWrongAnswer(questionId, isCorrect) {
    console.log(`Answer for ${questionId} (wrong path): ${isCorrect ? 'Correct' : 'Incorrect'}`);

    // If answered correctly, go back to the correct path
    if (isCorrect) {
        showQuestion('question2');
    } else {
        showFinalIncorrectScreen();
    }
}

// Function to show the final incorrect screen
function showFinalIncorrectScreen() {
    console.log("Showing final incorrect screen...");
    const incorrectFinalScreen = document.getElementById('incorrect-final');
    if (incorrectFinalScreen) {
        // Hide all other screens first
        const wrongPathScreens = ['question-wrong1', 'question-wrong2', 'question-wrong3'];
        wrongPathScreens.forEach(screenId => {
            const wrongScreen = document.getElementById(screenId);
            if (wrongScreen && !wrongScreen.classList.contains('hidden')) {
                wrongScreen.classList.add('hidden');
            }
        });

        // Show the final incorrect screen
        incorrectFinalScreen.classList.remove('hidden');
    } else {
        console.error("Element with id 'incorrect-final' not found.");
    }
}

// Function to handle the "Will you be my Valentine" question
function goToDateSelection() {
    showQuestion('date-selection');
    console.log("Proceeding to date selection...");
}

// Function to send the date/time submission to a pre-configured email
function sendEmail() {
    const dateTime = document.getElementById('date-time').value;
    if (dateTime) {
        console.log(`Sending email with date and time: ${dateTime}`);
        // Simulate sending an email (you can integrate an actual API here)
        alert("Thank you for submitting! The date and time have been recorded.");
        showQuestion('thank-you');
    } else {
        alert("Please select a date and time before submitting.");
    }
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    currentPath = 'correct'; // Start back on the correct path
    document.getElementById('thank-you').classList.add('hidden');
    showQuestion('welcome-screen');
}

// Play audio based on the path (correct or incorrect)
function playAudio(path) {
    const audioElement = new Audio(path === 'correct' ? 'correct-audio.mp3' : 'incorrect-audio.mp3');
    audioElement.play();
}

// This will be triggered when the page is loaded to initialize the YouTube player
window.onload = function() {
    const youtubePlayer = document.getElementById('youtube-player');
    youtubePlayer.src = "https://www.youtube.com/embed/YOUR_PLAYLIST_ID?autoplay=1&playlist=YOUR_PLAYLIST_ID&loop=1";
};
