// Does not work

class Grass extends Plant {
  constructor(x, y) {
    super(x, y);
    this.stemLength = 15;
    this.stemThickness = 2;
    this.growthRate = 0.01;
    this.maxHeight = 50;
  }
  // grow() {
  //   if (this.stemLength < this.maxHeight) {
  //     this.stemLength = this.stemLength + this.growthRate;
  //     this.y = this.y - this.growthRate;
  //   }
  // }

  display() {
    super.display();
    push();
    noStroke();
    stroke(37, 138, 116);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    pop();
  }
}
//
