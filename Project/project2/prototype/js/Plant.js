// does not work

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.stemLength = undefined;
    this.stemThickness = undefined;
    this.growthRate = undefined;
    this.maxHeight = undefined;
  }

  grow() {
    if (this.stemLength < this.maxHeight) {
      this.stemLength = this.stemLength + this.growthRate;
      this.y = this.y - this.growthRate;
    }
  }

  display() {}
}
