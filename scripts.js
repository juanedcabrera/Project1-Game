// DOM Selectors

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let peepNumber = 0;

//SOUNDS

let streetSound = new Audio("assets/sf-street-sound.mp3");
let victorySound = new Audio("assets/victory.wav");
let awwSound = new Audio("assets/aww.mp3");

//BUTTONS

const buttons = {
  easyButton: {
    x: 50,
    y: 330,
    w: 150,
    h: 40,
  },
  mediumButton: {
    x: 320,
    y: 330,
    w: 150,
    h: 40,
  },
  hardButton: {
    x: 585,
    y: 330,
    w: 150,
    h: 40,
  },
};

drawButton("EASY", 50, 330);
drawButton("MEDIUM", 320, 330);
drawButton("HARD", 585, 330);

//RULES

screen(
  "You have 60 seconds to find and click on Waldo",
  "30px Oswald",
  "center",
  "black"
);

//DRAW

function redraw() {
  drawButton("EASY", 50, 330);
  drawButton("MEDIUM", 320, 330);
  drawButton("HARD", 585, 330);
}

function drawButton(button, x, y) {
  const active = false;
  const width = 150;
  const height = 40;
  canvas.addEventListener("click", canvasClickHandler, { once: true });

  // Button background
  ctx.fillStyle = active ? "lightgray" : "gray";
  ctx.fillRect(x, y, width, height);

  // Button text
  ctx.font = "15px Poppins";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = active ? "white" : "white";
  ctx.fillText(button, x + width / 2, y + height / 2);
}

// CLICKING BUTTONS

function canvasClickHandler(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (
    x >= buttons.easyButton.x &&
    x <= buttons.easyButton.x + buttons.easyButton.w &&
    y >= buttons.easyButton.y &&
    y <= buttons.easyButton.y + buttons.easyButton.h
  ) {
    peepNumber = 10;
  } else if (
    x >= buttons.mediumButton.x &&
    x <= buttons.mediumButton.x + buttons.mediumButton.w &&
    y >= buttons.mediumButton.y &&
    y <= buttons.mediumButton.y + buttons.mediumButton.h
  ) {
    peepNumber = 30;
  } else if (
    x >= buttons.hardButton.x &&
    x <= buttons.hardButton.x + buttons.hardButton.w &&
    y >= buttons.hardButton.y &&
    y <= buttons.hardButton.y + buttons.hardButton.h
  ) {
    peepNumber = 45;
  } else {
    return;
  }

  startGame();
  startCountdown();
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
    // peepArray.push(this);
  }
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
// Waldo currently is hardcoded but would like to randomize later
const waldoImage = new Image();
waldoImage.src = "assets/waldo.png";
const waldo = new Peep(5, "right", "assets/waldo.png", waldoImage);

// Initializes the peeps into the peepArray and puts in Waldo
function initPeep() {
  peepArray = [];

  for (let i = 0; i < peepNumber; i++) {
    const img = new Image();
    img.src = peepImageArray[i].src;
    const newPeep = new Peep(5, "left", peepImageArray[i].src, img);
    peepArray.push(newPeep) 
  }
peepArray.push(waldo)
}

// RANDOMIZE PEEP
// Takes the peeps and randomizes location, speed, direction
function randomizePeep(peep) {
  peep.width = 150;
  peep.height = 200;
  peep.x = Math.random() < 0.5 ? 0 - peep.width : canvas.width + peep.width;
  peep.y = Math.floor(Math.random() * (canvas.height - peep.height) + 50);
  peep.speed = Math.floor(Math.random() * (15 - 5 + 1) + 5);
  //this stops the peek-a-boo
  peep.direction = peep.x > 100 ? "left" : "right";
  peep.src = peep.src;
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

// GAME MECHANICS

let gameLoopInterval;
let timeSecond = 60;
let gameOver = true;
let timeInterval;

// TIMER

const timerX = canvas.width / 2.4;

// Put timer on Canvas
function drawTimer() {
  ctx.font = "30px Poppins";
  ctx.fillStyle = "black";
  ctx.textAlign = "start";
  ctx.fillText(`Timer: ${timeSecond}`, timerX, 20, 200);
}

// Redraw the timer and buttons for when timer runs out
function redrawTimer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  redraw();
  drawTimer();
  screen("Waldo Escaped", "30px Oswald", "center", "black");
}

// Countdown timer from 60 to 0
function startCountdown() {
  timerX;
  timeInterval = setInterval(() => {
    timeSecond--;
    if (timeSecond <= 0) {
      awwSound.play();
      clearInterval(timeInterval);
      gameEnd();
      timeSecond = 60;
      redrawTimer();
    }
  }, 1000);
}

// START GAME

function startGame() {
  initPeep();
  gameLoopInterval = setInterval(gameLoop, 60);
  timeInterval;
  gameOver = false;
  streetSound.play();
}


// GAME LOOP

function gameLoop() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTimer();
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
    victorySound.play();
  }
});
// Redraw buttons and add message
function redrawCatch() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  redraw();
  screen("You caught Waldo!", "30px Oswald", "center", "black");
}

// END GAME
// Reset everything to how it was
function gameEnd() {
  streetSound.load();
  clearInterval(timeInterval);
  clearInterval(gameLoopInterval);
  timeSecond = 60;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameOver = true;
  peepArray.forEach((peep) => {
    randomizePeep(peep);
  });
}

// SCREEN MESSAGE
function screen(message, font, textAlign, fillStyle) {
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.fillStyle = fillStyle;
  ctx.fillText(message, canvas.width / 2, canvas.height / 1.8);
}
