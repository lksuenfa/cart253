class Cloud {
  constructor(x, y, cloudImage) {
    this.x = x;
    this.y = y;
    this.speed = random(0.1, 0.5);
    this.cloudImage = cloudImage;

    //clouds need to travel beyond canvas width by that much so that it does not seem like clouds appear out of nowhere but moves smoothly across the screen
    this.margin = 100;
  }

  move() {
    //move cloud
    this.x = this.x + this.speed;

    //reset cloud position if it moves beyond canvas
    if (this.x > width + this.margin) {
      this.x = -this.margin;
    }
  }

  //display cloud
  display() {
    imageMode(CENTER);
    image(this.cloudImage, this.x, this.y);
  }
}
