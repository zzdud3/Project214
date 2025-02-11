// Initialize YouTube player
const youtubePlayer = document.getElementById('youtube-player');

function loadYouTubePlayer() {
    youtubePlayer.src = "https://www.youtube.com/embed/YOUR_PLAYLIST_ID?autoplay=1&playlist=YOUR_PLAYLIST_ID&loop=1";
}

// Start the quiz
function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
    loadYouTubePlayer();
}

// Check answer for correct path
function checkAnswer(questionId, isCorrect) {
    if (isCorrect) {
        proceedToNextScreen(questionId);
    } else {
        showIncorrectQuestion(questionId);
    }
}

// Proceed to the next screen in the correct path
function proceedToNextScreen(questionId) {
    if (questionId === 'question1') {
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('valentine').classList.remove('hidden');
    }
}

// Show the incorrect question path
function showIncorrectQuestion(questionId) {
    if (questionId === 'question1') {
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question-wrong1').classList.remove('hidden');
    }
}

// Check answer for incorrect questions
function checkWrongAnswer(questionId, isCorrect) {
    if (isCorrect) {
        proceedToNextScreenFromWrongPath(questionId);
    } else {
        restartQuiz();
    }
}

// Proceed to the next screen after answering wrong questions
function proceedToNextScreenFromWrongPath(questionId) {
    if (questionId === 'question-wrong1') {
        document.getElementById('question-wrong1').classList.add('hidden');
        document.getElementById('question-wrong2').classList.remove('hidden');
    }
}

// Go to the date selection after "Will you be my Valentine?"
function goToDateSelection() {
    document.getElementById('valentine').classList.add('hidden');
    document.getElementById('date-selection').classList.remove('hidden');
}

// Send email with selected date and time
function sendEmail() {
    const dateTime = document.getElementById('date-time').value;

    if (dateTime) {
        alert("Thank you for confirming! Your response has been sent.");
        document.getElementById('date-selection').classList.add('hidden');
        document.getElementById('thank-you').classList.remove('hidden');

        // Simulate email submission (you will need a server-side service to handle this)
        console.log("Sending email with date and time: " + dateTime);
    } else {
        alert("Please select a date and time.");
    }
}

// Restart the quiz
function restartQuiz() {
    document.getElementById('incorrect-final').classList.add('hidden');
    document.getElementById('thank-you').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
    youtubePlayer.src = ""; // Stop YouTube playlist
}
