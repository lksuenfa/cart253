

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
    a : 0

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

function setup() {
createCanvas(windowWidth, windowHeight);
noStroke();

}


function draw() {

background(21, 53, 61);

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


//Display
  push();
  fill(moth.fill.r, moth.fill.g, moth.fill.b, moth.fill.a);
  ellipse(moth.x, moth.y, moth.size);
  pop();


  fill(bat.fill.r, bat.fill.g, bat.fill.b);
  ellipse(bat.x, bat.y, bat.size);



}
