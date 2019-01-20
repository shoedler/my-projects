
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

function setup() {
  createCanvas(wWidth, wHeight);
  background(51);

  beginShape();
  stroke(255);
  strokeWeight(5);
  vertex(0, random(0, wHeight));
  vertex(0, random(0, wHeight));
  vertex(wWidth, random(0, wHeight));
  vertex(wWidth, random(0, wHeight));
  endShape();
}


function draw() {
}


function windowResized() {
  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  resizeCanvas(window.innerWidth, window.innerHeight);
}
