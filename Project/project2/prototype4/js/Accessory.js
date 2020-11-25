class Accessory {
  constructor(image) {
    this.icon = {
      x: width - 30,
      y: height / 2,
      image: image,
    };
    this.state = `simulation`;
  }

  //display icon
  display() {
    imageMode(CENTER);
    image(this.icon.image, this.icon.x, this.icon.y, 40, 25);
  }

  //change state on click to make window appear
  mousePressed() {
    let d = dist(this.icon.x, this.icon.y, mouseX, mouseY);
    this.state = `accessory`;
  }
}
