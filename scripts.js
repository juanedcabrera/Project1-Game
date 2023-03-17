// QUESTIONS
// Do I make each individual peep? or is there a way to do it at scale?
// Worried about who goes is displayed forward vs backward.

array of all (peeps) - each peep should have rectbox/image (peep will be a object and use constructor to make new peeps) -image is hardcoded onto the peep grabbing image from assets contains (speed) (starting point) (direction) will be properties that are blank but randomized later

pulls random (peep) and removes them from all peeps + then when they get to end of screen it gets put back into the array - empty the properties when it goes back to the array 

stage where they walk (screen) - to make wide enough to fill and not look distorted - will need hardcoded - 

// FUNCTIONS

function for starting and it should be random aand include rules for the direction and possible points

function direction and it should be random but tied to the starting point (starting on left direction should be right and starting on right direction should left)

function walk speed and it should be random


function reset peeps to put back into and properties should be removed except for image. farthest left of peep once it goes past the right of screen and farthest right of peep should once it goes past the left of screen

function for random waldo picked by choosing an indice and displaying the waldo in the waldo box - - this will need to be tied to the start button

game loop1 to do the if check if waldo has been (shown every 12 seconds and depending on fast speed it could be more times)

function to waldo hitdetection (check ogre and pass on click event with xy and collision detection)

function for end - end game logic, clear stage and show end screen one for winmner and one for loser (timer ran out)

game loop2 if waldo is clicked or timer has elapsed to fire for end function

function for start - when start button is clicked - waldo is picked, displayed, timer (started)

interval for gameLoops

// NOTES:

// waldo - randomize. When waldo is picked update Waldo Box in HTML and thats controlled by the [i]
/// if statement saying if waldo hasn't been seen in certain time (15 seconds) he has to be picked
// waldo hit detection // hitdetection parameter - pass on a click event - xy value and collision detection point of xy value 
// if waldo is clicked than end the game

//start button that starts the game

// timer that will end the game