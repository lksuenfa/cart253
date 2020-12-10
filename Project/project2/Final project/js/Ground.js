class Ground {
  constructor(localTime, month, day, sunsetTime, sunriseTime) {
    this.x = 0;
    this.y = 600;
    this.height = 100;

    // season colours
    this.spring = {
      day: {
        r: 151,
        g: 230,
        b: 192,
      },
      night: {
        r: 59,
        g: 115,
        b: 66,
      },
    };

    this.summer = {
      day: {
        r: 217,
        g: 224,
        b: 117,
      },
      night: {
        r: 171,
        g: 167,
        b: 56,
      },
    };

    this.fall = {
      day: {
        r: 194,
        g: 143,
        b: 33,
      },
      night: {
        r: 143,
        g: 119,
        b: 67,
      },
    };

    this.winter = {
      day: 240,
      night: 194,
    };
    this.localTime = localTime;
    this.sunset = sunsetTime;
    this.sunrise = sunriseTime;
    this.month = month;
    this.day = day;
  }

  // change seasons on the 21st of March, June, Sep, Dec

  changeSeasons() {
    push();
    noStroke();

    // change colour according to season and time of the day
    // if daytime
    if (this.localTime > this.sunrise && this.localTime < this.sunset) {
      // in winter after Dec 21 and before Mar 21
      if (
        this.month < 2 ||
        (this.day < 21 && this.month == 2) ||
        (this.day > 20 && this.month == 11)
      ) {
        fill(this.winter.day.r, this.winter.day.g, this.winter.day.b);
      }
      // in spring after Mar 21 and before June 21
      else if (
        this.month < 5 ||
        (this.day < 21 && this.month == 5) ||
        (this.day > 20 && this.month == 2)
      ) {
        fill(this.spring.day.r, this.spring.day.g, this.spring.day.b);
      }
      // in summer after June 21 and before Sep 21
      else if (
        this.month < 8 ||
        (this.day < 21 && this.month == 8) ||
        (this.day > 20 && this.month == 5)
      ) {
        fill(this.summer.day.r, this.summer.day.g, this.summer.day.b);
      }
      // only fall left
      else fill(this.fall.day.r, this.fall.day.g, this.fall.day.b);
    }
    // if night time
    else if (this.localTime >= this.sunset || this.localTime < this.sunrise) {
      if (
        this.month < 2 ||
        (this.day < 21 && this.month == 2) ||
        (this.day > 20 && this.month == 11)
      ) {
        fill(this.winter.night.r, this.winter.night.g, this.winter.night.b);
      }
      // in spring after Mar 21 and before June 21
      else if (
        this.month < 5 ||
        (this.day < 21 && this.month == 5) ||
        (this.day > 20 && this.month == 2)
      ) {
        fill(this.spring.night.r, this.spring.night.g, this.spring.night.b);
      }
      // in summer after June 21 and before Sep 21
      else if (
        this.month < 8 ||
        (this.day < 21 && this.month == 8) ||
        (this.day > 20 && this.month == 5)
      ) {
        fill(this.summer.night.r, this.summer.night.g, this.summer.night.b);
      }
      // only fall left
      else fill(this.fall.night.r, this.fall.night.g, this.fall.night.b);
    }
    rect(this.x, this.y, width, this.height);
    pop();
  }
}
