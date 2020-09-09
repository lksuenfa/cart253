/**************************************************v
Activity 02: Started the draw an alien activity
Leanne Suen Fa

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {

createCanvas (500,500);//size of canvas

background(193, 236, 247);//colour of canvas in RBG : pale blue

rectMode(CENTER); //location attribute of shape

//Body
noStroke();



fill(219, 187, 123);
  rect(260,260,305,405,54);

fill(250, 66, 5);
  rect(250,250,300,400,54);

fill(168, 13, 81, 90);
  rect(270, 270, 200, 300, 180, 45);

rectMode(CORNER);
  fill(255, 140, 161, 150);
    rect(120, 100, 20, 300, 54, 54);



//Eyes
noStroke();
fill(0,0,0);
  ellipse(170,200, 80, 90); //Left eye
  ellipse(310,200, 80, 90); //Right eye


  //smile

  noStroke();
  fill(0,0,0);
  rect(250,270,50,5,54)


}


// draw()
//
// Description of draw() goes here.
function draw() {

}
