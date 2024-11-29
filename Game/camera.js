import { updatePlayerPosition, handleKeyPress, updateBullets, bullets } from './game.js';

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const drawCircle = (x, y, radius, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const [playerX, playerY] = updatePlayerPosition();
  
  // Draw the player
  drawCircle(playerX, playerY, 10, "black");

  // Draw each bullet
  bullets.forEach(bullet => {
    drawCircle(bullet.x, bullet.y, 5, "blue"); // Draw bullets as blue circles
  });
};

const gameLoop = () => {
  render();
  requestAnimationFrame(gameLoop);
};

// Start the game loop
requestAnimationFrame(gameLoop);

document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);