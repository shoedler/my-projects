let wWidth = window.innerWidth;
let wHeight = window.innerHeight;


function setup() {
  createCanvas(wWidth, wHeight);
}

function draw() {
  updateBodies(myBodies);
}

function windowResized() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
