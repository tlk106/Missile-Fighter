let playerX = 234;
let playerY = 400;
const playerSpeed = 5;

const updatePlayerPosition = () => {
  console.log(`Player Position: (${playerX}, ${playerY})`);
  return [playerX, playerY]; // Return the updated position
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
      playerX -= playerSpeed;
  } else if (event.key === 'ArrowRight') {
      playerX += playerSpeed;
  }
  updatePlayerPosition();
});

updatePlayerPosition();

export { updatePlayerPosition };