let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let d = new Diagram(wWidth / 20, wHeight / 5);

function setup() {
  createCanvas(wWidth, wHeight);
  textFont("consolas");

  d.addLine("School", 255, 0, 0);
  d.addLinePoints("School",   0, 20);
  d.addLinePoints("School", 10, 10);
  d.addLinePoints("School", 50, 50);
  d.addLinePoints("School", 180, 80);
  d.addLinePoints("School", 365,40);

  d.addLine("Sola", 0, 0, 255);
  d.addLinePoints("Sola",  0,   0);
  d.addLinePoints("Sola", 30,  40);
  d.addLinePoints("Sola", 80, 100);
  d.addLinePoints("Sola", 180, 80);
  d.addLinePoints("Sola", 365, 10);

  d.addLine("Test", 255, 255, 0);
  d.addLinePoints("Test",  0,   0);
  d.addLinePoints("Test", 40,  100);
  d.addLinePoints("Test", 90, 30);
  d.addLinePoints("Test", 190, 90);
  d.addLinePoints("Test", 365, 0);

  console.log(d);

}

function draw() {
  background(51);
  d.showGrid();
  d.showTags();
  d.showLines();
}

function windowResized() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
