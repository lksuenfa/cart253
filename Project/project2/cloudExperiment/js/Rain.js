class Rain {
  constructor(x, raining) {
    this.x = x;
    this.y = 0;
    this.height = 5;
    this.width = 2;
    this.colour = {
      r: 245,
      b: 245,
      c: 245,
      a: 200,
    };
    this.speed = 5;

    this.raining = raining; //data from weather API checking rain
  }

  rainFalls() {
    // show rain falling before touching the ground which is at y = 600
    this.y += this.speed;
    // if touch the ground rain disappeears
    if (this.y > 600) {
      this.colour.a = 0;
    }
  }

  // rain looks like transparent rectangular bars
  displayRain() {
    if (raining === true) {
      push();
      noStroke();
      fill(this.colour.r, this.colour.b, this.colour.c, this.colour.a);
      rect(this.x, this.y, this.width, this.height);
      pop();
    }
  }
}
