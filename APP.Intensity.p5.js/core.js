let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let d = new Diagram();

function setup() {
  createCanvas(wWidth, wHeight);
  textFont("consolas");
}

function draw() {
  background(51);
  d.updateMeasurements();
  d.show();
}

function windowResized() {
  d.x = 5 / 100 * wWidth;
  d.y = wHeight - (5 / 100 * wHeight);
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
