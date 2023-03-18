// QUESTIONS
// Do I make each individual peep? or is there a way to do it at scale?
// Worried about who goes is displayed forward vs backward.

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
let timerInterval;

function startGame() {
  gameLoopInterval = setInterval(gameLoop, 60);
  startBtn.disabled = true;
  let timeSecond = 60;
  timer.innerText = `:${timeSecond}`;

  const countDown = setInterval(() => {
    timeSecond--;
    timer.innerHTML = `:${timeSecond}`;
    if (timeSecond <= 0 || timeSecond < 1) {
      clearInterval(countDown);
    }
  }, 1000);
}

startBtn.addEventListener("click", startGame);

startTimer = () => {
  // Firs twe start by clearing the existing timer, in case of a restart
  clearInterval(timerInterval);
  // Then we clear the variables
  let second = 60,
    // Next we set a interval every 1000 ms
    timerInterval = setInterval(function () {
      // Toggle the odd class every interval
      timer.classList.toggle("odd");

      // We set the timer text to include a two digit representation
      timer.innerHTML = second < 10 ? "0" + second : second;

      // Next, we add a new second since one second is passed
      second--;

      // We check if the second equals 60 "one minute"
      if (second == 0) {
        // If so, we add a minute and reset our seconds to 0
        timer.innerText = "0";
      }
    }, 1000);
};

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
  clearInterval(gameLoopInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startBtn.disabled = false;
}
// pulls random (peep) and removes them from all peeps + then when they get to end of screen it gets put back into the array - empty the properties when it goes back to the array

// stage where they walk (screen) - to make wide enough to fill and not look distorted - will need hardcoded -

// // FUNCTIONS

// function for starting and it should be random aand include rules for the direction and possible points

// function direction and it should be random but tied to the starting point (starting on left direction should be right and starting on right direction should left)

// function walk speed and it should be random

// function reset peeps to put back into and properties should be removed except for image. farthest left of peep once it goes past the right of screen and farthest right of peep should once it goes past the left of screen

// function for random waldo picked by choosing an indice and displaying the waldo in the waldo box - - this will need to be tied to the start button

// game loop1 to do the if check if waldo has been (shown every 12 seconds and depending on fast speed it could be more times)

// function to waldo hitdetection (check ogre and pass on click event with xy and collision detection)

// function for end - end game logic, clear stage and show end screen one for winmner and one for loser (timer ran out)

// game loop2 if waldo is clicked or timer has elapsed to fire for end function

// function for start - when start button is clicked - waldo is picked, displayed, timer (started)

// interval for gameLoops

// // NOTES:

// // waldo - randomize. When waldo is picked update Waldo Box in HTML and thats controlled by the [i]
// /// if statement saying if waldo hasn't been seen in certain time (15 seconds) he has to be picked
// // waldo hit detection // hitdetection parameter - pass on a click event - xy value and collision detection point of xy value
// // if waldo is clicked than end the game

// //start button that starts the game

// // timer that will end the game
// const timeH = document.querySelector('h4')
