class Cloud {
  constructor() {
    this.x = 0;
    this.y = random(100, 400);
    this.size = 50;

    this.cloudColour = {
      r: 240,
      g: 240,
      b: 240,
    };
    this.speed = 0.05;
  }

  move() {
    this.x = this.x + this.speed;
    this.x = constrain(this.x, 0, width);

    if (this.x > width + 50) {
      this.x = 0;
    }
  }

  display() {
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
