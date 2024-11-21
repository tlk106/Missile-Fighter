const hideOrShowElementByID = (id) => {
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
  } else if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    console.log(`Invalid Use of ${hideOrShowElementByID(id)} With Element ${id} being used.`);
  };
}
const play = () => {
  hideOrShowElementByID("menu-container");
  hideOrShowElementByID("game-area");
}