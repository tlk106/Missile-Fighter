// Import functions and variables from the game module
import { updatePlayerPosition, handleKeyPress, updateBullets, bullets, updateMissiles, missiles } from './game.js';

// Get the canvas element and its drawing context
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Function to draw a circle on the canvas
const drawCircle = (x, y, radius, color) => {
  ctx.fillStyle = color; // Set the fill color
  ctx.beginPath(); // Begin a new path
  ctx.arc(x, y, radius, 0, Math.PI * 2); // Create a circle
  ctx.fill(); // Fill the circle
};

// Render function to draw game elements
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  
  const [playerX, playerY] = updatePlayerPosition(); // Update player position

  drawCircle(playerX, playerY, 15, "black"); // Draw player

  // Draw bullets
  bullets.forEach(bullet => {
    drawCircle(bullet.x, bullet.y, 5, "blue");
  });

  // Draw missiles
  missiles.forEach(missile => {
    drawCircle(missile.x, missile.y, 18, "red");
  });
};

// Main game loop function
const gameLoop = () => {
  render(); // Render the game elements
  requestAnimationFrame(gameLoop); // Request the next frame
};

// Start the game loop
requestAnimationFrame(gameLoop);

// Add event listeners for key presses
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);