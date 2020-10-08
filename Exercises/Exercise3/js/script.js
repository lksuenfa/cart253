
/**************************************************
Exercise 03: Love, actually
Leanne Suen Fa

(x) Allow the user to control one of the circles
( ) Make the non-user circle move differently
( ) Add at least one extra function, Not including functions any built-in p5 functions like keyPressed()
( ) Add at least one extra ending
********************************************/

let circle1 = {
  x: 150,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 5,
  noise: 0.003

}
let circle2 = {
  x: 350,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 1
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
    love();
  }
  else if (state == `sadness`) {
    sadness();
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

function love(){
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER, CENTER);
  text(`LOVE!`, width/2, height/2);
  pop();
}


function sadness(){
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER, CENTER);
  text(`:(`, width/2, height/2);
  pop();
}

//Move circles
function move() {

  //circle 1 moves randomly using Perlin noise

  circle1.speed = random (-circle1.noise,circle1.noise*10);

  circle1.vx = circle1.vx + circle1.speed ;

  circle1.speed = random (-circle1.noise,circle1.noise*15);
  circle1.vy = circle1.vy + circle1.speed ;


  circle1.x = noise(circle1.vx);
  circle1.x = map(circle1.x, 0, 1, 0, width);

  circle1.y = noise(circle1.vy);
  circle1.y = map(circle1.y, 0, 1, 0 ,height);


  //circle 2 follows cursor
  if (mouseX > circle2.x) {
     circle2.vx = circle2.speed;
   }
   else if (mouseX < circle2.x) {
     circle2.vx = -circle2.speed;
   }

   if (mouseY > circle2.y) {
     circle2.vy = circle2.speed;
   }
   else if (mouseY < circle2.y) {
     circle2.vy = -circle2.speed;
   }

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

//checkif circles have gone offscreen
function checkOffScreen() {
  if (isOffScreen(circle1) || isOffScreen(circle2)) {
    state = `sadness`;
  }
}

function isOffScreen(circle){
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  }
  else {
    return false;
  }
}

//check if circles overlap
function checkOverlap(){

  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < (circle1.size/2 + circle2.size/2) ) {
    state = `love`;
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
