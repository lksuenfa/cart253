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

let catface = {
  x: 90,
  y: 550,
  w: 350,
  h : 400,
  rl: 100,
  fill: 0
};

let catpupil = {
  d : 20
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


//cat photobomb

//cat face
fill(catface.fill);
rect(catface.x,catface.y, catface.w, catface.h, catface.rl);

//catear
triangle(90,500, 300, 650, 90, 700); //L
triangle(300,650, 400, 500, 400, 700); //R

//cateye
fill(255, 200, 0);
ellipse(180, 650,100); //L
ellipse(360, 650,100); //R

//catpupil
fill(0);
catpupil.d = map(sun.y, 70, 600,20,80); //cat pupil responds to sun position
ellipse(180, 650,catpupil.d,80); //L
ellipse(360, 650,catpupil.d,80); //R



}
