class Garden {
  constructor(growthOrder, growthInterval) {
    this.x = random(0, width);
    this.y = random(600, 650);
    // this.img = img;
    this.growthOrder = growthOrder;
    this.growthInterval = growthInterval; //5s
    // this.multipleInterval = 1; //multiple of growth interval to time next stage to appear later by a multiple amount of time

    setInterval(this.grow.bind(this), this.growthInterval);
  }

  grow() {
    this.growthOrder++;

    if (this.growthOrder >= gardenImages.length) {
      this.growthOrder = gardenImages.length - 1;
    }
  }

  display() {
    imageMode(CENTER);
    image(gardenImages[this.growthOrder], this.x, this.y);
  }
}
