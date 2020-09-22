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

let mountain1 = {
  x1 : -300,
  y1 : 700,
  x2 : 100,
  y2 : 300,
  x3 : 350,
  y3 : 700,
  fill_r : 166,  //99, 0, 30
  fill_g : 0,
  fill_b : 58,
};

let mountain2 = {
  x1 : -300,
  y1 : 700,
  x2 : 300,
  y2 : 475,
  x3 : 700,
  y3 : 700,
  fill_r : 92,  //92, 0, 31
  fill_g : 0,
  fill_b : 31,
};

let cloud1 ={
  x : 0,
  y : 500,
  d : 40,
  fill : 255,
  speed : 0.1
};

let cloud2 ={
  x : 100,
  y : 400,
  d : 30,
  fill : 255,
  speed : 0.125
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



//THE ONE AND ONLY SUN!!
sun.y = mouseY; //make sun move vertically
sun.y = constrain(sun.y,70,600); //constrain sun movement
fill(sun.fill, sun.a);
ellipse(sun.x, sun.y, sun.d);


//MOUNTAIN AND CLOUDS
//cloud2 behind mountain1
cloud2.x = cloud2.x + cloud2.speed ;
cloud2.x = constrain(cloud2.x, 10, width);
fill (cloud2.fill);
ellipse (cloud2.x, cloud2.y, cloud2.d);
ellipse (cloud2.x + 30, cloud2.y + 10, cloud2.d);
ellipse (cloud2.x + 60, cloud2.y + -5, cloud2.d + 10);
ellipse (cloud2.x + 30, cloud2.y + -10, cloud2.d + 10);
ellipse (cloud2.x + 50, cloud2.y + -30, cloud2.d + 15);
ellipse (cloud2.x + 50, cloud2.y + -30, cloud2.d + 15);
ellipse (cloud2.x + 80, cloud2.y, cloud2.d );

//mountain1
fill(mountain1.fill_r, mountain1.fill_g, mountain1.fill_b);
triangle(mountain1.x1, mountain1.y1, mountain1.x2, mountain1.y2, mountain1.x3, mountain1.y3);

//cloud1 behind mountain2
cloud1.x = cloud1.x + cloud1.speed ;
cloud1.x = constrain(cloud1.x, 10, width);
fill (cloud1.fill);
ellipse (cloud1.x, cloud1.y, cloud1.d);
ellipse (cloud1.x + 30, cloud1.y + 10, cloud1.d);
ellipse (cloud1.x + 60, cloud1.y + -5, cloud1.d + 10);
ellipse (cloud1.x + 30, cloud1.y + -10, cloud1.d + 10);
ellipse (cloud1.x + 50, cloud1.y + -30, cloud1.d + 15);
ellipse (cloud1.x + 50, cloud1.y + -30, cloud1.d + 15);
ellipse (cloud1.x + 80, cloud1.y, cloud1.d );

//mountain2
fill(mountain2.fill_r, mountain2.fill_g, mountain2.fill_b);
triangle(mountain2.x1, mountain2.y1, mountain2.x2, mountain2.y2, mountain2.x3, mountain2.y3);



//KITTY PHOTOBOMB!!!
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
