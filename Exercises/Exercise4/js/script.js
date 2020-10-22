// (x ) Add a user-controlled shape (or image)
// (x ) Make the user interact with the fish
// (x ) Change the fish (or whatever) creation
// ( ) Add at least two endings

"use strict";

let school = []; // Create an empty array and assign it to the school variable
let schoolSize = 50; //length of array

let cupid = {
  x: 500,
  y: 500,
  vy: 0,
  vy: 0,
  speed: 1,
  image: undefined,
};
let specialFish1 = {
  x: 250,
  y: 250,
  vy: 0,
  vy: 0,
  speed: 1,
  image: undefined,
};
let specialFish2 = {
  x: 50,
  y: 50,
  vy: 0,
  vy: 0,
  speed: 1,
  image: undefined,
};

function preload() {
  cupid.image = loadImage("assets/images/cupid.svg");
  specialFish1.image = loadImage("assets/images/specialFish1.svg");
  specialFish2.image = loadImage("assets/images/specialFish2.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create four fish, positioned randomly
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y, r) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 1,
    fill: {
      r: r,
      g: 150,
      b: 150,
      a: 150,
    },
  };
  //random fish colour from pink to blue
  fish.fill.r = random(0, 255);
  return fish;
}

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

  //Cupid movement and display
  moveCupid();
  displayCupid();

  //specialFish

  moveFish(specialFish1);
  moveFish(specialFish2);
  displaySpecialFish();
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

  //reset position of fish to random if it reaches the canvas borders
  if (fish.x === 0 || fish.x === width) {
    fish.vx = random(0, width);
  } else if (fish.y === 0 || fish.y === height) {
    fish.y = random(0, height);
  }

  //  Move the fish
  if (mouseX > fish.x) {
    fish.vx = -fish.speed;
  } else if (mouseX < fish.x) {
    fish.vx = fish.speed;
  }

  if (mouseY > fish.y) {
    fish.vy = -fish.speed;
  } else if (mouseY < fish.y) {
    fish.vy = fish.speed;
  }

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
  fill(fish.fill.r, fish.fill.g, fish.fill.b, fish.fill.a);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

function moveCupid() {
  //move cupid according to cursor position
  if (mouseX > cupid.x) {
    cupid.vx = cupid.speed;
  } else if (mouseX < cupid.x) {
    cupid.vx = -cupid.speed;
  }

  if (mouseY > cupid.y) {
    cupid.vy = cupid.speed;
  } else if (mouseY < cupid.y) {
    cupid.vy = -cupid.speed;
  }

  cupid.x = cupid.x + cupid.vx;
  cupid.y = cupid.y + cupid.vy;
}

function displayCupid() {
  imageMode(CENTER);
  image(cupid.image, cupid.x, cupid.y, 70, 50);
}

function displaySpecialFish() {
  image(specialFish1.image, specialFish1.x, specialFish1.y);
  image(specialFish2.image, specialFish2.x, specialFish2.y);
}

function mousePressed() {
  let fish = createFish(mouseX, mouseY); // Create a fish at the mouse position
  school.push(fish); // Add the fish to our array
  // Now the school array has our new fish and it will be moved and drawn
  // with all the others in the for loop!
}
