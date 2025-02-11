let userProgress = {
    currentQuestion: "question1",
    correctAnswers: [],
    incorrectAnswers: [],
    incorrectQuestions: [
        { question: "question-wrong1", answeredCorrectly: false },
        { question: "question-wrong2", answeredCorrectly: false },
        { question: "question-wrong3", answeredCorrectly: false }
    ]
};

// Static YouTube Playlist ID
const youtubePlaylistId = "YOUR_PLAYLIST_ID"; // Replace with your static YouTube playlist ID

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
            list: youtubePlaylistId,
            autoplay: 1,
            loop: 1
        },
        events: {
            onReady: (event) => event.target.playVideo()
        }
    });
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
    if (question === "question1") {
        showScreen("question-wrong1");
    } else if (question === "question2") {
        showScreen("question-wrong2");
    }
}

// Handle incorrect path with chance to return
function checkWrongAnswer(question, isCorrect) {
    const incorrectQuestionIndex = userProgress.incorrectQuestions.findIndex(q => q.question === question);

    if (isCorrect) {
        // Mark this incorrect question as answered correctly
        userProgress.incorrectQuestions[incorrectQuestionIndex].answeredCorrectly = true;

        // Move to the next correct question in the correct path
        if (question === "question-wrong1") {
            showScreen("question1");
        } else if (question === "question-wrong2") {
            showScreen("question2");
        } else if (question === "question-wrong3") {
            showScreen("question2");
        }
    } else {
        // Mark this incorrect question as answered incorrectly
        userProgress.incorrectQuestions[incorrectQuestionIndex].answeredCorrectly = false;

        // Proceed through the incorrect questions until all are incorrect
        const nextIncorrectQuestion = userProgress.incorrectQuestions.find(q => q.answeredCorrectly === false);

        if (nextIncorrectQuestion) {
            // Show the next unanswered incorrect question
            showScreen(nextIncorrectQuestion.question);
        } else {
            // If all incorrect questions are exhausted, show the restart screen
            showScreen("incorrect-final");
        }
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

// Restart the quiz
function restartQuiz() {
    userProgress = {
        currentQuestion: "question1",
        correctAnswers: [],
        incorrectAnswers: [],
        incorrectQuestions: [
            { question: "question-wrong1", answeredCorrectly: false },
            { question: "question-wrong2", answeredCorrectly: false },
            { question: "question-wrong3", answeredCorrectly: false }
        ]
    };
    showScreen("welcome-screen");
}

// Valentine path
function goToDateSelection() {
    showScreen("date-selection");
}

// Send email function
function sendEmail() {
    const dateTime = document.getElementById("date-time").value;
    alert("Date and time confirmed: " + dateTime);
}

// Load YouTube API
loadYouTubeAPI();
