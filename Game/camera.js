// Import functions and variables from the game module
import { updatePlayerPosition, handleKeyPress, updateBullets, bullets, updateMissiles, missiles } from './game.js';

// Get the canvas element and its drawing context
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Function to resize the canvas to fit the window
const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// Call resizeCanvas initially and on window resize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Function to draw a circle on the canvas
const drawCircle = (x, y, radius, color) => {
  ctx.fillStyle = color; // Set the fill color
  ctx.beginPath(); // Begin a new path
  ctx.arc(x, y, radius, 0, Math.PI * 2); // Create a circle
  ctx.fill(); // Fill the circle
};

// Function to draw an image on the canvas
const drawImage = (img, x, y, width, height) => {
  ctx.drawImage(img, x - width / 2, y - height / 2, width, height);
};

// Render function to draw game elements
const render = (bulletImage) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  
  // Save the current context state
  ctx.save();

  // Scale the context to fit the canvas size
  const scaleX = canvas.width / 2200;
  const scaleY = canvas.height / 1200;
  ctx.scale(scaleX, scaleY);

  const [playerX, playerY] = updatePlayerPosition(); // Update player position

  drawCircle(playerX, playerY, 15, "black"); // Draw player

  // Draw bullets
  bullets.forEach(bullet => {
    drawImage(bulletImage, bullet.x, bullet.y, 50, 50); // Draw bullet image
  });

  // Draw missiles
  missiles.forEach(missile => {
    drawCircle(missile.x, missile.y, 18, "red");
  });

  // Restore the context to its original state
  ctx.restore();
};

// Main game loop function
const gameLoop = (bulletImage) => {
  render(bulletImage); // Render the game elements
  requestAnimationFrame(() => gameLoop(bulletImage)); // Request the next frame
};

// Load the bullet image and start the game loop
const bulletImage = new Image();
bulletImage.src = 'bullet.png';
bulletImage.onload = () => {
  requestAnimationFrame(() => gameLoop(bulletImage));
};

// Add event listeners for key presses
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);