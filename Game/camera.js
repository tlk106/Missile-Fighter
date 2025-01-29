// Import functions and variables from the game module
import { updatePlayerPosition, handleKeyPress, updateBullets, bullets, updateMissiles, missiles, lives, bulletDrops, updateBulletDrops, suppliesDrop, updateSuppliesDrop } from './game.js';

// Get the canvas element and its drawing context
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Function to resize the canvas to fit the window
const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
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

// Load the supplies drop image
const suppliesDropImage1 = new Image();
suppliesDropImage1.src = 'Game/img/supplies-drop1.png';

const suppliesDropImage2 = new Image();
suppliesDropImage2.src = 'Game/img/supplies-drop2.png';

// Load the player image
const playerImage = new Image();
playerImage.src = 'Game/img/player.png';

// Load the missile image
const missileImage = new Image();
missileImage.src = 'Game/img/missile.png';

// Load bullet drop images
const bulletDropImage1 = new Image();
bulletDropImage1.src = 'Game/img/bullet-drop1.png';

const bulletDropImage2 = new Image();
bulletDropImage2.src = 'Game/img/bullet-drop2.png';

const bulletDropImage3 = new Image();
bulletDropImage3.src = 'Game/img/bullet-drop3.png';

// Load the background images
const backgroundImage = new Image();
backgroundImage.src = 'Game/img/background.png';

const background2Image = new Image();
background2Image.src = 'Game/img/background2.png';

const background3Image = new Image();
background3Image.src = 'Game/img/background3.png';

const background4Image = new Image();
background4Image.src = 'Game/img/background4.png';

// Function to start the game loop
const startGameLoop = (bulletImage) => {
  requestAnimationFrame(() => gameLoop(bulletImage));
};

// Ensure the background image is loaded before starting the game loop
backgroundImage.onload = () => {
  // Load the bullet image and start the game loop
  const bulletImage = new Image();
  bulletImage.src = 'Game/img/bullet.png';
  bulletImage.onload = () => {
    startGameLoop(bulletImage);
  };
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

// Draw the background image based on the number of lives
  if (lives >= 4) {
  drawImage(backgroundImage, 1100, 600, 2200, 1200);
  } else {
      switch (lives) {
        case 3:
          drawImage(background2Image, 1100, 600, 2200, 1200);
          break;
        case 2:
          drawImage(background3Image, 1100, 600, 2200, 1200);
          break;
        case 1:
          drawImage(background4Image, 1100, 600, 2200, 1200);
          break;
        default:
          break;
    }
  }
  const [playerX, playerY] = updatePlayerPosition(); // Update player position

  // Draw bullets
  bullets.forEach(bullet => {
    drawImage(bulletImage, bullet.x, bullet.y, 50, 50); // Draw bullet image
  });

  drawImage(playerImage, playerX, playerY, 75, 75); // Draw player image

  // Draw missiles
  missiles.forEach(missile => {
    drawImage(missileImage, missile.x, missile.y, 100, 100); // Draw missile image
  });

  // Draw bullet drops with different images based on type
  bulletDrops.forEach(drop => {
    if (drop.cratetype === 1) {
      drawImage(bulletDropImage1, drop.x, drop.y, 50, 50); // Draw bullet drop image type 1
    } else if (drop.cratetype === 2) {
      drawImage(bulletDropImage2, drop.x, drop.y, 50, 50); // Draw bullet drop image type 2
    } else if (drop.cratetype === 3) {
      drawImage(bulletDropImage3, drop.x, drop.y, 50, 50); // Draw bullet drop image type 3
    }
  });

  // Draw supplies drop with different images based on type
  suppliesDrop.forEach(drop => {
    if (drop.createType === 1) {
      drawImage(suppliesDropImage1, drop.x, drop.y, 50, 50); // Draw supplies drop image type 1
    } else if (drop.createType === 2) {
      drawImage(suppliesDropImage2, drop.x, drop.y, 50, 50); // Draw supplies drop image type 2
    }
  });

  // Restore the context to its original state
  ctx.restore();
};

// Main game loop function
const gameLoop = (bulletImage) => {
  render(bulletImage); // Render the game elements
  requestAnimationFrame(() => gameLoop(bulletImage)); // Request the next frame
};

// Add event listeners for key presses
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);