"use strict";

/**************************************************
Testing sound
Pippin Barr

Sundew with ghostly droplets appearing only at night
**************************************************/

let rock = {
  x: 200,
  y: 570,
  img: undefined,
};

let ground = {
  x: 0,
  y: 600,
  fill: {
    r: 94,
    b: 125,
    g: 103,
  },
  height: 100,
};

let sundew = {
  x: 0,
  y: 610,
  img: [],
  growthStage: 0,
  growthRate: 500,
  maxStages: 3,
};

let sundewDrops = {
  drops: [],
  numDrops: 20,
  timer: 0,
  delay: 60 * 3,
};

function preload() {
  rock.img = loadImage("assets/images/rock.png");

  //load Sundew growth stages
  sundew.img[0] = loadImage("assets/images/sundewBaby.png");
  sundew.img[1] = loadImage("assets/images/sundewTeen.png");
  sundew.img[2] = loadImage("assets/images/sundewAdult.png");
  sundew.img[3] = loadImage("assets/images/sundewPink.png");
}

function setup() {
  createCanvas(400, 700);
  userStartAudio();
  sundew.x = random(0, width);

  //timer to display a new stage of sundew growth according to growthRate
  setTimeout(growSundew, sundew.growthRate);

  //create drops
  //randomise number of drops to create
  sundewDrops.numDrops = random(10, 20);

  //place dew drops at random places close to sundew plant
  for (let i = 0; i < sundewDrops.numDrops; i++) {
    let randomX = 200;
    let randomY = 300;
    let x = random(sundew.x - randomX, sundew.y + randomX);
    let y = random(sundew.y, sundew.y - randomY);
    let drop = new Drops(x, y);
    sundewDrops.drops.push(drop);
  }
}

function draw() {
  background(70, 88, 117);
  display();
}

function growSundew() {
  // Increase growthStage by 1 one to display next slot in array and don't go beyond max stages
  for (let i = 0; i < sundew.maxStages; i++) {
    sundew.growthStage++;
  }
}

function display() {
  //display ground
  push();
  noStroke();
  fill(ground.fill.r, ground.fill.g, ground.fill.r);
  rect(ground.x, ground.y, width, ground.height);
  pop();

  //sundew
  imageMode(CENTER);
  image(sundew.img[sundew.growthStage], sundew.x, sundew.y);

  //Sundew Drops
  //drops appear only at final growth stage and start growing till max size
  if (sundew.growthStage === sundew.maxStages) {
    for (let i = 0; i < sundewDrops.drops.length; i++) {
      let drop = sundewDrops.drops[i];
      drop.display();
      drop.grow();
      drop.move();

      if (drop.x > width || drop.x < 0 || drop.y < 0 || drop.y > height) {
        sundewDrops.drops.splice(i, 1);
      }
    }

    // addDew();
  }

  //adding this code makes live server crash

  // function addDew() {
  //   sundewDrops.timer++;
  //   if (sundewDrops.timer > sundewDrops.delay) {
  //     for (let i = 0; i < sundewDrops.drops.length; i++) {
  //       let x = random(0, width);
  //       let y = random(0, height);
  //       let drop = new Drops(x, y);
  //       sundewDrops.drops.push(drop);
  //       sundewDrops.timer = 0;
  //     }
  //   }
  // }

  // //display rock
  // imageMode(CENTER);
  // image(rock.img, rock.x, rock.y, 300, 200);

  // function mousePressed() {
  //   for (let i = 0; i < sundewDrops.drops.length; i++) {
  //     let drop = sundewDrops.drops[i];
  //     drop.mousePressed();
  //   }
}
