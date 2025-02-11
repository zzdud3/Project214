let userProgress = {
    currentQuestion: "question1",
    correctAnswers: [],
    incorrectAnswers: []
};

// YouTube Playlist Variables
let player;
const correctPlaylistId = "YOUR_CORRECT_PLAYLIST_ID";  // Replace with your YouTube Playlist ID
const incorrectPlaylistId = "YOUR_INCORRECT_PLAYLIST_ID";  // Replace with your YouTube Playlist ID
let currentPlaylist = correctPlaylistId;

// Load YouTube API
function loadYouTubeAPI() {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        playerVars: {
            listType: "playlist",
            list: currentPlaylist,
            autoplay: 1,
            loop: 1
        },
        events: {
            onReady: (event) => event.target.playVideo()
        }
    });
}

// Switch YouTube Playlist
function switchPlaylist(playlistId) {
    if (player) {
        player.loadPlaylist({
            list: playlistId,
            listType: "playlist",
            autoplay: 1
        });
    } else {
        currentPlaylist = playlistId;
    }
}

// Show a screen and hide others
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
    document.getElementById(screenId).classList.remove("hidden");
}

// Start the quiz
function startQuiz() {
    showScreen("question1");
    switchPlaylist(correctPlaylistId);
}

// Check answers for correct path
function checkAnswer(question, isCorrect) {
    if (isCorrect) {
        if (question === "question1") {
            showScreen("question2");
        } else if (question === "question2") {
            showScreen("valentine");
        }
    } else {
        showIncorrectPath(question);
    }
}

// Handle incorrect answers and show incorrect path
function showIncorrectPath(question) {
    switchPlaylist(incorrectPlaylistId);
    if (question === "question1") {
        showScreen("question-wrong1");
    } else if (question === "question2") {
        showScreen("question-wrong2");
    }
}

// Handle incorrect path with chance to return
function checkWrongAnswer(question, isCorrect) {
    if (isCorrect) {
        if (question === "question1") {
            showScreen("question1");  // Go back to the correct question1 path
        } else if (question === "question2") {
            showScreen("question2");  // Go back to the correct question2 path
        }
        switchPlaylist(correctPlaylistId);  // Correct playlist
    } else {
        showScreen("incorrect-final");  // If still incorrect after retrying
    }
}

// Flower answer validation
function checkFlowerAnswer() {
    const answer = document.getElementById("flower-answer").value.trim().toLowerCase();
    if (answer === "tulips") {
        checkAnswer("question2", true);
    } else {
        checkAnswer("question2", false);
    }
}

// Submit Date and Time
function sendEmail() {
    const dateTime = document.getElementById("date-time").value;
    if (dateTime) {
        alert("Date and time confirmed: " + dateTime);  // Optionally handle email sending
        showScreen("thank-you");  // Show the thank you screen after confirmation
    } else {
        alert("Please select a date and time.");
    }
}

// Restart the quiz
function restartQuiz() {
    userProgress = {
        currentQuestion: "question1",
        correctAnswers: [],
        incorrectAnswers: []
    };
    showScreen("welcome-screen");
    switchPlaylist(correctPlaylistId);
}

// Load YouTube API for video/audio functionality
loadYouTubeAPI();
