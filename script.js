// Track user progress
let userProgress = {
    currentQuestion: "question1",
    correctAnswers: [],
    incorrectAnswers: []
};

// YouTube Player Variables
let player;
const correctPlaylistId = "YOUR_CORRECT_PLAYLIST_ID"; // Replace with your YouTube playlist ID
const incorrectPlaylistId = "YOUR_INCORRECT_PLAYLIST_ID"; // Replace with your YouTube playlist ID
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

// Switch YouTube Playlist (Resume Where Left Off)
function switchPlaylist(playlistId) {
    if (player) {
        player.loadPlaylist({
            list: playlistId,
            listType: "playlist",
            index: 0, // Start from first video
            autoplay: 1
        });
    } else {
        currentPlaylist = playlistId;
    }
}

// Function to show screens and hide others
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
    document.getElementById(screenId).classList.remove("hidden");
}

// Start Quiz
function startQuiz() {
    showScreen("question1");
    switchPlaylist(correctPlaylistId); // Play correct playlist from start
}

// Check answers for correct path
function checkAnswer(question, answer) {
    if (answer === "correct") {
        userProgress.correctAnswers.push(question);
        if (question === "question1") {
            showScreen("question2");
        } else if (question === "question2") {
            showScreen("valentine");
        }
    } else {
        showIncorrectPath(question);
    }
}

// Handle incorrect answers in the correct question path
function showIncorrectPath(question) {
    switchPlaylist(incorrectPlaylistId); // Switch to incorrect playlist
    if (question === "question1") {
        showScreen("question-wrong1");
    } else if (question === "question2") {
        showScreen("question-wrong2");
    } else if (question === "question3") {
        showScreen("question-wrong3");
    }
}

// Handle incorrect questions and allow returning to correct path
function checkWrongAnswer(question, isCorrect) {
    if (isCorrect) {
        if (question === "question1") {
            showScreen("question1");
        } else if (question === "question2") {
            showScreen("question2");
        } else if (question === "question3") {
            showScreen("valentine");
        }
        switchPlaylist(correctPlaylistId); // Resume correct playlist
    } else {
        showScreen("incorrect-final");
    }
}

// Flower answer check
function checkFlowerAnswer() {
    const answer = document.getElementById("flower-answer").value.trim().toLowerCase();
    if (answer === "tulips") {
        checkAnswer("question2", "correct");
    } else {
        checkAnswer("question2", "wrong");
    }
}

// Restart quiz function
function restartQuiz() {
    userProgress = {
        currentQuestion: "question1",
        correctAnswers: [],
        incorrectAnswers: []
    };
    showScreen("welcome-screen");
    switchPlaylist(correctPlaylistId);
}

// Send email function (date selection)
function sendEmail() {
    const dateTime = document.getElementById("date-time").value;
    alert("Date and time confirmed: " + dateTime);
}

// Load YouTube API when page loads
loadYouTubeAPI();
