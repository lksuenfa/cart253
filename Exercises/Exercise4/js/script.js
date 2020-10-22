// ( ) Add a user-controlled shape (or image)
// ( ) Make the user interact with the fish
// ( ) Change the fish (or whatever) creation
// ( ) Add at least two endings

"use strict";

let school = []; // Create an empty array and assign it to the school variable
let schoolSize = 4; //length of array

let cupid = {
  x: 0,
  y: 0,
  image: undefined,
};
// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y, r, g, b) {
  let fish = {
    x: x,
    y: y,
    image: undefined,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
    fill: {
      r: r,
      g: 150,
      b: 150,
    },
  };
  return fish;
}

function preload() {
  // fish.image = loadImage("assets/images/fish1.svg");
  cupid.image = loadImage("assets/images/cupid.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create four fish, positioned randomly

  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

// draw()
// Moves and displays our fish
function draw() {
  background(230, 236, 237); //grey

  // Use a for loop to count from 0 up to 3
  // and move the fish at that index in the schools array each time
  for (let i = 0; i < school.length; i++) {
    // Use i as the index to get the current fish to move
    // The first time i will be 0, the second time 1, then 2, then 3
    // Move the fish!
    moveFish(school[i]);
  }

  // Same again for displaying
  for (let i = 0; i < school.length; i++) {
    displayFish(school[i]);
  }

  //move cupid
  imageMode(CENTER);
  cupid.x = mouseX;
  cupid.y = mouseY;
  image(cupid.image, cupid.x, cupid.y, 70, 50);
}

// moveFish(fish)
// Chooses whether the provided fish changes direction and moves it
function moveFish(fish) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  fish.fill.r = random(0, 255);
  // fish.fill.b = random(0, 255);
  // fish.fill.g = random(0, 255);
  fill(fish.fill.r, fish.fill.g, fish.fill.b);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  // image(fish.image, fish.x, fish.y);
  pop();
}

function mousePressed() {
  let fish = createFish(mouseX, mouseY); // Create a fish at the mouse position
  school.push(fish); // Add the fish to our array
  // Now the school array has our new fish and it will be moved and drawn
  // with all the others in the for loop!
}
