/**************************************************
Dodging COVID-19
Leanne Suen Fa

COVID-19, represented by a red circle, will move from the left side of the canvas to the right at a random y position. Each time it reaches the right side, it will reset to the left at a random y position. The user will control their own circle with the mouse position. If the COVID-19 circle touches the user circle, everything stops! In the background we see random static for visual flair and we don’t see the mouse cursor.
**************************************************/

Let covid19 = {
  x : 0,
  y : 250,
  size : 100,
  vx : 0,
  vy : 0,
  speed : 5,
  fill : {
    r : 255,
    g :0,
    b :0
  }
};


function setup() {
createCanvas (windowWidth, windowHeight);

covid19.y = random(0, height);

covid19.vx = covid19.speed ;
}


function draw() {

  background(0);

}
