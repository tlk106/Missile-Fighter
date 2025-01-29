// Import score, lives, and bulletcount from the game module
import { score, lives, bulletcount, timer, gameOver } from './game.js';

// Function to toggle visibility of an element by its ID
const hideOrShowElementByID = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    console.log(`Element with ID ${id} not found.`);
    return;
  }

  // Toggle display property
  element.style.display = (element.style.display === "none" || element.style.display === "") ? "block" : "none";
};

// Function to hide an element by its ID
const hideElementByID = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none";
  } else {
    console.log(`Element with ID ${id} not found.`);
  }
};

// Function to show an element by its ID
const showElementByID = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "block";
  } else {
    console.log(`Element with ID ${id} not found.`);
  }
};

// Function to update timer label in the game over menu
const updateGameOverTimer = () => {
  const gameOverTimerLabel = document.getElementById("game_over_timer_label");
  if (gameOverTimerLabel) {
    gameOverTimerLabel.innerHTML = `Time: ${timer}`; // Display final time
  }
}

// Function to update score label in the game over menu
const updateGameOverScore = () => {
  const gameOverScoreLabel = document.getElementById("game_over_score_label");
  if (gameOverScoreLabel) {
    gameOverScoreLabel.innerHTML = `Score: ${score}`; // Display final score
  }
}

// Function to update the score display
const updateScore = () => {
  const scoreLabel = document.getElementById("score_label");
  if (scoreLabel) {
    scoreLabel.innerHTML = `Score: ${score}`; // Display current score
  }
};

// Function to update the lives display
const updateLives = () => {
  const livesLabel = document.getElementById("lives_label");
  if (livesLabel) {
    livesLabel.innerHTML = `Lives: ${lives}`; // Display current lives
  }
};

// Function to update the timer display
const updateTimer = () => {
  const timerLabel = document.getElementById("timer_label");
  if (timerLabel) {
    timerLabel.innerHTML = `Time: ${timer}`; // Display current time
  }
};

// Function to update the bullet count display
const updateBulletCount = () => {
  const bulletCountLabel = document.getElementById("bullet_count_label");
  if (bulletCountLabel) {
    bulletCountLabel.innerHTML = `Bullets: ${bulletcount}`; // Display current bullet count

    // Change the color to yellow if bullet count is 0
    if (bulletcount === 0) {
      bulletCountLabel.style.color = "yellow";
    } else {
      bulletCountLabel.style.color = ""; // Reset to default color
    }
  }
};

// Function to start the game and update UI elements
const play = () => {
  hideOrShowElementByID("menu-container");
  hideOrShowElementByID("game-area");
  setInterval(updateScore, 100);
  setInterval(updateLives, 100);
  setInterval(updateBulletCount, 100);
  setInterval(updateTimer, 100);

  // Check for game over condition
  setInterval(() => {
    if (gameOver) {
      showGameOverMenu(); // Show game over menu
      updateGameOverScore(); // Update final score
      updateGameOverTimer(); // Update final time
    }
  }, 100); // Check every 100 ms
};

// Function to display the game over menu
const showGameOverMenu = () => {
  showElementByID("game_over-container"); // Show game over menu
  hideElementByID("game-area"); // Hide game area
};



const gameOverNextButtonReload = () => {
  location.reload();
};
 
// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  showElementByID("menu-container"); // Show menu
  hideElementByID("game-area"); // Hide game area initially
  hideElementByID("game-over-menu"); // Hide game over menu initially

  // Event listener for the reload button
  const reloadButton = document.getElementById("reload-button");
  if (reloadButton) {
    reloadButton.addEventListener("click", gameOverNextButtonReload); // Reload the page
  }

  // Event listener for the play button
  const playButton = document.getElementById("play-button");
  if (playButton) {
    playButton.addEventListener("click", play); // Start the game
  }
});