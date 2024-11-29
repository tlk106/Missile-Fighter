let playerX = 234;
let playerY = 400;
const playerSpeed = 5;
const playerBulletSpeed = 10;
const keys = {};
const bullets = []; // Initialize bullets as an array

const createPlayerBullet = (playerX) => {
  const bullet = {
    x: playerX,
    y: playerY,
    speed: playerBulletSpeed,
  };
  bullets.push(bullet);
  console.log("Bullet Created");
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
  requestAnimationFrame(gameLoop);
};

gameLoop(); // Start the game loop

// Export necessary components
export { updatePlayerPosition, handleKeyPress, updateBullets, bullets };