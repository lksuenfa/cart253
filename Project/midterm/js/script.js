
//how do produce objects at random location without it looking like it's changing position randomly
// how to produce multiple moving objects

let moth = {
  x : 0,
  y : 0,
  size : 10,
  vx : 0,
  vy : 0,
  speed : 5,
  noise : 0.001,
  fill : {
    r: 255,
    g: 230,
    b: 250,
    a : 100

  }
};

let bat = {
  x : 500,
  y : 500,
  size : 50,
  vx : 0,
  vy : 0,
  speed :2,
  fill :{
    r : 240,
    g : 236,
    b : 5

  }
}

let echoLoc = {
  size : 10,
  fill : 0,
  stroke : {
    r : 0,
    g : 255,
    b : 0,
  }
}

let bkg = {
x : 0,
y : 0,
image : undefined,
};

function preload() {
bkg.image = loadImage("assets/images/nightSky.svg");
}


function setup() {
createCanvas(windowWidth, windowHeight);

noStroke();

}



function draw() {

background(10, 27, 38);

image(bkg.image, bkg.x, bkg.y, width, height);

move();
display();
echolocation();


// //EAT moth
// let d = dist(bat.x, bat.y, moth.x, moth.y);
// if (d < bat.size/2 + moth.size/2) {
//   //moth eaten
// }
//

}







function move(){
  //moth movement
  // //move x
  moth.speed = random(moth.noise, moth.noise*5);
  moth.vx = moth.vx + moth.speed;
  moth.x = noise(moth.vx);
  moth.x = map(moth.x, 0, 1, 0, width);

  //moth y
  moth.speed = random(-moth.noise, moth.noise*10);
  moth.vy = moth.vy + moth.speed;
  moth.y = noise(moth.vy);
  moth.y = map(moth.y, 0, 1, 0, height);


//move bat
  if (mouseX > bat.x) {
     bat.vx = bat.speed;
   }
   else if (mouseX < bat.x) {
     bat.vx = -bat.speed;
   }

   if (mouseY > bat.y) {
     bat.vy = bat.speed;
   }
   else if (mouseY < bat.y) {
     bat.vy = -bat.speed;
   }
  bat.x = bat.x + bat.vx;
  bat.y = bat.y + bat.vy;

}

function echolocation() {
if (mouseIsPressed) {
  echoLoc.size = echoLoc.size + 50;
  echoLoc.size = constrain(echoLoc.size, 10, height/2);
}
else  echoLoc.size = 10;

let d = dist(bat.x, bat.y, moth.x, moth.y);

if (d < echoLoc.size/2 + moth.size/2) {
  moth.fill.a = 255;
}
else moth.fill.a = 0; //moth cannot be seen out of echolocation circle

}




function display() {
//Display
  push();
  fill(moth.fill.r, moth.fill.g, moth.fill.b, moth.fill.a);
  ellipse(moth.x, moth.y, moth.size);
  pop();


  fill(bat.fill.r, bat.fill.g, bat.fill.b);
  ellipse(bat.x, bat.y, bat.size);

  push();
  noFill();
  stroke( echoLoc.stroke.r, echoLoc.stroke.g, echoLoc.stroke.b);
  ellipse(bat.x, bat.y, echoLoc.size);
  pop();



}
