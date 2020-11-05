// For prototype, we will montreal as default city

let weatherURL =
  "http://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

let weatherData;

let temperature = 0;
let date = new Date();
let hour = date.getHours(); //gets hour value only
let minute = date.getMinutes(); //gets minute value only

let sunrise = 0;
let sunset = 0;

function preload() {
  weatherData = loadJSON(weatherURL);
}

function setup() {
  createCanvas(400, 700);

  temperature = weatherData.main.temp;

  sunrise = convertUnix(weatherData.sys.sunrise); //hour + minutes/hour
  sunset = convertUnix(weatherData.sys.sunset); //hour + minute/hour
}

function draw() {
  background(220);
  // if (hour < sunrise || hour > sunset) {
  //   background(50);
  // } else background(220);

  text(temperature + "°C", 300, 70);
  text("current time = " + hour, 20, 100);
}

function convertUnix(unixTime) {
  let date = new Date(unixTime * 1000);
  let hour = date.getHours();
  let min = "0" + date.getMinutes();
  let time = hour + min.substr(-2) / 60;
  return time;
}
