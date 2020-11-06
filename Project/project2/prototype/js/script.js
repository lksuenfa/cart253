"use strict";

// For prototype, we will montreal as default city

let weatherData;
let weatherURL =
  "http://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

let localTime = {
  hour: 0,
  min: 0,
  total: 0,
};

let weather = {
  sunrise: 0,
  sunset: 0,
  temperature: 0,
  sky: "clear",
};

let sky = {
  dawn: {
    r: 252,
    g: 252,
    b: 194,
  },
  day: {
    r: 166,
    g: 206,
    b: 227,
  },
  dusk: {
    r: 252,
    g: 205,
    b: 162,
  },
  night: {
    r: 90,
    g: 128,
    b: 173,
  },
};
function preload() {
  weatherData = loadJSON(weatherURL);
}

function setup() {
  createCanvas(400, 700);

  //Call weather data
  weather.temperature = weatherData.main.temp;
  weather.sunrise = convertUnix(weatherData.sys.sunrise);
  weather.sunset = convertUnix(weatherData.sys.sunset);

  //Call pc time
  let date = new Date();
  localTime.hour = date.getHours();
  localTime.min = date.getMinutes();
  localTime.total = localTime.hour + localTime.min / 60;
}

function draw() {
  // background(220);

  //Change background colour according to local time,
  // for prototyping purposes we using fake time to test if conditions are fulfilled
  // let fakeTime = 20;
  //
  // if (fakeTime >= weather.sunrise && fakeTime < weather.sunrise + 1) {
  //   background(sky.dawn.r, sky.dawn.g, sky.dawn.b); //dawn
  // } else if (fakeTime >= weather.sunrise + 1 && fakeTime < weather.sunset - 1) {
  //   background(sky.day.r, sky.day.g, sky.day.b); //blue sky pale blue
  // } else if (fakeTime >= weather.sunset - 1 && fakeTime < weather.sunset) {
  //   background(sky.dusk.r, skyusk.g, sky.dusk.b); //dusk orange
  // } else if (fakeTime >= weather.sunset || fakeTime < weather.sunrise) {
  //   background(sky.night.r, sky.night.g, sky.night.b); //night blue
  // }

  //Change background colour according to local time,
  if (
    localTime.total >= weather.sunrise &&
    localTime.total < weather.sunrise + 1
  ) {
    background(sky.dawn.r, sky.dawn.g, sky.dawn.b); //dawn
  } else if (
    localTime.total >= weather.sunrise + 1 &&
    localTime.total < weather.sunset - 1
  ) {
    background(sky.day.r, sky.day.g, sky.day.b); //blue sky pale blue
  } else if (
    localTime.total >= weather.sunset - 1 &&
    localTime.total < weather.sunset
  ) {
    background(sky.dusk.r, skyusk.g, sky.dusk.b); //dusk orange
  } else if (
    localTime.total >= weather.sunset ||
    localTime.total < weather.sunrise
  ) {
    background(sky.night.r, sky.night.g, sky.night.b); //night blue
  }

  display();
}

function display() {
  text(localTime.hour + ":" + localTime.min, 300, 70);
}

function convertUnix(unixTime) {
  let date = new Date(unixTime * 1000);
  let hour = date.getHours();
  let min = "0" + date.getMinutes();
  let time = hour + min.substr(-2) / 60;
  return time;
}
