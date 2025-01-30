// Import configuration settings
import { config } from './config.js';

// Player's initial position and game state variables
let playerX = config.player.initialX; // Player X position
let playerY = config.player.initialY; // Player Y position
let score = config.game.initialScore; // Player Score
let lives = config.game.initialLives; // Player lives
const playerSpeed = config.player.speed; // Player speed
const playerBulletSpeed = config.player.bulletSpeed; // Bullet speed
let bulletcount = config.player.initialBulletCount; // Bullet count
let timer = 0; // How long the game has been running

const keys = {};
const bullets = []; // Bullets array
const missiles = []; // Missiles array
const bulletDrops = []; // Bullet drops array
const suppliesDrop = []; // Supplies drop array

let canSuppliesDrop = true; // Supplies drop control
const suppliesDropCooldown = config.game.suppliesDropCooldown; // Supplies drop cooldown in ms
let canShoot = true;
let canMissileSpawn = true; // Missile spawn control
let canBulletDrop = true; // Bullet drop control
const bulletDropCooldown = config.game.bulletDropCooldown; // Bullet drop cooldown in ms
const bulletCooldown = config.game.bulletCooldown; // Bullet cooldown in ms
const missileCooldown = config.game.missileCooldown; // Missile cooldown in ms
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

// Generalized collision checking function
const checkCollisions = (objects1, objects2, collisionHandler) => {
  for (let i = objects1.length - 1; i >= 0; i--) {
    for (let j = objects2.length - 1; j >= 0; j--) {
      if (checkcollision(objects1[i].x, objects1[i].y, objects2[j].x, objects2[j].y, 32)) {
        collisionHandler(objects1[i], objects2[j]);
        objects1.splice(i, 1);
        objects2.splice(j, 1);
        break;
      }
    }
  }
};

// Check collisions between bullets and missiles
const handleBulletMissileCollision = (bullet, missile) => {
  score++; // Increment score
};

// Check collisions between bullets and bullet drops
const handleBulletBulletDropCollision = (bullet, drop) => {
  if (drop.cratetype === 1) {
    bulletcount += 20; // Increase bullet count for type 1
  } else if (drop.cratetype === 2) {
    bulletcount += 50; // Increase bullet count for type 2
  } else if (drop.cratetype === 3) {
    bulletcount += 85; // Increase bullet count for type 3
  }
};

// Check collisions between player and supplies drop
const handlePlayerSuppliesDropCollision = (player, drop) => {
  if (drop.createType === 1) {
    lives++; // Increase lives for type 1
  } else if (drop.createType === 2) {
    lives += 2; // Increase lives for type 2
  }
};

// Create supplies drop
const createSuppliesDrop = () => {
  if (!canSuppliesDrop) return; // Check if supplies drop can be created

  let dropType;

  let randomValue = Math.random();

  if (randomValue < 0.75) {
    dropType = 1; // 75% chance
  } else {
    dropType = 2; // 25% chance
  };

  const supplyDrop = {
    x: chooseRandomNumber(0, 2200), // Random x position
    y: 0, // Starting y position
    speed: 3, // Speed of supplies drop
    createType: dropType, // Assign the determined drop type
  };
  suppliesDrop.push(supplyDrop); // Push the new supply drop to the array
  canSuppliesDrop = false; // Disable supplies drop spawning

  // Re-enable after cooldown
  setTimeout(() => {
    canSuppliesDrop = true;
  }, suppliesDropCooldown);
}

const createBulletDrop = () => {
  if (!canBulletDrop) return; // Check if bullet drops can be created

  // Determine drop type based on specified probabilities
  const randomValue = Math.random();
  let dropType;

  if (randomValue < 0.5) {
    dropType = 1; // 50% chance
  } else if (randomValue < 0.875) {
    dropType = 2; // 37.5% chance
  } else {
    dropType = 3; // 12.5% chance
  }

  const bulletDrop = {
    x: chooseRandomNumber(0, 2200), // Random x position
    y: 0, // Starting y position
    speed: 3, // Speed of bullet drop
    cratetype: dropType, // Assign the determined drop type
  };
  bulletDrops.push(bulletDrop);
  canBulletDrop = false; // Disable bullet drop spawning

  // Re-enable after cooldown
  setTimeout(() => {
    canBulletDrop = true;
  }, bulletDropCooldown);
};

