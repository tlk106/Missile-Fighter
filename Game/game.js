// Player's initial position and game state variables
let playerX = 1000; // Player X position
let playerY = 1175; // Player Y position
let score = 0; // Player Score
let lives = 4; // Player lives
const playerSpeed = 7.5; // Player speed
const playerBulletSpeed = 10; // Bullet speed
let bulletcount = 250; // Bullet count

const keys = {}; 
const bullets = []; // Bullets array
const missiles = []; // Missiles array
const bulletDrops = []; // Bullet drops array

let canShoot = true;
let canMissileSpawn = true; // Missile spawn control
let canBulletDrop = true; // Bullet drop control
const bulletDropCooldown = 10000; // Bullet drop cooldown in ms
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
        bullets.splice(i, 1); // Remove bullet
        missiles.splice(j, 1); // Remove missile
        score++; // Increment score
        break; // Break inner loop
      }
    }
  }
};

const checkBulletBulletDropCollisions = () => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = bulletDrops.length - 1; j >= 0; j--) {
      const bullet = bullets[i];
      const drop = bulletDrops[j];
      const collisionRadius = 32; // Collision detection radius
      if (checkcollision(bullet.x, bullet.y, drop.x, drop.y, collisionRadius)) {
        bullets.splice(i, 1); // Remove bullet
        bulletDrops.splice(j, 1); // Remove bullet drop
        bulletcount += 50; // Increase bullet count
        break; // Break inner loop
      }
    }
  }
}

const createBulletDrop = () => {
  if (!canBulletDrop) return; // Check if bullet drops can be created

  const bulletDrop = {
    x: chooseRandomNumber(0, 2200), // Random x position
    y: 0, // Starting y position
    speed: 3, // Speed of bullet drop
    cratetype: chooseRandomNumber(1, 3), // Random crate type
  };
  bulletDrops.push(bulletDrop);
  canBulletDrop = false; // Disable bullet drop spawning

  // Re-enable after cooldown
  setTimeout(() => {
    canBulletDrop = true; 
  }, bulletDropCooldown);
};

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
    checkBulletMissileCollisions();
    checkBulletBulletDropCollisions();
    
    // Create bullet drop only if allowed
    createBulletDrop(); // This will respect the cooldown

    // Create missile only if allowed
    createMissile(); 

    checkLoose();
  }

  requestAnimationFrame(gameLoop); // Continue loop
};

// Start the game loop when play button is pressed
const play = () => {
  lastFrameTime = performance.now(); // Initialize last frame time
  requestAnimationFrame(gameLoop); // Start the game loop
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
  bulletcount
};