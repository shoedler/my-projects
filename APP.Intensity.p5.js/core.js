let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let dataSet;
let loadDataSet;

let d = new Diagram(wWidth / 20, wHeight / 5);

function setup() {
  dataSet = createInput("Copy / Paste CSV in here")
  loadDataSet = createButton("Load");

  createCanvas(wWidth, wHeight);
  textFont("consolas");

  d.addLine("School", 255, 100, 100);
  d.addLinePoints("School",   0, 20);
  d.addLinePoints("School", 10, 10);
  d.addLinePoints("School", 50, 50);
  d.addLinePoints("School", 180, 80);
  d.addLinePoints("School", 365,40);

  d.addLine("Sola", 100, 100, 255);
  d.addLinePoints("Sola",  0,   0);
  d.addLinePoints("Sola", 30,  40);
  d.addLinePoints("Sola", 80, 100);
  d.addLinePoints("Sola", 180, 80);
  d.addLinePoints("Sola", 365, 10);

  d.addLine("Test", 255, 255, 100);
  d.addLinePoints("Test",  0,   0);
  d.addLinePoints("Test", 40,  100);
  d.addLinePoints("Test", 90, 30);
  d.addLinePoints("Test", 190, 90);
  d.addLinePoints("Test", 365, 0);

  console.log(d);
  gui();
}

function draw() {
  background(51);
  gui();
  d.showGrid();
  d.showTags();
  d.showLines();
  d.showLegend();
}

function windowResized() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}

function gui() {
  dataSet.position(wWidth / 20, wHeight / 20);
  loadDataSet.position(wWidth / 20, (wHeight / 20) * 2);

  dataSet.style('width', String(round(wWidth / 4)) + 'px');
  dataSet.style('font-family', 'consolas');
  dataSet.style('color', 'rgb(255, 255, 255)');
  dataSet.style('border-color', 'rgb(255, 255, 255)');
  dataSet.style('border-width', '1px');
  dataSet.style('background-color', 'rgba(0,0,0,0)');

  loadDataSet.style('width', String(round(wWidth / 4)) + 'px');
  loadDataSet.style('font-family', 'consolas');
  loadDataSet.style('color', 'rgb(255, 255, 255)');
  loadDataSet.style('border-color', 'rgb(255, 255, 255)');
  loadDataSet.style('border-width', '1px');
  loadDataSet.style('background-color', 'rgba(0,0,0,0)');
  loadDataSet.style('border-style', 'dotted');
}
