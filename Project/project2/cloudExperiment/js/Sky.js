class Sky {
  constructor(localTime, cloudy, sunsetTime, sunriseTime) {
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
      r: 22,
      g: 69,
      b: 128,
    };

    this.localTime = localTime;
    this.sunset = sunsetTime;
    this.sunrise = sunriseTime;

    this.cloudy = true;

    this.cloudyDay = 222;
    this.cloudyNight = 64;
  }

  //Change background colour according to local time,
  skyColour() {
    // check cloudy sky
    if (this.cloudy === true) {
      //cloudy day sky
      if (this.localTime > this.sunrise && this.localTime < this.sunset) {
        background(this.cloudyDay); //pale grey
      } else if (
        this.localTime >= this.sunset ||
        this.localTime < this.sunrise
      ) {
        background(this.cloudyNight); //cloudy night sky is dark grey}
      }
    }
    //if sky is not cloudy
    else if (this.cloudy === false) {
      // Dawn last 1h after sunrise
      if (this.localTime >= this.sunrise && this.localTime < this.sunrise + 1) {
        background(this.dawn.r, this.dawn.g, this.dawn.b); //dawn
      }
      // Day between sunrise and sunset
      else if (
        this.localTime >= this.sunrise + 1 &&
        this.localTime < this.sunset - 1
      ) {
        background(this.day.r, this.day.g, this.day.b); //blue sky pale blue
      }
      // Dusk last 1h before sunset
      else if (
        this.localTime >= this.sunset - 1 &&
        this.localTime < this.sunset
      ) {
        background(this.dusk.r, skyusk.g, this.dusk.b); //dusk orange
      }
      // Night between sunset and sunrise
      else if (this.localTime >= this.sunset || this.localTime < this.sunrise) {
        background(this.night.r, this.night.g, this.night.b); //night blue
      }
    }
  }
}
