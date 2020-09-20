/**************************************************
A3 - moving pictures
Leanne Suen Fa

Description:
Two circles, the left one bigger and more transparent than the right, come in from either side of the screen, growing as they do so. They stop in the centre while still growing. The background goes from black to red.

**************************************************/

// setup()
////declaring variables

let bg = {
  r: 0,
  g: 0,
  b: 0
};

let circle1 = {
  x: 0,
  y: 250,
  d: 100,
  growthRate :1,
  speed : 1,
  fill: 255,
  alpha : 200
};

let circle2 = {
  x: 500,
  y: 250,
  d: 50,
  sizeRatio : 0.75, //ratio to circle 1 size
  speed : -1,
  fill: 255,
  alpha : 200
};

// Description of setup() goes here.
function setup() {
createCanvas(500, 500);
circle1.y = height/2;
circle2.y = height/2;
circle2.x = width;
noStroke();

}

// draw()
//
// Description of draw() goes here.
function draw() {

//background
background(bg.r, bg.g, bg.b);
bg.r = map (circle1.d,100,width,0,255);

//*****Circle1 (left)****
//make circle1 move
circle1.x = circle1.x + circle1.speed;
circle1.x = constrain(circle1.x,0, width/2);

//make circle1 grow
circle1.d = circle1.d + circle1.growthRate;
circle1.d = constrain(circle1.d,0, width);

//create circle 1
fill(circle1.fill, circle1.alpha);
ellipse( circle1.x, circle1.y, circle1.d);


//*****circle2 (right)****
//make circle2 move
circle2.x = circle2.x + circle2.speed;
circle2.x = constrain(circle2.x, width/2, width);

//make circle2 grow
circle2.d = circle1.d*circle2.sizeRatio;

//create circle2
fill(circle2.fill, circle2.alpha);
ellipse(circle2.x, circle2.y, circle2.d);


}
