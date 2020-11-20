"use strict";

let weatherData;
let weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

let weatherState;
let weatherID;

//states
let state = `title`;

// Cloudy sky parameters
let cloudy;
let clouds = []; //array to store cloud
let cloudImages = []; //array to store cloud images
let numCloudImages = 4; //5 images available
let numClouds = 0;
let cloudData;

// Sky condition
let sunset;
let sunrise;
let sky;

// raining
let rainYes = []; //rain array
let rainIntensity = 0; //size of rain array

// Ground
let ground;

// the cutest Mossy rock
let rock = {
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

//info bar
let displayInfo;

//background music
let music = [];
let numMusic = 2;
let bkgMusic;

function preload() {
  weatherData = loadJSON(weatherURL);

  // load rock image
  rock.img = loadImage("assets/images/rock.png");

  // load cloud images
  for (let i = 0; i < numCloudImages; i++) {
    let loadCloudImage = loadImage(`assets/images/clouds/cloud${i}.png`);
    cloudImages.push(loadCloudImage);
  }

  //load background music
  for (let i = 0; i < numMusic; i++) {
    let loadMusic = loadSound(`assets/sounds/music${i}.mp3`);
    music.push(loadMusic);
  }
}

function setup() {
  createCanvas(500, 700);

  // general weather
  weatherState = weatherData.weather.main;

  // call weather data for sky condition
  sunrise = convertUnix(weatherData.sys.sunrise);
  sunset = convertUnix(weatherData.sys.sunset);

  // call weather data for temp
  temperature = weatherData.main.temp;

  //call cloud percentage data
  cloudData = weatherData.clouds.all;

  weatherID = weatherData.weather.id;

  //Call pc time
  let date = new Date();
  hour = date.getHours();
  minute = date.getMinutes();
  localTime = hour + minute / 60;
  dayOfMonth = date.getDate(); //Returns the day of the month (from 1-31)
  month = date.getMonth(); //Returns the month (from 0-11)

  //if sky is overcast, i.e cloudiness > 85% then cloudy is true
  // if cloudy is true then sky is grey
  if (cloudData > 84) {
    cloudy = true;
  } else cloudy = false;

  // make a certain number of clouds appear
  checkClouds();
  for (let i = 0; i < numClouds; i++) {
    let x = random(-100, 100);
    let y = random(100, 250);
    let cloudImage = random(cloudImages);
    let cloud = new Cloud(x, y, cloudImage);
    clouds.push(cloud);
  }

  // raining
  checkRain();
  for (let i = 0; i < rainIntensity; i++) {
    let rainFall = new Rain();
    rainYes.push(rainFall);
  }
}

function draw() {
  // switch states when clicking
  switch (state) {
    case `title`:
      title();
      break;

    case `simulation`:
      simulation();
      break;
  }
}

function title() {
  push();
  background(240);
  textSize(36);
  fill(109, 151, 181);
  textAlign(CENTER, CENTER);
  text(`Click to start`, width / 2, height / 2);
}

function simulation() {
  //background is sky colour and is responsive to weather data and time of the day
  sky = new Sky(localTime, cloudy, sunset, sunrise);
  sky.skyColour();

  // display Ground  which is responsive to time of the day and season changeSeasons
  ground = new Ground(localTime, dayOfMonth, month, sunset, sunrise);
  ground.changeSeasons();

  // raining
  for (let i = 0; i < rainYes.length; i++) {
    let rainFall = rainYes[i];
    rainFall.display();
    rainFall.move();
  }
  // display rock
  imageMode(CENTER);
  image(rock.img, width / 2, rock.y, rock.width, rock.height);

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

// checking rain
function checkRain() {
  if (weatherState === `Rain`) {
    // if raining
    if (
      weatherID === 500 || //light rain
      weatherID === 520 || //light intensity shower rain
      weatherID === 531 || //ragged shower
      weatherID === 511 //freezing rain
    ) {
      rainIntensity = 100;
    } else if (
      weatherID === 501 || //moderate rain
      weatherID === 521 //shower rain
    ) {
      rainIntensity = 300;
    } else if (
      weatherID === 502 || //heavy intensity rain
      weatherID === 503 || //very heavy rain
      weatherID === 504 || //	extreme rain
      weatherID === 522 //	heavy intensity shower rain
    ) {
      rainIntensity = 700;
    }
  }
}

function mousePressed() {
  if ((state = `title`)) {
    state = `simulation`;
    addMusic();
  }
}

//check cloud percentage to know how many clouds to display
function checkClouds() {
  //amount of clouds appearing depend on cloud data % from openweathermap
  if (cloudData <= 10) {
    numClouds = 0;
  } else if (cloudData > 10 && cloudData < 25) {
    numClouds = 1; //few clouds: 11-25%
  } else if (cloudData >= 25 && cloudData < 50) {
    numClouds = 2; //scattered clouds: 25-50%
  } else if (cloudData >= 50 && cloudData < 85) {
    numClouds = 4; //	broken clouds: 51-84%
  } else {
    numClouds = 6; //	overcast clouds: 85-100%
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

function addMusic() {
  //select random music from music bank
  bkgMusic = random(music);
  if (!bkgMusic.isPlaying()) {
    bkgMusic.loop();
  }
}
