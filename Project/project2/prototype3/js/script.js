"use strict";

let weatherData;
let weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

let localTime = {
  hour: 0,
  min: 0,
  total: 0,
};

let weather = {
  sunrise: 0,
  sunset: 0,
  temperature: 0,
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
  images: [],
  numClouds: 0,
  displayClouds: undefined,
  totalClouds: 4,
};

let rock = {
  x: 200,
  y: 570,
  img: undefined,
};

let ground = {
  x: 0,
  y: 600,
  fill: {
    r: 94,
    b: 125,
    g: 103,
  },
  height: 100,
};

function preload() {
  weatherData = loadJSON(weatherURL);
  rock.img = loadImage("assets/images/rock.png");

  //load cloud images
  for (let i = 0; i < cloudySky.totalClouds; i++) {
    let loadCloudImage = loadImage(`assets/images/clouds/cloud${i}.png`);
    cloudySky.images.push(loadCloudImage);
  }
}

function setup() {
  createCanvas(400, 700);
  userStartAudio();

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
    let x = random(-100, 0);
    let y = random(100, 300);

    let cloud = new Cloud(x, y);
    cloudySky.clouds.push(cloud);
  }
}

function draw() {
  background(70, 88, 117);
  skyColour();

  display();
}

function display() {
  //display ground
  push();
  noStroke();
  fill(ground.fill.r, ground.fill.g, ground.fill.r);
  rect(ground.x, ground.y, width, ground.height);
  pop();

  //display rock
  imageMode(CENTER);
  image(rock.img, rock.x, rock.y, 300, 200);
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
