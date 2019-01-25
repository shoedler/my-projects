let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let d = new Diagram();
let schoolStress = d.addLine("School", 255, 0, 0);
let solaStress = d.addLine("Sola", 0, 0, 255);

function setup() {
  createCanvas(wWidth, wHeight);
  textFont("consolas");

  d.addCoordinates(schoolStress,   0,   0);
  d.addCoordinates(schoolStress,  91,  20);
  d.addCoordinates(schoolStress, 186,  70);
  d.addCoordinates(schoolStress, 365,  20);

  d.addCoordinates(solaStress,   0,   0);
  d.addCoordinates(solaStress,  41, 100);
  d.addCoordinates(solaStress, 136,  90);
  d.addCoordinates(solaStress, 365,   0);

  console.log(d);

}

function draw() {
  background(51);
  d.show();
  d.showLine(schoolStress);
  d.showLine(solaStress);
}

function windowResized() {
  d.x = 5 / 100 * wWidth;
  d.y = wHeight - (5 / 100 * wHeight);
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
