let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
let lines = [];
const AMOUNT = 70;

function setup()
{
  createCanvas(wWidth, wHeight);
  frameRate(30);
  textFont("consolas");

  for (let i = 0; i < AMOUNT; i++)
  {
    lines.push(new line(random(0, wWidth)));
  }
}

function draw()
{
  background(31);

  for (let line of lines)
  {
    line.update();
  }
}
