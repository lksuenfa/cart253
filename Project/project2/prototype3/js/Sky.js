class Sky {
  constructor(sunrise, sunset) {
    this.dawn = {
      r: 252,
      g: 252,
      b: 194,
    };

    this.day = {
      r: 166,
      g: 206,
      b: 227,
    };

    this.dusk = {
      r: 252,
      g: 205,
      b: 162,
    };

    this.night = {
      r: 90,
      g: 128,
      b: 173,
    };

    this.sunrise = sunrise;
    this.sunset = sunset;

    this.localTime = {
      hour: 0,
      min: 0,
      total: 0,
    };
  }
  getTime() {
    this.date = new Date();
    localTime.hour = this.date.getHours();
    localTime.min = this.date.getMinutes();
    localTime.total = localTime.hour + localTime.min / 60;
  }
}
