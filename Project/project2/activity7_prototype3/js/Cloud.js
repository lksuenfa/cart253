class Cloud {
  constructor(x, y, cloudImage) {
    this.x = x;
    this.y = y;
    this.speed = random(0.05, 0.1);
    this.cloudImage = cloudImage;
    //clouds need to travel beyond canvas width by that much so that it does not seem like clouds appear out of nowhere but moves smoothly across the screen
    this.margin = 200;
  }

  move() {
    this.x = this.x + this.speed;

    if (this.x > width + this.margin) {
      this.x = -this.margin;
    }
  }

  display() {
    imageMode(CENTER);
    image(this.cloudImage, this.x, this.y);
  }
}
