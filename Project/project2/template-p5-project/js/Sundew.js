class Sundew {
  constructor(x, y, img) {
    this.x = random(0, width);
    this.y = 610;
    this.img = img;
    this.growthRate = 10000; //10 secs
  }

  grow() {
    this.img = img;
  }
}
