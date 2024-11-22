const hideOrShowElementByID = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    console.log(`Element with ID ${id} not found.`);
    return;
  }
  
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
  } else if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    console.log(`Invalid use of hideOrShowElementByID with element ${id}.`);
  }
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

showElementByID("menu-container");
hideElementByID("game-area");

const play = () => {
  hideOrShowElementByID("menu-container");
  hideOrShowElementByID("game-area");
};

document.addEventListener("DOMContentLoaded", () => {
  showElementByID("menu-container");
  hideElementByID("game-area");
});