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
  clouds: 0,
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

let cloudySky = {
  clouds: [],
  numClouds: 5,
};

let rock = {
  x: 200,
  y: 650,
  size: 300,
  height: 200,
  colour: 99,
};

// DOES NOT WORK
// let addGrass = {
//   grassArray: [],
//   numGrass: 10,
// };

let grass = {
  x: 250,
  y: 250,
  color: {
    r: 37,
    g: 138,
    b: 116,
  },
  stemLength: 15,
  stemThickness: 10,
  growthRate: 0.01,
  maxHeight: 50,
};

function preload() {
  weatherData = loadJSON(weatherURL);
}

function setup() {
  createCanvas(400, 700);
  noStroke();

  //Call weather data
  weather.temperature = weatherData.main.temp;
  weather.sunrise = convertUnix(weatherData.sys.sunrise);
  weather.sunset = convertUnix(weatherData.sys.sunset);
  weather.clouds = weatherData.clouds.all;

  //Call pc time
  let date = new Date();
  localTime.hour = date.getHours();
  localTime.min = date.getMinutes();
  localTime.total = localTime.hour + localTime.min / 60;

  //create cloudy sky
  checkClouds();
  for (let i = 0; i < cloudySky.numClouds; i++) {
    let cloud = new Cloud();
    cloudySky.clouds.push(cloud);
  }
  // DOES NOT WORK
  // Add grass
  // for (let i = 0; i < addGrass.numGrass; i++) {
  //   let x = random(150, 500);
  //   let y = random(550, 600);
  //   let grass = new Grass(x, y);
  //   addGrass.grassArray.push(grass);
  // }
  grass.x = random(150, 300);
  grass.y = random(550, 600);
}

function draw() {
  skyColour();
  displayClouds();

  push();
  fill(rock.colour);
  ellipse(rock.x, rock.y, rock.size, rock.height);
  pop();

  if (grass.stemLength < grass.maxHeight) {
    grass.stemLength = grass.stemLength + grass.growthRate;
    grass.y = grass.y - grass.growthRate;
  }

  push();
  noStroke();
  stroke(57, 219, 184);
  strokeWeight(grass.stemThickness);
  line(grass.x, grass.y, grass.x, grass.y + grass.stemLength);
  pop();

  // DOES NOT WORK
  // for (let i = 0; i < addGrass.length; i++) {
  //   let grass = grassArray[i];
  //   grass.grow();
  //   grass.display();
  // }
}

//Change background colour according to local time,
function skyColour() {
  // Dawn last 1h after sunrise
  if (
    localTime.total >= weather.sunrise &&
    localTime.total < weather.sunrise + 1
  ) {
    background(sky.dawn.r, sky.dawn.g, sky.dawn.b); //dawn

    // Day between sunrise and sunset
  } else if (
    localTime.total >= weather.sunrise + 1 &&
    localTime.total < weather.sunset - 1
  ) {
    background(sky.day.r, sky.day.g, sky.day.b); //blue sky pale blue

    // Dusk last 1h before sunset
  } else if (
    localTime.total >= weather.sunset - 1 &&
    localTime.total < weather.sunset
  ) {
    background(sky.dusk.r, skyusk.g, sky.dusk.b); //dusk orange

    // Night between sunset and sunrise
  } else if (
    localTime.total >= weather.sunset ||
    localTime.total < weather.sunrise
  ) {
    background(sky.night.r, sky.night.g, sky.night.b); //night blue
  }
}
//create cloudy sky
function checkClouds() {
  //amount of clouds appearing depend on cloud data from openweathermap
  if (weather.clouds <= 25) {
    cloudySky.numClouds = 0;
  } else if (weather.clouds > 25 && weather.clouds < 50) {
    cloudySky.numClouds = 2;
  } else if (weather.clouds > 50 && weather.clouds < 75) {
    cloudySky.numClouds = 4;
  } else {
    cloudySky.numClouds = 6;
  }
}

function displayClouds() {
  for (let i = 0; i < cloudySky.clouds.length; i++) {
    let cloud = cloudySky.clouds[i];
    cloud.display();
    cloud.move();
  }
}

function convertUnix(unixTime) {
  let date = new Date(unixTime * 1000);
  let hour = date.getHours();
  let min = "0" + date.getMinutes();
  let time = hour + min.substr(-2) / 60;
  return time;
}

// DOES NOT WORK
function mousePressed() {
  grass.stemLength = grass.stemLegth + grass.growthRate;
}
