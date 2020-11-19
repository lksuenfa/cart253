class Cloud {
  constructor(x, y, cloudImage) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = random(0.1, 0.3);
    this.cloudImage = cloudImage;
  }

  move() {
    this.x = this.x + this.speed;
    this.x = constrain(this.x, 0, width);

    if (this.x > width + 50) {
      this.x = 0;
    }
  }

  display() {
    imageMode(CENTER);
    image(this.cloudImage, this.x, this.y);
  }
}
