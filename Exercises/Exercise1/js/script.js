/**************************************************
Exercise 01: I like to move it move it!
Leanne Suen Fa

Make the sun set and watch the kitty's eyes dilate while the wind blows the clouds gently
**************************************************/

// setup()
////declaring variables

let bg = {
  r: 255,
  g: 200,
  b: 0
  //yellow = 255, 200, 0
};



let sun = {
  x: 200,
  y: 70,
  d: 100,
  fill: 255,
  a: 200

};


// Description of setup() goes here.
function setup() {
createCanvas(400, 700);
noStroke();

}

// draw()
//
// Description of draw() goes here.
function draw() {

//background
background(bg.r, bg.g, bg.b); //yellow background
bg.g = map(sun.y,70,600,200,70); //change to redder background as sun goes down

//draw sun
sun.y = mouseY; //make sun move vertically
sun.y = constrain(sun.y,70,600); //constrain sun movement
fill(sun.fill, sun.a);
ellipse(sun.x, sun.y, sun.d);




}
