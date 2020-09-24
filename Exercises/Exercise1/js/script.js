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
};

let sun = {
  x: 200,
  y: 70,
  d: 100,
  fill: 255,
  a: 200

};

let catface = {
  fill : 0,
  earL: 100,
  earR : 350,
  earWidth: 100,
  earWidthRatio : 2,
  headTop : 550,
  earHeight : 500,
  chin: 700
};

let catEye = {
  r: 255,
  g: 200,
  b: 0,
  x : 180,
  y: 650,
  d : 100,
  RtoL : 2

}

let catpupil = {
  d : 20,
  h : 80
};

let mountain1 = {
  x1 : -300,
  y1 : 700,
  x2 : 100,
  y2 : 300,
  x3 : 350,
  y3 : 700,
  fill_r : 166,
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
  fill_r : 92,
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
cloud2.x = cloud2.x + cloud2.speed ; //cloud moves across screen
cloud2.x = constrain(cloud2.x, 10, width); //cloud cannot go further than canva width
fill (cloud2.fill);
ellipse (cloud2.x, cloud2.y, cloud2.d); //main ellipse
//cloud is made of a group of ellipses with relative position to main ellipse
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
cloud1.x = cloud1.x + cloud1.speed ; //cloud moves across screen
cloud1.x = constrain(cloud1.x, 10, width); //cloud cannot go further than canva width
fill (cloud1.fill);
ellipse (cloud1.x, cloud1.y, cloud1.d); //main ellipse
//cloud is made of a group of ellipses with relative position to main ellipse
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
beginShape();
vertex(catface.earL,catface.chin);
vertex(catface.earL,catface.earHeight);
vertex(catface.earL + catface.earWidth,catface.headTop);
vertex(catface.earL + catface.earWidth,catface.headTop);
vertex(catface.earR, catface.headTop);
vertex(catface.earR + catface.earWidth/catface.earWidthRatio ,catface.earHeight);
vertex(catface.earR + catface.earWidth/catface.earWidthRatio,catface.chin);
endShape();

//cateye
fill(catEye.r, catEye.g, catEye.b);
ellipse(catEye.x, catEye.y, catEye.d); //L
ellipse(catEye.x * catEye.RtoL, catEye.y, catEye.d); //R

//catpupil
fill(0);
catpupil.d = map(sun.y, 70, 600,20,80); //cat pupil responds to sun position
ellipse(catEye.x, catEye.y,catpupil.d, catpupil.h); //L
ellipse(catEye.x * catEye.RtoL, catEye.y,catpupil.d, catpupil.h); //R

}
