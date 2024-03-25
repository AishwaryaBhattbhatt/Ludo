// Ensure your model URL is correct
let imageModelURL = "https://teachablemachine.withgoogle.com/models/tahhfYTXA/";

let keyboard_control = false;
let speed = 5;

let video;
let flipVideo;
let label = "waiting...";
let classifier;

// Assuming the Snake class is defined elsewhere, make sure it's included in your HTML or this script
class Snake {
  // Define the Snake class with necessary methods
  // ...
}

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json", modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function setup() {
  var canvas = createCanvas(960, 600); // This size should match the CSS for the #p5Container
  canvas.parent('p5Container'); // Ensure this ID matches the container in your HTML

  video = createCapture(VIDEO, videoReady);
  video.size(320, 240);
  video.hide();

  // Initialize snake and food
  w = floor(width / 20); // assuming rez is 20
  h = floor(height / 20); // assuming rez is 20
  snake = new Snake();
  foodLocation();
}

function videoReady() {
  console.log('Video ready!');
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSnake();
  classifyVideo();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

// Rest of the functions (keyPressed, controlSnake, draw, etc.)
// ...
