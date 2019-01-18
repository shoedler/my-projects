let generation = 0;

let gravity = 0.981;
let airResistance = 1;

let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

function setup() {
  createCanvas(wWidth, wHeight);
}

function draw() {
  background(51);
}

function windowResized() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
