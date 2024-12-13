import { score, lives } from './game.js';

const hideOrShowElementByID = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    console.log(`Element with ID ${id} not found.`);
    return;
  }

  element.style.display = (element.style.display === "none" || element.style.display === "") ? "block" : "none";
};

const hideElementByID = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none";
  } else {
    console.log(`Element with ID ${id} not found.`);
  }
};

const showElementByID = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "block";
  } else {
    console.log(`Element with ID ${id} not found.`);
  }
};

const updateScore = () => {
  const scoreLabel = document.getElementById("score_label");
  if (scoreLabel) {
    scoreLabel.innerHTML = score;
  }
};

const updateLives = () => {
  const lives_label = document.getElementById("lives_label");
  if (lives_label) {
    lives_label.innerHTML = lives;
  }
};

const play = () => {
  hideOrShowElementByID("menu-container");
  hideOrShowElementByID("game-area");
  setInterval(updateScore, 100);
  setInterval(updateLives, 100);
};

document.addEventListener("DOMContentLoaded", () => {
  showElementByID("menu-container");
  hideElementByID("game-area");
  
  const playButton = document.getElementById("play-button");
  if (playButton) {
    playButton.addEventListener("click", play);
  }
});