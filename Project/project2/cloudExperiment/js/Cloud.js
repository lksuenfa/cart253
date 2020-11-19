class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = 0.1;
    this.cloudImageNum = random(0, 4);
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
    image(clouds[this.cloudImageNum], this.x, this.y);
  }
}
