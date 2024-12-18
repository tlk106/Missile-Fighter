// Import score and lives from the game module
import { score, lives } from './game.js';

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

// Function to update the score display
const updateScore = () => {
  const scoreLabel = document.getElementById("score_label");
  if (scoreLabel) {
    scoreLabel.innerHTML = `Score: ${score}`; // Display current score
  }
};

// Function to update the lives display
const updateLives = () => {
  const lives_label = document.getElementById("lives_label");
  if (lives_label) {
    lives_label.innerHTML = `Lives: ${lives}`; // Display current lives
  }
};

// Function to start the game and update UI elements
const play = () => {
  hideOrShowElementByID("menu-container"); // Toggle menu visibility
  hideOrShowElementByID("game-area"); // Toggle game area visibility
  setInterval(updateScore, 100); // Update score every 100 ms
  setInterval(updateLives, 100); // Update lives every 100 ms
};

// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  showElementByID("menu-container"); // Show menu
  hideElementByID("game-area"); // Hide game area initially
  
  const playButton = document.getElementById("play-button");
  if (playButton) {
    playButton.addEventListener("click", play); // Start the game
  }
});