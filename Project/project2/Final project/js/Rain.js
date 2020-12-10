class Rain {
  constructor() {
    this.x = random(0, width);
    this.y = random(-900, 0); //start appearing way above the canvas so that they don't fall in one line at the same speed
    this.length = random(3, 7);
    this.ground = 600;
    this.width = 2;
    (this.colour = 245), (this.speed = 5);
  }

  move() {
    // show rain falling before touching the ground which is at y = 600
    this.y += this.speed;
    // if touch the ground rain goes back up
    if (this.y > this.ground) {
      this.y = random(-500, -200);
    }
  }

  display() {
    push();
    stroke(this.colour);
    line(this.x, this.y, this.x, this.y + this.length);
    pop();
  }
}
