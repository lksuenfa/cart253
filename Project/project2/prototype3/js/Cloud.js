class Cloud {
  constructor(x, y, cloudData) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = 0.1;

    this.cloudData = cloudData;
    this.numClouds = 0;
  }

  //create cloudy sky
  checkClouds() {
    //amount of clouds appearing depend on cloud data from openweathermap
    if (this.cloudData <= 15) {
      this.numClouds = 0;
    } else if (this.cloudData > 15 && this.cloudData < 25) {
      this.numClouds = 1;
    } else if (this.cloudData > 25 && this.cloudData < 50) {
      this.numClouds = 2;
    } else if (his.cloudData > 50 && his.cloudData < 75) {
      this.numClouds = 4;
    } else {
      this.numClouds = 6;
    }
  }

  move() {
    this.x = this.x + this.speed;
    this.x = constrain(this.x, 0, width);

    if (this.x > width + 50) {
      this.x = 0;
    }
  }
}
