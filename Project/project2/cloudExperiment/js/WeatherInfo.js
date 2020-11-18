class WeatherInfo {
  constructor(temp, hour, minute, day, month) {
    this.city = `Montreal`;

    this.day = day;
    this.month = month;

    this.temp = temp;

    this.hour = hour;
    this.minute = minute;

    // colour palette
    this.red = {
      r: 171,
      g: 101,
      b: 101,
    };

    this.darkerRed = {
      r: 148,
      g: 89,
      b: 89,
    };

    this.pink = {
      r: 229,
      g: 129,
      b: 129,
    };

    // default font size and all the other font sizes will be a multiple of it to make changes easier
    this.fontSize = 18;

    this.textFont = `Noto Sans`;

    // display positioning
    this.x = 230;
    this.y = 75;
  }

  displayDate() {
    this.monthName = 0;

    // month data is numerical (0-11) so this switch transforms it into month names
    switch (this.month) {
      case 0:
        this.monthName = `Jan`;
        break;
      case 1:
        this.monthName = `Feb`;
        break;
      case 2:
        this.monthName = `Mar`;
        break;
      case 3:
        this.monthName = `Apr`;
        break;
      case 4:
        this.monthName = `May`;
        break;
      case 5:
        this.monthName = `Jun`;
        break;
      case 6:
        this.monthName = `Jul`;
        break;
      case 7:
        this.monthName = `Aug`;
        break;
      case 8:
        this.monthName = `Sep`;
        break;
      case 9:
        this.monthName = `Oct`;
        break;
      case 10:
        this.monthName = `Nov`;
        break;
      case 11:
        this.monthName = `Dec`;
        break;
    }

    // Date
    push();
    fill(this.pink.r, this.pink.g, this.pink.b);
    textSize(this.fontSize * 0.75);
    text(this.monthName + ` ` + this.day, this.x + 80, this.y + 12);
    pop();
  }

  displayTime() {
    this.minDisplay = 0;

    // time
    push();
    fill(this.pink.r, this.pink.g, this.pink.b);
    textSize(this.fontSize * 1.25);
    textStyle(BOLD);

    if (this.minute < 10) {
      text(this.hour + `: 0` + this.minute, this.x + 80, this.y - 5);
    } else text(this.hour + `: ` + this.minute, this.x + 80, this.y - 5);

    pop();
  }

  displayCity() {
    // city
    push();
    fill(this.darkerRed.r, this.darkerRed.g, this.darkerRed.b);
    textSize(this.fontSize * 0.75);
    text(this.city, this.x + 80, this.y - 30);
    pop();
  }

  // display temperature
  displayTemp() {
    // round to closest integer
    this.tempRounded = Math.round(this.temp);

    textFont(this.textFont);

    push();
    fill(this.red.r, this.red.g, this.red.b);
    textSize(this.fontSize * 2.3);
    textStyle(BOLD);
    text(this.tempRounded + `°C`, this.x - 10, this.y + 10);
    pop();
  }
}
