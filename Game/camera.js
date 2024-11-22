import { updatePlayerPosition } from './game.js';


const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const drawCircle = (x, y, radius, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

const drawRectangle = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawTriangle = (x1, y1, x2, y2, x3, y3, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
};

const drawText = (text, x, y, font = "32px Arial", color) => {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const [playerX, playerY] = updatePlayerPosition();
  drawCircle(playerX, playerY, 10, "black");
};
  

document.addEventListener("keydown", render);