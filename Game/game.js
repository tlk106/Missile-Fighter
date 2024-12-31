// Player's initial position and game state variables
let playerX = 1000; // Player X position
let playerY = 1175; // Player Y position
let score = 0; // Player Score
let lives = 4; // Player lives
const playerSpeed = 7.5; // Player speed
const playerBulletSpeed = 10; // Bullet speed

const keys = {}; 
const bullets = []; // Bullets array
const missiles = []; // Missiles array

let canShoot = true;
let canMissileSpawn = true; // Missile spawn control
const bulletCooldown = 250; // Bullet cooldown in ms
const missileCooldown = 1500; // Missile cooldown in ms
let gameOver = false; // Game over state

// Function to choose a random number between min and max
const chooseRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to check collision between two points
const checkcollision = (x1, y1, x2, y2, checkradius) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= checkradius; // Return true if within radius
};

// Check collisions between bullets and missiles
const checkBulletMissileCollisions = () => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = missiles.length - 1; j >= 0; j--) {
      const bullet = bullets[i];
      const missile = missiles[j];
      const collisionRadius = 32; // Collision detection radius

      if (checkcollision(bullet.x, bullet.y, missile.x, missile.y, collisionRadius)) {
        console.log("Collision detected between bullet and missile!");
        bullets.splice(i, 1); // Remove bullet
        missiles.splice(j, 1); // Remove missile
        score++; // Increment score
        break; // Break inner loop
      }
    }
  }
};

// Create a missile
const createMissile = () => {
  if (!canMissileSpawn) return;
  const missile = {
    x: chooseRandomNumber(0, 2200), // Random x position
    y: 0, // Starting y position
    speed: 6, // Speed of missile
  };
  missiles.push(missile);
  console.log("Created a missile");
  canMissileSpawn = false; // Disable missile spawning
  setTimeout(() => {
    canMissileSpawn = true; // Re-enable after cooldown
  }, missileCooldown);
};

// Check if the player has lost all lives
const checkLoose = () => {
  if (lives <= 0) {
    gameOver = true; 
    console.log("Game Over! Final Score: " + score);
    alert("Game Over! Your score: " + score);
    location.reload();
  }
};

// Update missiles' positions
const updateMissiles = () => {
  const canvas = document.getElementById("game-canvas");
  const scaleY = canvas.height / 1200; // Calculate the scale factor for the canvas height
  for (let i = missiles.length - 1; i >= 0; i--) {
    missiles[i].y += missiles[i].speed;

    if (missiles[i].y > canvas.height / scaleY) { // Adjust the condition to account for the scaled height
      missiles.splice(i, 1);
      lives--; // Decrease lives
    }
  }
};

// Create a bullet when the player shoots
const createPlayerBullet = (playerX) => {
  if (!canShoot) return;
  const bullet = {
    x: playerX,
    y: playerY,
    speed: playerBulletSpeed,
  };
  bullets.push(bullet);
  console.log("Bullet Created");
  canShoot = false; // Disable shooting

  // Reset shooting ability after cooldown
  setTimeout(() => {
    canShoot = true; 
  }, bulletCooldown);
};

// Update bullets' positions
const updateBullets = () => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bullets[i].speed;

    if (bullets[i].y < 0) {
      bullets.splice(i, 1); 
    }
  }
};

// Update player's position based on key presses
const updatePlayerPosition = () => {
  if (gameOver) return;
  const leftBoundary = 0; 
  const rightBoundary = 2200;

  if (keys["a"] && playerX > leftBoundary) {
    playerX -= playerSpeed;
  }
  if (keys["d"] && playerX < rightBoundary) {
    playerX += playerSpeed;
  }
  if (keys[" "]) {
    createPlayerBullet(playerX);
  }
  console.log(`Player Position: (${playerX}, ${playerY})`);
  return [playerX, playerY];
};

// Handle key press events
const handleKeyPress = (event) => {
  if (gameOver) return;
  keys[event.key] = event.type === "keydown"; // Set key state
};

// Add event listeners for key presses
window.addEventListener("keydown", handleKeyPress);
window.addEventListener("keyup", handleKeyPress);

// Game loop function to update game state
const gameLoop = () => {
  if (gameOver) return;
  updatePlayerPosition();
  updateBullets();
  updateMissiles();
  checkBulletMissileCollisions();
  createMissile();
  checkLoose();
  requestAnimationFrame(gameLoop); // Continue loop
};

// Start the game loop when play button is pressed
const play = () => {
  gameLoop(); 
};

document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play-button");
  if (playButton) {
    playButton.addEventListener("click", play);
  }
});

// Export necessary components for potential use in other modules
export { updatePlayerPosition, handleKeyPress, updateBullets, bullets, updateMissiles, missiles, score, lives };