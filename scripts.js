// TO-DO
// Waldo is random and not set
//

// DOM SELECTORS
// START BUTTON
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
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// START BUTTON
const canvStartBtn = document.createElement("button");
canvStartBtn.x = 325;
canvStartBtn.y = 225;
canvStartBtn.width = 150;
canvStartBtn.height = 40;
screen("Rules: 60 seconds to find and click on Waldo", "30px Arial", "center", "black")
redraw();


function redraw() {
  drawButton(canvStartBtn, 325, 225);
}

function drawButton(el, x, y) {
  const active = document.activeElement === el;
  const width = 150;
  const height = 40;
  canvas.addEventListener("click", canvasClickHandler, { once: true });

  // Button background
  ctx.fillStyle = active ? "pink" : "lightgray";
  ctx.fillRect(x, y, width, height);

  // Button text
  ctx.font = "15px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = active ? "blue" : "black";
  ctx.fillText("Start", x + width / 2, y + height / 2);
}

function canvasClickHandler(e) {
  if (
    e.offsetX >= canvStartBtn.x &&
    e.offsetX <= canvStartBtn.x + canvStartBtn.width &&
    e.offsetY >= canvStartBtn.y &&
    e.offsetY <= canvStartBtn.y + canvStartBtn.height
  ) {
    startGame();
    startCountdown();
  }
}
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
    // move the origin of the context to the peep's current x and y coordinates
    ctx.translate(this.x, this.y);
    // flip the context horizontally if peep is moving left
    if (this.direction === "left") {
      ctx.scale(-1, 1);
      ctx.translate(-this.width, 0);
    }
    // draw the image
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.restore();
  }
}

const waldoImage = new Image();
waldoImage.src = "assets/waldo3.jpeg";

const waldo = new Peep(
  5,
  "right",
  "assets/waldo3.jpeg",
  waldoImage
);

for (let i = 0; i < 20; i++) {
  const img = new Image();
  img.src = peepImageArray[i].src;
  new Peep(5, "left", peepImageArray[i].src, img);
}

// RANDOMIZE PEEP
function randomizePeep(peep) {
  //use code to pick random image from peepImageArray and set it
  peep.width = 150;
  peep.height = 200;
  peep.x = Math.random() < 0.5 ? 0 - peep.width : canvas.width + peep.width;
  peep.y = Math.floor(Math.random() * (canvas.height - peep.height) + 50);
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


const timerX = canvas.width/2.4

function drawTimer() {
  ctx.font = "30px Arial"
  ctx.fillStyle = "black"
  ctx.textAlign = "start"
  ctx.fillText(`Timer :${timeSecond}`, timerX, 20, 200)
}

function redrawTimer() {
  ctx.clearRect (0,0,canvas.width,canvas.height)
  redraw()
  drawTimer()
  screen("Waldo Escaped", "30px Arial", "center", "black")
}

function startCountdown() {
  timerX
  timeInterval = setInterval(() => {
    timeSecond--;
    if (timeSecond <= 0) {
      clearInterval(timeInterval);
      gameEnd();
      timeSecond = 60;
      redrawTimer();
    }
  }, 1000);
}

// START GAME
function startGame() {
  gameLoopInterval = setInterval(gameLoop, 60);
  timeInterval;
  gameOver = false;
}

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
    drawTimer()
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
    redrawCatch();
  }
});

function redrawCatch() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  redraw();
  screen("Waldo Caught", "30px Arial", "center", "black");
}

// END GAME
function gameEnd() {
  clearInterval(timeInterval);
  clearInterval(gameLoopInterval);
  timeSecond = 60;
  // timer.innerText = `:${timeSecond}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameOver = true;
  peepArray.forEach((peep) => {
    randomizePeep(peep);
  });
}

// SCREEN MESSAGE
function screen (message, font, textAlign, fillStyle) {
  ctx.font = font
  ctx.textAlign = textAlign
  ctx.fillStyle = fillStyle
  ctx.fillText(message, canvas.width / 2, canvas.height / 2.5);
}
