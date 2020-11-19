"use strict";

let weatherData;
let weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

// Cloudy sky parameters
let clouds = []; //array to store cloud images
let numCloudImages = 4;
let numClouds = 0;
let cloudData;

// Sky condition
let sunset;
let sunrise;
let cloudy;
let sky;

// raining
let rain = []; //rain array
let rainIntensity = 0; //size of rain array
let checkRain = false;

// Ground
let ground;

// the cutest Mossy rock
let rock = {
  x: 200,
  y: 570,
  img: undefined,
  width: 300,
  height: 200,
};

// local Time
let localTime;
let hour;
let minute;
let dayOfMonth;
let month;

// temp
let temperature;

let displayInfo;

function preload() {
  weatherData = loadJSON(weatherURL);

  // load rock image
  rock.img = loadImage("assets/images/rock.png");

  // load cloud images
  for (let i = 0; i < numCloudImages; i++) {
    let loadCloudImage = loadImage(`assets/images/clouds/cloud${i}.png`);
    clouds.push(loadCloudImage);
  }
}

function setup() {
  createCanvas(400, 700);

  // call weather data for sky condition
  sunrise = convertUnix(weatherData.sys.sunrise);
  sunset = convertUnix(weatherData.sys.sunset);

  //call cloud percentage data
  cloudData = weatherData.clouds.all;

  // call weather data for temp
  temperature = weatherData.main.temp;

  //if cloudy then cloudy is true
  // if (weatherData.weather.main === "Clouds") {
  //   cloudy = true;

  if (true) {
    console.log(cloudy);

    // make a certain number of clouds appear
    checkClouds();
    for (let i = 0; i < numClouds; i++) {
      let x = random(-100, 0);
      let y = random(100, 300);
      let cloud = new Cloud(x, y);
      clouds.push(cloud);
    }
  }

  //Call pc time
  let date = new Date();
  hour = date.getHours();
  minute = date.getMinutes();
  localTime = hour + minute / 60;
  dayOfMonth = date.getDate(); //Returns the day of the month (from 1-31)
  month = date.getMonth(); //Returns the month (from 0-11)
}

function draw() {
  //background is sky colour and is responsive to weather data and time of the day
  sky = new Sky(localTime, cloudy, sunset, sunrise);
  sky.skyColour();

  // display Ground  which is responsive to time of the day and season changeSeasons
  ground = new Ground(localTime, dayOfMonth, month, sunset, sunrise);
  ground.changeSeasons();

  // display raining

  // display rock
  imageMode(CENTER);
  image(rock.img, rock.x, rock.y, rock.width, rock.height);

  // display Weather Info
  displayInfo = new WeatherInfo(temperature, hour, minute, dayOfMonth, month);
  displayInfo.displayTime();
  displayInfo.displayCity();
  displayInfo.displayTemp();
  displayInfo.displayDate();

  // display Clouds
  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];
    cloud.display();
    cloud.move();
  }
}

//check cloud percentage to know how many clouds to display
function checkClouds() {
  //amount of clouds appearing depend on cloud data % from openweathermap
  if (cloudData <= 10) {
    numClouds = 0;
  } else if (cloudData > 10 && cloudData < 25) {
    numClouds = 1;
  } else if (cloudData > 25 && cloudData < 50) {
    numClouds = 2;
  } else if (cloudData > 50 && cloudData < 75) {
    numClouds = 4;
  } else {
    numClouds = 6;
  }
}
// Convert unix time code to regular time
function convertUnix(unixTime) {
  let date = new Date(unixTime * 1000);
  let hour = date.getHours();
  let min = "0" + date.getMinutes();
  let time = hour + min.substr(-2) / 60;
  return time;
}
