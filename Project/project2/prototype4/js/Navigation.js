class Navigation {
  constructor(yesImage, noImage) {
    this.yes = {
      x: width - 50,
      y: height - 100,
      image: yesImage,
      size: 100,
    };

    this.no = {
      x: width - 50,
      y: height - 100,
      image: noImage,
      size: 100,
    };
  }

  //display icon
  display() {
    imageMode(CENTER);
    image(this.yes.image, this.yes.x, this.yes.y, this.yes.size);

    image(this.no.image, this.no.x, this.no.y, this.no.size);
  }

  //change state on click to make window appear
  mousePressed() {
    let d = dist(this.yes.x, this.yes.y, mouseX, mouseY);

    if (d < this.yes.size / 2) {
      state = `simulation`;
    }

    let d = dist(this.no.x, this.no.y, mouseX, mouseY);

    if (d < this.yes.size / 2) {
      state = `simulation`;
    }
  }
}
