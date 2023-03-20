// TO-DO
// Waldo is not showing up as an image
// Rendering is too slow
// Images need to be flipped based on direction

//REFACTOR


const state = {
// DOM Selectors
selector: { 
  startBtn: document.querySelector("#startBtn"),
  canvas: document.querySelector("#canvas"),
  ctx: canvas.getContext('2d', {willReadFrequently: true}),
  timer: document.querySelector("#timer"),
  stage: {
  width: 800,
  height: 250,
}
}
}

// IMAGES
function buildImageUrls (number) {
  const peepImageArray = []

// for loop to create multiple images. Right now it is linked to 9 total images.
for (let i = 1; i < number; i++) {
  peepImageArray.push(`assets/peep${i}.png`);
}

}

function createPeeps

function createRandomPeeps

function initializeGame

function update

function render

function startGameLoop







// IMAGES
// Array to hold peep images
let peepImageArray = []

// for loop to create multiple images. Right now it is linked to 9 total images.
for (let i = 1; i < 50; i++) {
  let img = new Image();
  img.src = `assets/peep${i}.png`;
  img.data = '0, 0, 75, 100'
  peepImageArray.push({
    src: img.src,
    data: img.data}
    )
  }
console.log(peepImageArray) //worked


// CREATE PEEPS
// peep array
let peepArray = [];

// constructor to make peeps and it adds the peep to the peep array
class Peep {
  // this.image
  constructor(x, y, width, height, color, speed, direction, src, data) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.direction = direction;
    this.src = src
    this.data = data
    peepArray.push(this);
  }
  // add image to render - this is what is making my image
  render() {
    const img = new Image();
    img.src = this.src
    img.onload = () => {
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
      this.data = ctx.getImageData(0, 0, img.width, img.height);
    }
  }
}

const waldo = new Peep(0, 0, 0, 0, "red", 5, "right", 'http://127.0.0.1:5500/assets/waldo3.jpeg', ("0, 0, 75, 100"));

for (let i =0; i < 45; i++) {
  new Peep(0, 0, 0, 0, "#F88379", 5, "left", peepImageArray[i].src, peepImageArray[i].data) };


// put images in array peepImageArray

console.log(peepArray); // worked

// RANDOMIZE PEEP
function randomizePeep(peep) {
  //use code to pick random image from peepImageArray and set it
  peep.width = 150;
  peep.height = 200
  peep.x = Math.random() < 0.5 ? 0 - peep.width: 750;
  peep.y = stage.height + 205 - Math.floor(Math.random() * 250);
  peep.speed = Math.floor(Math.random() * (10 - 5 + 1) + 5);
  //this stops the peek-a-boo
  peep.direction = peep.x > 100 ? "left" : "right";
  peep.src = peep.src
  peep.data = peep.data;
  console.log(peep)
}


// GAME MECHANICS

let gameLoopInterval;
let timeSecond = 60;
let gameOver = true;

// TIMER

timer.innerText = `:${timeSecond}`;

let timeInterval;

startBtn.addEventListener("click", function() {
  timeInterval = setInterval(() => {
    timeSecond--;
    timer.innerText = `:${timeSecond}`;
    if (timeSecond <= 0) {
      clearInterval(timeInterval);
      gameEnd();
      timeSecond = 60;
      timer.innerText = `:${timeSecond}`;
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Waldo Escaped", canvas.width/2, canvas.height/2);
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

// GAME LOOP

function gameLoop() {
  if (!gameOver) {
    // this is for the movement of the boxes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // making peeps appear
    console.log(peepArray)
    peepArray.forEach((peep) => {
      // moving the peep left or right
      if (peep.direction === "left") {
        peep.x -= peep.speed;
      } else {
        peep.x += peep.speed;
      }
      // staying in canvas
      if (peep.x < -peep.width || peep.x > canvas.width) {
        randomizePeep(peep);
      }
      // draw peep
      peep.render ()
    });
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
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Caught Waldo", canvas.width/2, canvas.height/2);
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
    randomizePeep(peep)
})}


