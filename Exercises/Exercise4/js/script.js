// (x ) Add a user-controlled shape (or image)
// (x ) Make the user interact with the fish
// (x ) Change the fish (or whatever) creation
// ( ) Add at least two endings

"use strict";

let school = []; // Create an empty array and assign it to the school variable
let schoolSize = 120; //length of array

let cupid = {
  x: 500,
  y: 500,
  size: 70,
  vy: 0,
  vy: 0,
  speed: 0.5,
  image: undefined,
};

let yourFish = {
  x: 250,
  y: 250,
  size: 50,
  vy: 0,
  vy: 0,
  speed: 1,
  image: undefined,
};

let enemyFish = {
  x: 50,
  y: 50,
  size: 50,
  vy: 0,
  vy: 0,
  speed: 1,
  image: undefined,
};

let state = `title`; //endings can be win or loss

//Preload images
function preload() {
  cupid.image = loadImage("assets/images/cupid.svg");
  yourFish.image = loadImage("assets/images/specialFish1.svg");
  enemyFish.image = loadImage("assets/images/specialFish2.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create four fish, positioned randomly
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

//create fish
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y, r) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 0.5,
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

  simulation();

  switch (state) {
    case `title`:
      title();
      break;

    case `simulation`:
      simulation();
      break;

    case `win`:
      win();
      break;

    case `loss`:
      loss();
      break;
  }
}

//Display title message
function title() {
  push();
  background(230, 236, 237);
  textSize(30);
  fill(109, 151, 181);
  textAlign(CENTER, CENTER);
  text(
    `You're UGLY, all fish will try to stay away from you. \n Find your fish before somewhere else takes it`,
    width / 2,
    height / 2
  );

  textSize(20);
  text(`Click to start`, width / 2, height / 2 + 100);
  pop();
}

//Display winning message
function win() {
  push();
  background(230, 236, 237, 150);
  textSize(30);
  fill(109, 151, 181);
  textAlign(CENTER, CENTER);
  text(`You found your special fish <3`, width / 2, height / 2);
  pop();
}

//Display losing message
function loss() {
  push();
  background(230, 236, 237, 150);
  textSize(30);
  fill(109, 151, 181);
  textAlign(CENTER, CENTER);
  text(`Forever single fish :(`, width / 2, height / 2);
  pop();
}

// Find your special fish
function winFish() {
  //if user touches
  let d = dist(cupid.x, cupid.y, yourFish.x, yourFish.y);

  if (d < cupid.size / 2 + yourFish.size / 2) {
    state = `win`;
  }
}
// Lose your special fish to another special fish
function loseFish() {
  //if user touches
  let d = dist(enemyFish.x, enemyFish.y, yourFish.x, yourFish.y);

  if (d < enemyFish.size / 2 + enemyFish.size / 2) {
    state = `lose`;
  }
}

//Game simulation
function simulation() {
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

  //specialFish
  moveFish(yourFish);
  moveFish(enemyFish);

  //display user and special fish
  display();

  //states
  winFish();
  loseFish();
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
    fish.x = random(0, width);
  } else if (fish.y === 0 || fish.y === height) {
    fish.y = random(0, height);
  }

  //  Move the fish away from user
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

//Display
function display() {
  imageMode(CENTER);
  image(cupid.image, cupid.x, cupid.y, cupid.size, cupid.size - 20);
  image(yourFish.image, yourFish.x, yourFish.y, yourFish.size);
  image(enemyFish.image, enemyFish.x, enemyFish.y, enemyFish.size);
}

function mousePressed() {
  //change state at first mouse click to begin game
  if (state == `title`) {
    state = `simulation`;
  }
  // let fish = createFish(mouseX, mouseY); // Create a fish at the mouse position
  // school.push(fish); // Add the fish to our array
  // // Now the school array has our new fish and it will be moved and drawn
  // // with all the others in the for loop!
}
