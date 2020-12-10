//Help was gratefully received from instructor to debug this code to make flowers grow from images changing at different intervals

class Garden {
  constructor(growthInterval) {
    this.x = random(-10, width);
    this.y = random(600, 700);

    this.growthOrder = 0;
    this.growthInterval = growthInterval;

    //change image displayed by changing image in array by increasing growthOrder
    setInterval(this.grow.bind(this), this.growthInterval);
  }

  grow() {
    this.growthOrder++;

    //if statement to limit growthOrder from increasing beyond number of elements present in the array
    if (this.growthOrder >= gardenImages.length) {
      this.growthOrder = gardenImages.length - 1;
      // this.growthOrder = 0;
    }
  }

  display() {
    imageMode(CENTER);

    //display image from array according to variable growthOrder
    image(gardenImages[this.growthOrder], this.x, this.y);
  }
}
