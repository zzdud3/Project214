let currentPage = 0;
let answers = {
    q1: null,
    q2: null,
    q3: null,
    q4: null
};

const pages = document.querySelectorAll('.page');
const correctAnswers = {
    q1: "correct",
    q2: "correct",
    q3: "correct",
    q4: "correct"
};

const questions = ['q1', 'q2', 'q3', 'q4'];

let songPlaying = false; // Flag to track whether the music is playing

// Show the first page (welcome page)
showPage(currentPage);

// Show the next page
function nextQuestion() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

// Show page by index
function showPage(pageIndex) {
    pages.forEach((page, index) => {
        page.style.display = index === pageIndex ? 'block' : 'none';
    });

    if (pageIndex === 1 && !songPlaying) {
        playMusic("song-1"); // Start playing the first song after the welcome page
    }
}

// Submit the answer for a question
function submitAnswer(questionNumber) {
    const questionName = questions[questionNumber - 1];
    const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);

    if (selectedAnswer) {
        answers[questionName] = selectedAnswer.value;

        if (answers[questionName] === correctAnswers[questionName]) {
            // Move to next question
            if (questionNumber === 4) {
                // Stop the first song and play the second song after Question 4 is answered correctly
                stopMusic("song-1");
                playMusic("song-2");
            }
            nextQuestion();
        } else {
            alert("Wrong answer! Please try again.");
            if (questionNumber === 4) {
                // Lock the questionnaire after the final question if incorrect
                alert("Incorrect answer on Question 4! The questionnaire is now locked for 1 hour.");
                setTimeout(() => location.reload(), 3600000); // Lock for 1 hour (3600000 ms)
            }
        }
    }
}

// Play music
function playMusic(songId) {
    const iframe = document.getElementById(songId);
    if (iframe) {
        iframe.src = iframe.src.replace("autoplay=0", "autoplay=1"); // Ensure autoplay is enabled
        songPlaying = true;
    }
}

// Stop music
function stopMusic(songId) {
    const iframe = document.getElementById(songId);
    if (iframe) {
        iframe.src = iframe.src.replace("autoplay=1", "autoplay=0"); // Disable autoplay
        songPlaying = false;
    }
}

// Handle final submit
function finalSubmit() {
    const email = document.querySelector('input[name="email"]').value;
    const datetime = document.querySelector('input[name="datetime"]').value;
    const name = document.querySelector('input[name="name"]').value;

    // Send the data to your server or email handling system (email functionality)
    console.log("Email:", email);
    console.log("Datetime:", datetime);
    console.log("Name:", name);
    alert("Thank you for your submission!");

    // Optionally, you can redirect to a thank you page or further actions here
}
