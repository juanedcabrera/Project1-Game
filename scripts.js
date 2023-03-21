// TO-DO
// Waldo is random and not set
// 


// DOM SELECTORS
// IMAGES
// CREATE PEEPS
// RANDOMIZE PEEPS
// GAME MECHANICS DEFINITIONS
// TIMER
// MOVE PEEPS
// GAME LOOP
// WALDO
// ENDGAME
// SCREEN MESSAGE


// DOM Selectors
const startBtn = document.querySelector("#startBtn");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const timer = document.querySelector("#timer");


// BUTTON

function drawButton(el, x, y) {
  const active = document.activeElement === el;
  const width = 150;
  const height = 40;

  // Button background
  ctx.fillStyle = active ? "pink" : "lightgray";
  ctx.fillRect(x, y, width, height);

  // Button text
  ctx.font = "15px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = active ? "blue" : "black";
  ctx.fillText(el.textContent, x + width / 2, y + height / 2);

  // Define clickable area
  ctx.beginPath();
  ctx.rect(x, y, width, height);

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}

drawButton(startBtn, 325, 225)



// IMAGES
// Array to hold peep images
let peepImageArray = [];

// for loop to create multiple images. Right now it is linked to 9 total images.
for (let i = 1; i < 55; i++) {
  let img = new Image();
  img.src = `assets/peep${i}.png`;
  peepImageArray.push({
    src: img.src,
  });
}
console.log(peepImageArray); //worked

// CREATE PEEPS
// peep array
let peepArray = [];

// constructor to make peeps and it adds the peep to the peep array
class Peep {
  // this.image
  constructor(speed, direction, src, img) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.speed = speed;
    this.direction = direction;
    this.src = src;
    this.img = img;
    peepArray.push(this);
  }
  // add image to render - this is what is making my image
  // inspired by https://jsfiddle.net/sw4w8qnu/ for the ctx save, translate, restore
  render() {
    ctx.save();
    // translate the ctx to the peep's current x and y coordinates
    ctx.translate(this.x, this.y);
    // scale the context by -1 on the x axis if peep is moving left
    if (this.direction === "left") {
      ctx.scale(-1, 1);
    }
    // draw the image
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.restore();
  }
}
const waldoImage = new Image();
waldoImage.src = "http://127.0.0.1:5500/assets/waldo3.jpeg";

const waldo = new Peep(
  5,
  "right",
  "http://127.0.0.1:5500/assets/waldo3.jpeg",
  waldoImage
);

for (let i = 0; i < 5; i++) {
  const img = new Image();
  img.src = peepImageArray[i].src;
  new Peep(5, "left", peepImageArray[i].src, img);
}

// put images in array peepImageArray

console.log(peepArray); // worked

// RANDOMIZE PEEP
function randomizePeep(peep) {
  //use code to pick random image from peepImageArray and set it
  peep.width = 150;
  peep.height = 200;
  peep.x = Math.random() < 0.5 ? 0 - peep.width : canvas.width + peep.width;
  peep.y = Math.floor(Math.random() * (canvas.height - peep.height) + 1);
  peep.speed = Math.floor(Math.random() * (15 - 5 + 1) + 5);
  //this stops the peek-a-boo
  peep.direction = peep.x > 100 ? "left" : "right";
  peep.src = peep.src;
}

// GAME MECHANICS

let gameLoopInterval;
let timeSecond = 60;
let gameOver = true;
let timeInterval;


// TIMER

timer.innerText = `:${timeSecond}`;

startBtn.addEventListener("click", function () {
  timeInterval = setInterval(() => {
    timeSecond--;
    timer.innerText = `:${timeSecond}`;
    if (timeSecond <= 0) {
      clearInterval(timeInterval);
      gameEnd();
      timeSecond = 60;
      timer.innerText = `:${timeSecond}`;
    screen ("Waldo Escaped")
    }
  }, 1000);
});

// START GAME
function startGame() {
  gameLoopInterval = setInterval(gameLoop, 60);
  startBtn.disabled = true;
  timeInterval;
  gameOver = false;
}

startBtn.addEventListener("click", startGame);

//MOVE PEEPS

function movePeeps(peepArray) {
  peepArray.forEach((peep) => {
    // moving the peep left or right
    if (peep.direction === "left") {
      peep.x -= peep.speed;
    } else {
      peep.x += peep.speed;
    }
    // staying in canvas
    if (
      peep.x < -peep.width ||
      peep.x > canvas.width + peep.width ||
      peep.y > canvas.height
    ) {
      randomizePeep(peep);
    }
    // draw peep
    peep.render();
  });
}

// GAME LOOP

function gameLoop() {
  if (!gameOver) {
    // this is for the movement of the boxes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // making peeps appear
    movePeeps(peepArray);
  }
}

// WALDO

//When you click on waldo initiates gameEnd function
canvas.addEventListener("click", (e) => {
  if (
    e.offsetX >= waldo.x &&
    e.offsetX <= waldo.x + waldo.width &&
    e.offsetY >= waldo.y &&
    e.offsetY <= waldo.y + waldo.height
  ) {
    gameEnd();
    clearInterval(timeInterval);
    timeSecond = 60;
    timer.innerText = `:${timeSecond}`;
    screen("Waldo Caught")
  }
});

// END GAME
function gameEnd() {
  clearInterval(timeInterval);
  clearInterval(gameLoopInterval);
  timeSecond = 60;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameOver = true;
  startBtn.disabled = false;
  peepArray.forEach((peep) => {
    randomizePeep(peep);
  });
}

// SCREEN MESSAGE
function screen(message) {
  ctx.clearRect(0,0,canvas.width,canvas.height)

  ctx.font = "30px Arial"
  ctx.textAlign = "center"
  ctx.fillStyle = "black"

ctx.fillText (message, canvas.width / 2, canvas.height / 2)
}