let wWidth = window.innerWidth;
let wHeight = window.innerHeight;


let myBodies = [];

function setup()
{
  createCanvas(wWidth, wHeight);

  // add top & bottom borders
  addBody(myBodies, 0, 0, 0, wHeight, wWidth, 50, 1, color(255), 1, "static");
  addBody(myBodies, 0, 0, 0, 0, wWidth, -50, 1, color(255), 1, "static");
  // add left & right borders
  addBody(myBodies, 0, 0, wWidth, 0, 50, wHeight, 1, color(255), 1, "static");
  addBody(myBodies, 0, 0, 0, 0, -50, wHeight, 1, color(255), 1, "static");


  addBody(myBodies, 0, 0, wWidth / 2, wHeight / 2, 30, 20, 1, color(255,0,0), 0.5, "dynamic");
  addBody(myBodies, 0, 0, wWidth / 3, wHeight / 3, 30, 20, 1, color(0,255,0), 0.6, "dynamic");
}


function draw()
{
  background(51);
  updateBodies(myBodies);
}


function windowResized()
{
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
