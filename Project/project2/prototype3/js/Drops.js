class Drops {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.maxSize = 30;
    this.fill = {
      r: random(200, 255),
      g: random(200, 250),
      b: random(200, 250),
      a: 200,
    };

    //move
    this.speed = 3;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);

    //oscillator
    this.oscillator = new p5.Oscillator();
    this.minFreq = 0;
    this.maxFreq = 450;
    this.oscillator.start();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    let newFreq = map(this.y, height, 0, this.minFreq, this.maxFreq);
    this.oscillator.freq(newFreq);
  }

  grow() {
    if (this.size < this.maxSize) {
      this.size++;
    }
  }

  display() {
    push;
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
    ellipse(this.x, this.y, this.size);
    pop;
  }

  //does not ask as intended just follows cursor only when cursor in contact with it
  //dew flies aways when clicked
  // mousePressed() {
  //   let d = dist(this.x, this.y, mouseX, mouseY);
  //   if (d < this.size / 2) {
  // //     move();
  // //   }
  // }
}
