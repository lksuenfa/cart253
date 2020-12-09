class Accessory {
  constructor(image) {
    this.ribbon = {
      x: width - 30,
      y: height / 2,
      image: image,
    };
  }

  //display icon
  display() {
    imageMode(CENTER);
    image(this.ribbon.image, this.ribbon.x, this.ribbon.y, 40, 25);
  }

  //change state on click to make window appear
  mousePressed() {
    let d = dist(this.ribbon.x, this.ribbon.y, mouseX, mouseY);

    if (d < 20) {
      state = `accessory`;
    }
  }
}
