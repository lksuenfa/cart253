
//how do produce objects at random location without it looking like it's changing position randomly
// how to produce multiple moving objects

let moth = {
  x : 250,
  y : 250,
  image: undefined,
  size : 10,
  vx : 0,
  vy : 0,
  speed : 10,
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
  image: undefined,
  vx : 0,
  vy : 0,
  speed :2,
  fill :{
    r : 240,
    g : 236,
    b : 200

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

let hungerBar = {
  x : 100,
  y : 100,
  height: 5,
  active: {
    width : 250,
    fill : {
      r : 255,
      g : 217,
      b : 0,
    }
  },
  inactive : {
    width : 500,
    fill : {
      r : 89,
      g : 89,
      b : 89,
    }
  }
};

function preload() {
bkg.image = loadImage("assets/images/nightSky.svg");

moth.image = loadImage("assets/images/moth.png");

bat.image = loadImage("assets/images/bat.png");

}


function setup() {
createCanvas(windowWidth, windowHeight);

noStroke();

//hunger Bar initial appearance
rectMode(CORNER);
hungerBar.x = width/8;
hungerBar.y = height - 50;
hungerBar.inactive.width = (width - width/4);


}



function draw() {

background(10, 27, 38);

image(bkg.image, bkg.x, bkg.y, width, height);

move();
eatMoth();
display();
echolocation();


}







function move(){
  moth.vx = random(-moth.speed, moth.speed);
  moth.vy = random(-moth.speed, moth.speed);

  moth.x = moth.x + moth.vx;
  moth.y = moth.y + moth.vy;
  // //moth movement using Perlin noise
  // //move x
  // moth.speed = random(moth.noise, moth.noise*5);
  // moth.vx = moth.vx + moth.speed;
  // moth.x = noise(moth.vx);
  // moth.x = map(moth.x, 0, 1, 0, width);
  //
  // //moth y
  // moth.speed = random(-moth.noise, moth.noise*10);
  // moth.vy = moth.vy + moth.speed;
  // moth.y = noise(moth.vy);
  // moth.y = map(moth.y, 0, 1, 0, height );

//constrain moth within screen
  moth.x = constrain(moth.x, 100, width - 100);
  moth.y = constrain (moth.y, 100, height - 100);


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

//if click mouse, echolocation circle enlarges and moth can be seen
if (mouseIsPressed) {
  echoLoc.size = echoLoc.size + 50;
  echoLoc.size = constrain(echoLoc.size, 10, height/2);
  //if echolocation circle gets too big, go back to small
  if (echoLoc.size > 300) {
    echoLoc.size = 10;
  };
}
else  echoLoc.size = 10;

let d = dist(bat.x, bat.y, moth.x, moth.y);

if (d < echoLoc.size/2 + moth.size/2) {
  moth.fill.a = 255; //no transparency
}
else moth.fill.a = 0; //moth cannot be seen out of echolocation circle

}


function eatMoth() {
//EAT moth


let d = dist(bat.x, bat.y, moth.x, moth.y);
//moth eaten
if (d < bat.size/2 + moth.size/2) {

//if bat catches moth, stomach fills so hunger bar because more yellow
hungerBar.active.width = hungerBar.active.width + 100;
hungerBar.active.width = constrain(hungerBar.active.width, 0, hungerBar.inactive.width);

//moth teleports and bat starts looking again
moth.x = random(0,width);
moth.y = random(0,height);


}
else  {
  //stomach fullness decreases as bat spends energy looking for moths
  hungerBar.active.width = hungerBar.active.width - 0.1;

}
}


function display() {
//Display
  push();
  imageMode(CENTER);
  tint(moth.fill.r, moth.fill.g, moth.fill.b, moth.fill.a);
  image(moth.image, moth.x, moth.y);
  pop();

  push();
  imageMode(CENTER);
  image(bat.image, bat.x, bat.y);
  pop();

  push();
  noFill();
  stroke( echoLoc.stroke.r, echoLoc.stroke.g, echoLoc.stroke.b);
  ellipse(bat.x, bat.y, echoLoc.size);
  pop();

  push();
  fill(hungerBar.inactive.fill.r, hungerBar.inactive.fill.g, hungerBar.inactive.fill.r);
  rect(hungerBar.x, hungerBar.y, hungerBar.inactive.width, hungerBar.height);
  pop();

  push();
  fill(hungerBar.active.fill.r, hungerBar.active.fill.g, hungerBar.active.fill.b);
  rect(hungerBar.x, hungerBar.y, hungerBar.active.width, hungerBar.height);
  pop();
}
