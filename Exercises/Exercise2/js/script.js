/**************************************************
Exercise 02: Dodge-em
Leanne Suen Fa

If covid19 touches user, it gets contaminated and turns same colour while increasing in size. Game stops if user gets too big.

**************************************************/
let covid19 = {
  x : 0,
  y : 250,
  size : 100,
  vx : 0,
  vy : 0,
  speed : 40,
  fill : {
    r : 255,
    g :0,
    b :0
  }
};


let bkg ={
x : 0,
y : 0,
image : undefined,
};

function preload() {
bkg.image = loadImage("assets/images/dragon.svg");

}

function setup() {
createCanvas (windowWidth, windowHeight);

covid19.y = random(0, height);
covid19.vx = covid19.speed ;

}

let user = {
  x : 500,
  y : 250,
  size : 100,
  fill : {
    r : 255,
    b : 255,
    g :255
  },
  vx : 0,
  vy : 0,
  speed: 10,
  maxDist: 200,
};

function draw() {

  background(23, 33, 33);

  image(bkg.image, bkg.x, bkg.y, width,height);
  tint(255,255,255,50);


//Covid19 movement
  covid19.x = covid19.x + covid19.vx ;
  covid19.y = covid19.y + covid19.vy ;

//if covid19 goes past screen
  if (covid19.x > width) {

//come back to starting point at a different y
    covid19.x = 0;
    covid19.y = random(0, height);

//with a different colour
    covid19.fill.r = random (0,255);
    covid19.fill.g = random (0,255);
    covid19.fill.b = random (0,255);
  }

//user movement controlled by mouse

  if (mouseY > user.y) {
    user.vy = user.speed;
  }
  else if (mouseY < user.y) {
    user.vy = -user.speed;
  };

  user.x = width -  user.maxDist; //constrain user movement to a vertical axis
  user.y = user.y + user.vy;

//contaminated user turns same colour as covid19 when they touch
  let d = dist(user.x, user.y, covid19.x, covid19.y);

  if (d < (covid19.size/2 + user.size/2)) {

     user.fill.r = covid19.fill.r ;
     user.fill.g = covid19.fill.g ;
     user.fill.b = covid19.fill.b ;

//if they touch go back to starting point
     covid19.x = 0;
     covid19.y = random(0,height);

//user increases in size and loses speed when it gets hit
     user.size = user.size + 20 ;
     user.speed = user.speed -1;
  };

//if user gets hit too much, it stops
  if (user.size > height/3) {
    noLoop();
  }


//Display covid19
  fill(covid19.fill.r, covid19.fill.g, covid19.fill.b );
  noStroke();
  ellipse(covid19.x, covid19.y, covid19.size);


//Display user
fill(user.fill.r, user.fill.g, user.fill.b);
ellipse(user.x, user.y, user.size);


}
