let playerX = 234;
let playerY = 1190;
let score = 0;
let lives = 3;
const playerSpeed = 5;
const playerBulletSpeed = 10;
const keys = {}; 
const bullets = []; // Initialize bullets as an array
const missiles = []; // Initialize missiles as an array
let canShoot = true;
let canMissileSpawn = true; // Decides if missiles will spawn or not
const bulletCooldown = 250; // Cooldown in milliseconds
const missileCooldown = 1500; // Cooldown in milliseconds

const chooseRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkcollision = (x1, y1, x2, y2, checkradius) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= checkradius;
};

const checkBulletMissileCollisions = () => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = missiles.length - 1; j >= 0; j--) {
      const bullet = bullets[i];
      const missile = missiles[j];
      const collisionRadius = 26;

      if (checkcollision(bullet.x, bullet.y, missile.x, missile.y, collisionRadius)) {
        console.log("Collision detected between bullet and missile!");
        bullets.splice(i, 1);
        missiles.splice(j, 1);
        score++;
        break;
      }
    }
  }
};

const createMissile = () => {
  if (!canMissileSpawn) return;
  const missile = {
    x: chooseRandomNumber(0, 2200),
    y: 0,
    speed: 6,
  };
  missiles.push(missile);
  console.log("Created a missile");
  canMissileSpawn = false; // Disable missile spawning immediately
  setTimeout(() => {
    canMissileSpawn = true; // Enable missile spawning after cooldown
  }, missileCooldown);
};

const updateMissiles = () => {
  for (let i = missiles.length - 1; i >= 0; i--) {
    missiles[i].y += missiles[i].speed;

    if (missiles[i].y > window.innerHeight) { // Check if missile goes out of bounds
      missiles.splice(i, 1);
      lives--;
      console.log("Life lost.")
    }
  }
};

const createPlayerBullet = (playerX) => {
  if (!canShoot) return;
  const bullet = {
    x: playerX,
    y: playerY,
    speed: playerBulletSpeed,
  };
  bullets.push(bullet);
  console.log("Bullet Created");
  canShoot = false;

  setTimeout(() => {
    canShoot = true; // Reset shooting ability after cooldown
  }, bulletCooldown);
};

const updateBullets = () => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bullets[i].speed;

    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
};

const updatePlayerPosition = () => {
  if (keys["a"]) {
    playerX -= playerSpeed;
  }
  if (keys["d"]) {
    playerX += playerSpeed;
  }
  if (keys[" "]) {
    createPlayerBullet(playerX);
  }
  console.log(`Player Position: (${playerX}, ${playerY})`);
  return [playerX, playerY];
};

const handleKeyPress = (event) => {
  if (event.type === "keydown") {
    keys[event.key] = true;
  } else if (event.type === "keyup") {
    keys[event.key] = false;
  }
};

// Add event listeners for key presses
window.addEventListener("keydown", handleKeyPress);
window.addEventListener("keyup", handleKeyPress);

// Game loop function
const gameLoop = () => {
  updatePlayerPosition();
  updateBullets();
  updateMissiles();
  checkBulletMissileCollisions(); // Check for collisions in the game loop
  createMissile();
  requestAnimationFrame(gameLoop);
};

gameLoop(); // Start the game loop

// Export necessary components
export { updatePlayerPosition, handleKeyPress, updateBullets, bullets, updateMissiles, missiles, score, lives };