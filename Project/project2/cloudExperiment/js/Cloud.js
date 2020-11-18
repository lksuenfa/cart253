class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = 0.1;

    this.numClouds = 0;
    this.cloudImageNum = random(0, 4);
  }

  move() {
    this.x = this.x + this.speed;
    this.x = constrain(this.x, 0, width);

    if (this.x > width + 50) {
      this.x = 0;
    }
  }

  display() {
    imageMode(CENTER);
    image(cloudImages[this.cloudImageNum], this.x, this.y);
  }

  //create cloudy sky
  checkClouds() {
    //amount of clouds appearing depend on cloud data % from openweathermap
    let cloudData = weatherData.clouds.all;
    if (cloudData <= 10) {
      numClouds = 0;
    } else if (cloudData > 10 && cloudData < 25) {
      numClouds = 1;
    } else if (cloudData > 25 && cloudData < 50) {
      numClouds = 2;
    } else if (cloudData > 50 && cloudData < 75) {
      numClouds = 4;
    } else {
      numClouds = 6;
    }
  }
}
