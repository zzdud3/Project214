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
    let incorrectQuestionIndex = userProgress.incorrectQuestions.findIndex(q => q.question === question);
    if (incorrectQuestionIndex !== -1) {
        showScreen(userProgress.incorrectQuestions[incorrectQuestionIndex].question);
    }
}

// Handle incorrect path with chance to return
function checkWrongAnswer(question, isCorrect) {
    const incorrectQuestionIndex = userProgress.incorrectQuestions.findIndex(q => q.question === question);
    
    if (isCorrect) {
        // Mark this question as answered correctly
        userProgress.incorrectQuestions[incorrectQuestionIndex].answeredCorrectly = true;
        
        // Check if all incorrect questions have been answered correctly
        if (userProgress.incorrectQuestions.every(q => q.answeredCorrectly)) {
            // If all incorrect questions have been answered correctly, go back to the main path
            if (question === "question-wrong1") {
                showScreen("question1");
            } else if (question === "question-wrong2") {
                showScreen("question2");
            } else if (question === "question-wrong3") {
                showScreen("question2");
            }
        }
    } else {
        // If not all incorrect questions have been answered correctly, keep prompting incorrect questions
        if (userProgress.incorrectQuestions.some(q => !q.answeredCorrectly)) {
            // Show the current question again until answered correctly
            showScreen(question);
        } else {
            // If all questions were answered incorrectly, show the restart screen
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
