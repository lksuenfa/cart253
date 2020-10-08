
/**************************************************
Looking for love
Leanne Suen Fa
**************************************************/

let circle1 = {
  x: 150,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
}
let circle2 = {
  x: 350,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
}

let state =  `title`; // can be title, simulation, love, sadness

function setup() {
  createCanvas(windowWidth, windowHeight);

  setupCircles();

}

function setupCircles() {
  //Position circles
  circle1.x = width/3;
  circle2.x = 2*width/3;

  //Start moving circle in random direction
  circle1.vx = random(-circle1.speed, circle1.speed);
  circle1.vy = random(-circle1.speed, circle1.speed);

  circle2.vx = random(-circle2.speed, circle2.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
}

function draw() {
  background(0);

  if (state == `title`) {
    title();
  }
  else if (state == `simulation`) {
      simulation();
  }
  else if (state == `love`) {

  }
  else if (state == `sadness`) {

  }
}

function title() {

  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER, CENTER);
  text(`LOVE?`, width/2, height/2);
  pop();
}

function simulation() {
  move();
  checkOffScreen();
  checkOverlap();
  display();

}
//Move circles
function move() {
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

//checkif circles have gone offscreen
function checkOffScreen() {

  if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {

    //sad ending
  }

}

//check if circles overlap
function checkOverlap(){

  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < (circle1.size/2 + circle2.size/2) ) {
    //Love ending
  };

}

//Display circles
function display() {
  ellipse(circle1.x,circle1.y,circle1.size);
  ellipse(circle2.x,circle2.y,circle2.size);
}

function mousePressed() {
  if (state==`title`) {
    state = `simulation`;
  }

}
