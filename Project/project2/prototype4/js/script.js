"use strict";

let weatherData;

//url from Open Weather API
let weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

let weatherState;
let weatherID; //code found on Open weather map for each type of weather forecast

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

//accessory bar
let accessory = {
  x: 250,
  y: 450,
  num: 5, //6 images in total
  i: 0, //position in array
};
let accessoryImages = []; //to store images

//bkg images
let mountains = {
  x: 250,
  y: 400,
  img: [],
  num: 3, //number of nkg pictures
};
let displayMountain; //variable to randomise bkg pics

//flower garden
let garden = [];
let gardenImages = [];
let numGardenImages = 4;
let numFlowers = 10;
let growthOrder = 0;

//background music
let music = [];
let numMusic = 2;
let bkgMusic;

function preload() {
  //loading API
  weatherData = loadJSON(weatherURL);

  // load rock image
  rock.img = loadImage("assets/images/rock.png");

  // load cloud images
  for (let i = 0; i < numCloudImages; i++) {
    let loadCloudImage = loadImage(`assets/images/clouds/cloud${i}.png`);
    cloudImages.push(loadCloudImage);
  }

  // load accessory images
  for (let i = 0; i < accessory.num; i++) {
    let loadImg = loadImage(`assets/images/accessory/accessory${i}.png`);
    accessoryImages.push(loadImg);
  }

  //load mountain images
  for (let i = 0; i < mountains.num; i++) {
    let loadImg = loadImage(`assets/images/bkg/bkg${i}.png`);
    mountains.img.push(loadImg);
  }

  //load flower images in garden
  for (let i = 0; i < numGardenImages; i++) {
    let loadImg = loadImage(`assets/images/plant/plant${i}.png`);
    gardenImages.push(loadImg);
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
  sunrise = convertUnix(weatherData.sys.sunrise); //necessary to convert Unix time stamp
  sunset = convertUnix(weatherData.sys.sunset);

  // call weather data for temp
  temperature = weatherData.main.temp;

  //call cloud percentage data
  cloudData = weatherData.clouds.all;

  //call weather ID from API
  weatherID = weatherData.weather.id;

  //Call pc time
  let date = new Date();
  hour = date.getHours(); //call local time in hour
  minute = date.getMinutes(); //call local time in minute
  dayOfMonth = date.getDate(); //Returns the day of the month (from 1-31)
  month = date.getMonth(); //Returns the month (from 0-11)
  localTime = hour + minute / 60; //turn time into a value so that it can be used in if statement

  //if sky is overcast, i.e cloudiness > 85% then cloudy is true
  // if cloudy is true then sky is grey
  if (cloudData > 84) {
    cloudy = true;
  } else cloudy = false;

  // make a certain number of clouds appear from array
  checkClouds();
  for (let i = 0; i < numClouds; i++) {
    let x = random(-500, 100);
    let y = random(100, 250);
    let cloudImage = random(cloudImages);
    let cloud = new Cloud(x, y, cloudImage);
    clouds.push(cloud);
  }

  //create garden of Flowers
  for (let i = 0; i < numFlowers; i++) {
    let growthInterval = random(5000, 50000);
    let flower = new Garden(growthInterval);
    garden.push(flower);
  }

  // raining
  checkRain();
  for (let i = 0; i < rainIntensity; i++) {
    let rainFall = new Rain();
    rainYes.push(rainFall);
  }

  //start with a random mountain pic everytime the game is opened
  displayMountain = random(mountains.img);
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
  pop();
}

function simulation() {
  //background is sky colour and is responsive to weather data and time of the day
  sky = new Sky(localTime, cloudy, sunset, sunrise);
  sky.skyColour();

  //display mountains
  imageMode(CENTER);
  image(displayMountain, mountains.x, mountains.y);

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

  //display accessory
  imageMode(CENTER);
  image(accessoryImages[accessory.i], accessory.x, accessory.y); //will display image in position i

  //display flower garden
  for (let i = 0; i < garden.length; i++) {
    let flower = garden[i];
    flower.display();
  }
}

// checking rain
//display rain intensity according to API waether ID
function checkRain() {
  if (weatherState === `Rain`) {
    // if raining
    if (
      weatherID === 500 || //light rain
      weatherID === 520 || //light intensity shower rain
      weatherID === 531 || //ragged shower
      weatherID === 511 //freezing rain
    ) {
      rainIntensity = 100; //lowest rain intensity
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
  if (state === `title`) {
    state = `simulation`;
    addMusic();
  }

  //distance between rock and cursor
  let d = dist(accessory.x, accessory.y, mouseX, mouseY);
  //if click on rock then accessory displayed changes because we display next image in the array
  if (d < accessory.x / 1.5) {
    accessory.i++;

    //reset to first image if we get to last one in array
    if (accessory.i >= accessory.num) {
      accessory.i = 0;
    }
  }
}

//check cloud percentage to know how many clouds to display
function checkClouds() {
  //amount of clouds appearing depend on cloud data % from openweathermap

  //<10% display no cloud
  if (cloudData <= 10) {
    numClouds = 0;

    //between 10%-25% display 1 cloud
  } else if (cloudData > 10 && cloudData < 25) {
    numClouds = 1; //few clouds: 11-25%

    //between 25%-50% display 2 clouds
  } else if (cloudData >= 25 && cloudData < 50) {
    numClouds = 2; //scattered clouds: 25-50%

    //between 50-85% display 4 clouds
  } else if (cloudData >= 50 && cloudData < 85) {
    numClouds = 4; //	broken clouds: 51-84%

    //between >85% display 6 clouds
  } else {
    numClouds = 6; //	overcast clouds: 85-100%
  }
}

// Convert unix time code to regular time
//formula found on W3 - see readme
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

  //play music loop
  if (!bkgMusic.isPlaying()) {
    bkgMusic.loop();
  }
}
