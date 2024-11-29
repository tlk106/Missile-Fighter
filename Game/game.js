let playerX = 234;
let playerY = 400;
const playerSpeed = 5;
const keys = {};

const updatePlayerPosition = () => {
  if (keys["a"]) {
      playerX -= playerSpeed;
  }
  if (keys["d"]) {
      playerX += playerSpeed;
  }
  console.log(`Player Position: (${playerX}, ${playerY})`);
  return [playerX, playerY];
}

const handleKeyPress = (event) => {
  if (event.type === "keydown") {
    keys[event.key] = true;
  } else if (event.type === "keyup") {
    keys[event.key] = false;
  }
};

export { updatePlayerPosition, handleKeyPress };