// For prototype, we will montreal as default city

let openWeather = "http://api.openweathermap.org/data/2.5/weather?q=";
let city = "montreal";
let id = "&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

// let weatherURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=f1980699c5ed03fcc2acd671a112e5c3";

let weatherURL = openWeather + city + id;

let weatherData;

let temperature = 0;
let date = new Date();
let hour = date.getHours(); //gets hour value only
let minute = date.getMinutes(); //gets minute value only
let minuteFraction = minute / 60; //minutes as a fraction of the hour

let totalTime = hour + minuteFraction; //hour+minute = total time

let sunrise = 0;
let sunset = 0;

function preload() {
  weatherData = loadJSON(weatherURL);
}

function setup() {
  createCanvas(400, 700);

  temperature = weatherData.main.temp;
  let sunriseUnix = weatherData.sys.sunrise; //in unix
  sunrise = convertUnixTimestamp(sunriseUnix); //hour + minutes/hour
  let sunsetUnix = weatherData.sys.sunset; //in unix
  sunset = convertUnixTimestamp(sunsetUnix); //hour + minute/hour
}

function draw() {
  background(220);
  // if (hour < sunrise || hour > sunset) {
  //   background(50);
  // } else background(220);

  let faketime = 14;

  text("current temperature = " + temperature, 10, 70);

  text("current time = " + hour, 20, 100);

  text("current minute = " + minute, 20, 130);
  text("current minute = " + minuteFraction, 20, 150);

  text(sunrise, 20, 170);
  text(sunset, 20, 190);
}

function convertUnixTimestamp(t) {
  let date = new Date(t * 1000);
  let hour = date.getHours();
  let min = "0" + date.getMinutes();
  let time = hour + min.substr(-2) / 60;
  return time;
}
