// Move the toggleGridClass and removeGridClass functions outside of the makeChoice function
function toggleGridClass() {
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.classList.toggle("grid-cols-3");
}

function removeGridClass() {
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.classList.remove("grid-cols-3");
}


// Get the player's name from the query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const playerName = urlParams.get('name');

// Set the player's name as the content of the playerName element
document.getElementById("playerName").innerText = playerName;

// Initialize scores
let playerScore = 0;
let computerScore = 0;
document.getElementById("player-score").innerText = playerScore;
document.getElementById("computer-score").innerText = computerScore;

function makeChoice(playerChoice, element) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    document.querySelectorAll('img').forEach(img => img.onclick = null);

    element.style.animation = "scaleUp 0.5s linear";
    element.style.transform = "scale(1.5)";

    setTimeout(() => {
        document.querySelectorAll('img').forEach(img => {
            if (img !== element) {
                img.style.display = "none";
            }
        });

        // Hide other choices and remove grid class
        document.querySelectorAll('img').forEach(img => {
            if (img !== element) {
                img.style.display = "none";
            }
        });
        removeGridClass();


        // Show the computer's choice with animation
        const computerChoiceContainer = document.getElementById("computer-choice");
        const computerChoiceImg = document.getElementById("computer-choice-img");
        computerChoiceImg.src = "images/" + computerChoice + ".png";
        computerChoiceImg.alt = computerChoice;
        computerChoiceContainer.style.display = "block"; // Show computer's choice container
        computerChoiceImg.style.display = "block"
        computerChoiceImg.style.opacity = "1"; // Set opacity to 1 to make it visible
        computerChoiceImg.style.animation = "fadeIn 0.5s linear"; // Apply fadeIn animation

        let result;
        if (playerChoice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = "You win!";
            playerScore++; // Increase player's score
        } else {
            result = "You lose!";
            computerScore++; // Increase computer's score
        }

        document.getElementById("result-text").innerText = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;



        // Update the scores
        document.getElementById("player-score").innerText = playerScore;
        document.getElementById("computer-score").innerText = computerScore;

        // Check if the game is over (either player or computer reaches 5 points)
        if (playerScore === 5 || computerScore === 5) {
            // Display the winner
            const winnerText = playerScore === 5 ? "You win the game!" : "Computer wins the game!";
            document.getElementById("result-text").innerText = winnerText;

            // Hide the play again button and show a new game button
            document.getElementById("play-again-button").classList.add("hidden");
            document.getElementById("new-game-button").classList.remove("hidden");
        } else {
            document.getElementById("play-again-text").innerText = "Do you want to play again?";
            document.getElementById("play-again-button").classList.remove("hidden");
        }
    }, 500);
}

function playAgain() {

    // Show all choices and add grid class
    document.querySelectorAll('img').forEach(img => {
        img.style.display = "block";
    });
    toggleGridClass();
    document.querySelectorAll('img').forEach(img => {
        img.style.display = "block";
        img.style.animation = "";
        img.style.transform = "scale(1)";
        img.onclick = function () {
            makeChoice(img.alt.toLowerCase(), this);
        };
    });

    // Hide computer's choice and reset opacity
    const computerChoiceContainer = document.getElementById("computer-choice");
    const computerChoiceImg = document.getElementById("computer-choice-img");
    computerChoiceImg.style.opacity = "0"; // Set opacity to 0 to reset
    computerChoiceContainer.style.display = "none"; // Hide computer's choice container


    document.getElementById("result-text").innerText = "";
    document.getElementById("play-again-text").innerText = "";
    document.getElementById("play-again-button").classList.add("hidden");
}

function newGame() {
    // Reset the scores and display the play again button
    playerScore = 0;
    computerScore = 0;
    document.getElementById("player-score").innerText = playerScore;
    document.getElementById("computer-score").innerText = computerScore;
    document.getElementById("play-again-text").innerText = "Do you want to play again?";
    document.getElementById("play-again-button").classList.remove("hidden");
    document.getElementById("new-game-button").classList.add("hidden");
}



function finishGame() {
    // Redirect back to the home screen (index.html)
    window.location.href = "index.html";
}