// TO-DO
// Canvas not clearing at gameEnd
// Display isn't hooked up

// DOM Selectors
const startBtn = document.querySelector("#startBtn");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const timer = document.querySelector("#timer");
const stage = {
  width: 800,
  height: 250,
};

// peep array
let peepArray = [];

// constructor to make peeps and it adds the peep to the peep array
class Peep {
  constructor(x, y, width, height, color, speed, direction) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.direction = direction;
    peepArray.push(this);
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height,
      this.speed,
      this.direction
    );
  }
}

const waldo = new Peep(0, 0, 0, 0, "red", 5, "right");
const peep1 = new Peep(0, 0, 0, 0, "yellow", 5, "left");
const peep2 = new Peep(0, 0, 0, 0, "yellow", 5, "right");
const peep3 = new Peep(0, 0, 0, 0, "yellow", 5, "left");
const peep4 = new Peep(0, 0, 0, 0, "yellow", 5, "left");
const peep5 = new Peep(0, 0, 0, 0, "yellow", 5, "right");

console.log(peepArray); // worked

function randomizePeep(peep) {
  // Generate new values for the selected peep
  //   const newValues = {
  peep.x = Math.random() < 0.5 ? 0 : 750;
  peep.y = stage.height + 205 - Math.floor(Math.random() * 250);
  peep.width = 50;
  peep.height = 50;
  peep.speed = Math.floor(Math.random() * (30 - 5 + 1) + 5);
  peep.direction = Math.random() < 0.5 ? "left" : "right";
}

console.log(peepArray);

let gameLoopInterval;


let timeSecond = 5;
timer.innerText = `:${timeSecond}`;

function countDown () {
const timerInterval = setInterval(() => {
  timeSecond--;
  timer.innerText = `:${timeSecond}`;
  if (timeSecond <= 0 || timeSecond < 1) {
    clearInterval(timerInterval);
    gameEnd ()
  }
}, 1000);
}

function startGame() {
  gameLoopInterval = setInterval(gameLoop, 60);
  startBtn.disabled = true;
  countDown ()
}

startBtn.addEventListener("click", startGame);

function gameLoop() {
  // business logic of the game
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  peepArray.forEach((item) => {
    if (item.direction === "left") {
      item.x -= item.speed;
    } else {
      item.x += item.speed;
    }
    if (item.x < -item.width || item.x > canvas.width) {
      randomizePeep(item);
    }

    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);
  });
}

//When you click on waldo initiates gameEnd function
canvas.addEventListener("click", (e) => {
  if (
    e.offsetX >= waldo.x &&
    e.offsetX <= waldo.x + waldo.width &&
    e.offsetY >= waldo.y &&
    e.offsetY <= waldo.y + waldo.height
  ) {
    gameEnd();
  }
});

function gameEnd() {
    // peepArray = []   This worked but it didn't allow for user to play again
    clearInterval(gameLoopInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.reset()
  startBtn.disabled = false;
  timeSecond = 60
}

// // FUNCTIONS

// function for random waldo picked by choosing an indice and displaying the waldo in the waldo box - - this will need to be tied to the start button

// function for end - end game logic, clear stage and show end screen one for winmner and one for loser (timer ran out)

// game loop2 if waldo is clicked or timer has elapsed to fire for end function

// function for start - when start button is clicked - waldo is picked, displayed, timer (started)


// // NOTES:

// // waldo - randomize. When waldo is picked update Waldo Box in HTML and thats controlled by the [i]
// /// if statement saying if waldo hasn't been seen in certain time (15 seconds) he has to be picked




// // timer that will end the game