// Update supplies drop positions
const updateSuppliesDrop = () => {
  const canvas = document.getElementById("game-canvas");
  const scaleY = canvas.height / 1200; // Calculate the scale factor for the canvas height
  for (let i = suppliesDrop.length - 1; i >= 0; i--) {
    suppliesDrop[i].y += suppliesDrop[i].speed;

    if (suppliesDrop[i].y > canvas.height / scaleY) {
      suppliesDrop.splice(i, 1);
    }
  }
};

// Update bullet drops positions
const updateBulletDrops = () => {
  const canvas = document.getElementById("game-canvas");
  const scaleY = canvas.height / 1200; // Calculate the scale factor for the canvas height
  for (let i = bulletDrops.length - 1; i >= 0; i--) {
    bulletDrops[i].y += bulletDrops[i].speed;

    if (bulletDrops[i].y > canvas.height / scaleY) {
      bulletDrops.splice(i, 1);
    }
  }
};

const createMissile = () => {
  if (!canMissileSpawn) return; // Check if missiles can be created

  const missile = {
    x: chooseRandomNumber(0, 2200), // Random x position
    y: 0, // Starting y position
    speed: 6, // Speed of missile
  };
  missiles.push(missile);
  canMissileSpawn = false; // Disable missile spawning

  // Re-enable after cooldown
  setTimeout(() => {
    canMissileSpawn = true;
  }, missileCooldown);
};

// Check if the player has lost all lives
const checkLoose = () => {
  if (lives <= 0) {
    gameOver = true;
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
  if (bulletcount <= 0) return; // Check if there are bullets left
  const bullet = {
    x: playerX,
    y: playerY,
    speed: playerBulletSpeed,
  };
  bullets.push(bullet);
  canShoot = false; // Disable shooting
  bulletcount--; // Decrease bullet count

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

const targetFPS = 120;
const frameTime = 1000 / targetFPS; // Time per frame in milliseconds
let lastFrameTime = 0; // Time of the last frame

const gameLoop = (currentTime) => {
  if (gameOver) return;

  // Calculate the time elapsed since the last frame
  const deltaTime = currentTime - lastFrameTime;

  // If enough time has passed, update the game state
  if (deltaTime >= frameTime) {
    lastFrameTime = currentTime; // Update last frame time
    updatePlayerPosition();
    updateBullets();
    updateMissiles();
    updateBulletDrops();
    updateSuppliesDrop();

    // Check for collisions
    checkCollisions(bullets, missiles, handleBulletMissileCollision);
    checkCollisions(bullets, bulletDrops, handleBulletBulletDropCollision);
    checkCollisions(bullets, suppliesDrop, handlePlayerSuppliesDropCollision);

    // Create bullet drop only if allowed
    createBulletDrop(); // This will respect the cooldown

    // Create missile only if allowed
    createMissile();

    // Create supplies drop only if allowed
    createSuppliesDrop();

    checkLoose();
  }

  requestAnimationFrame(gameLoop); // Continue loop
};

// Start the game loop when play button is pressed
const play = () => {
  lastFrameTime = performance.now(); // Initialize last frame time
  requestAnimationFrame(gameLoop); // Start the game loop

  // Start the timer
  setInterval(() => {
    if (!gameOver) {
      timer += 1;
    }
  }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play-button");
  if (playButton) {
    playButton.addEventListener("click", play);
  }
});

// Export necessary components for potential use in other modules
export {
  updatePlayerPosition,
  handleKeyPress,
  updateBullets,
  bullets,
  updateMissiles,
  missiles,
  lives,
  bulletDrops,
  updateBulletDrops,
  score,
  bulletcount,
  suppliesDrop,
  updateSuppliesDrop,
  timer,
  gameOver,
};
