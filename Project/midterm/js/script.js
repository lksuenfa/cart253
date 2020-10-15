

let moth = {
  x : 250,
  y : 250,
  image: undefined,
  size : 10,
  vx : 0,
  vy : 0,
  speed : 10,
  fill : {
    r: 255,
    g: 230,
    b: 250,
    a : 0

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
  width : 500,
  fill : {
    r : 89,
    g : 89,
    b : 89,
    }
};

let activeHungerBar = {
  width : 250, //initial hunger
  maxWidth : 500,
  fill : {
    r : 255,
    g : 217,
    b : 0,
  },
  increment : 150,
  decrease : 0.1
}

let state = `title`; //can be title, dead, full, simulation

let crunchSFX;

let bkgMusic;

function preload() {
bkg.image = loadImage("assets/images/nightSky.svg");
moth.image = loadImage("assets/images/moth.png");
bat.image = loadImage("assets/images/bat.png");

crunchSFX = loadSound("assets/sounds/crunch.mp3");
bkgMusic = loadSound("assets/sounds/music.mp3");
}


function setup() {
createCanvas(windowWidth, windowHeight);
noStroke();

//hunger Bar initial appearance
rectMode(CORNER);
hungerBar.x = width/8;
hungerBar.y = height - 50;
hungerBar.width = width/4*3;

}



function draw() {

background(0);


//control screen state according to different lover outcomes
  switch (state) {
    case `title`:
      title();
      break;

    case `simulation` :
      simulation();
      break;

    case `dead` :
      dead();
      break;

    case `full` :
      full();
      break;

  };

}



//Display starting message
function title() {

  push();
  textSize(66);
  fill(109, 151, 181);
  textAlign(CENTER, CENTER);
  text(`ORLANDO is hungry`, width/2, height/2 - 80);


  textSize(26);
  text(`Help the little bat find yummy moths by \n scanning the area using echolocation.`, width/2, height/2 );

  textSize(20);
  fill(235, 222, 162);
  text(`Click to START`, width/2, height/2 + 150);
  pop();

}

//Whole game simulation
function simulation(){
  //background image
  image(bkg.image, bkg.x, bkg.y, width, height);

  move();
  eatMoth();
  checkHunger();
  display();
  echolocation();


}

//Display losing message
function dead(){


  push();
  background(255);

  textSize(64);
  fill(114, 133, 143);
  textAlign(CENTER, CENTER);
  text(`Orlando has died.`, width/2, height/2 - 100);

  textSize(26);
  text(`Because of hunger, his body grew \n weaker and weaker. As he exhaled his\n last breath, he wished for the world on the\n  other side to be warmer and kinder.`, width/2, height/2 );

  textSize(20);
  fill(247, 209, 82)
  text(`Click to <RESTART>`, width/2, height/2 + 150);
  pop();
}

//Display winning message
function full(){
  push();
  textSize(64);
  fill(242, 174, 174);
  textAlign(CENTER, CENTER);
  text(`Orlando will live.`, width/2, height/2 - 100);

  textSize(26);
  text(`Now that he's full, he's can go home, \n take a bath, snuggle under his blanket and  \nrest before the next day of survival`, width/2, height/2 );

  textSize(20);
  fill(235, 222, 162)
  text(`Click to <RESTART>`, width/2, height/2 + 150);


  pop();
}




//++++++ GAME SIMULATION +++++++++
function move(){
  //moth moves randomly
  moth.vx = random(-moth.speed, moth.speed);
  moth.vy = random(-moth.speed, moth.speed);

  moth.x = moth.x + moth.vx;
  moth.y = moth.y + moth.vy;

//constrain moth within screen
  moth.x = constrain(moth.x, 100, width - 100);
  moth.y = constrain (moth.y, 100, height - 100);


//bat moves following cursor
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
//click mouse, echolocation circle appears
if (mouseIsPressed) {
  //echolocation circle increases in size until max
  echoLoc.size = echoLoc.size + 50;
  echoLoc.size = constrain(echoLoc.size, 10, height/2); //max diameter = height/2
  //creates flashing circles after echolocation circle gets to a certain size
  if (echoLoc.size > 300) {
    echoLoc.size = 10;
  };
}
//when mouse not pressed, echolocation circle inactive
else  echoLoc.size = 10;

//if moth within echolocation circle, it becomes visible
let d = dist(bat.x, bat.y, moth.x, moth.y);
if (d < echoLoc.size/2 + moth.size/2) {
  moth.fill.a = 255; //no transparency
}
else moth.fill.a = 0; //moth cannot be seen out of echolocation circle
}




function eatMoth() {
//distance between moth and bat
let d = dist(bat.x, bat.y, moth.x, moth.y);


//moth eaten
if (d < (bat.size/2 + moth.size/2)) {

  crunchSFX.play();

  //if bat catches moth, stomach fills so hunger bar because more yellow
  activeHungerBar.width = activeHungerBar.width + activeHungerBar.increment;

  //moth teleports and bat starts looking again
  moth.x = random(width/3,width);
  moth.y = random(width/3,height);
  moth.fill.a = 0;

}
else  {
  //stomach fullness decreases as bat spends energy looking for moths
  activeHungerBar.width = activeHungerBar.width - activeHungerBar.decrease;
}

activeHungerBar.width = constrain(activeHungerBar.width, 0, hungerBar.width);


}


function checkHunger() {

  activeHungerBar.maxWidth = hungerBar.width;

//check hunger bar
  if (activeHungerBar.width === activeHungerBar.maxWidth) {
   state = `full`;
 }
   else if (activeHungerBar.width === 0) {
  state = `dead`;
  }

}

function resetGame() {
activeHungerBar.width = 250;
}



function display() {
//Display
//Moth
  push();
  imageMode(CENTER);
  tint(moth.fill.r, moth.fill.g, moth.fill.b, moth.fill.a);
  image(moth.image, moth.x, moth.y);
  pop();

//Bat
  push();
  imageMode(CENTER);
  image(bat.image, bat.x, bat.y);
  pop();

//Echolocation circle
  push();
  noFill();
  stroke( echoLoc.stroke.r, echoLoc.stroke.g, echoLoc.stroke.b);
  ellipse(bat.x, bat.y, echoLoc.size);
  pop();

//Inactive hunger bar
  push();
  fill(hungerBar.fill.r, hungerBar.fill.g, hungerBar.fill.r);
  rect(hungerBar.x, hungerBar.y, hungerBar.width, hungerBar.height);

//Active hunger bar
  fill(activeHungerBar.fill.r, activeHungerBar.fill.g, activeHungerBar.fill.b);
  rect(hungerBar.x, hungerBar.y, activeHungerBar.width, hungerBar.height);
  pop();
}


//Click to start
function mousePressed() {
  if (state ==`title`) {
    state = `simulation`;
    music();
  }
  //reset game if lost or won
  else if (state == `dead`|| state == `full`) {
    state = `title`;
    resetGame(); //hunger bar starts at original level again
  }

}

//Loop background music
function music(){
  if (!bkgMusic.isPlaying()){
    bkgMusic.loop();
  }
}
