/* Style Tiles
Simon Sch�dler
14.01.2019
*/

let r, g, b;
let ap_r, ap_g, ap_b;
let customColor = 0;        // if set, it will overwrite the random generator
let only_grayscale = 0;     // if set, it will only produce grayscale "colors"
let range = 8;              // amount of + & - range around the rgb component approximation. e.g. ap_r = 45 => range 10 = from 35 to 55
let iterations = 2;         // amount of iterations in getting a random approximation of every rgb component

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  if (customColor != 0) {
    setCustomColor();
  } else {
    approximateColors();
  }

  pickColor();
  createTiles();
  drawStats();
}

function draw() {}

function approximateColors() {
  let sum_r = 0;
  let sum_g = 0;
  let sum_b = 0;

  for (let i = 0; i < iterations; i++) {
    pickColor();
    sum_r += random(255);
    sum_g += random(255);
    sum_b += random(255);
  }

  ap_r = round(sum_r / iterations);
  ap_g = round(sum_g / iterations);
  ap_b = round(sum_b / iterations);
}

function pickColor() {
  r = random(ap_r - range, ap_r + range);

  if (only_grayscale == 0) {
    g = random(ap_g - range, ap_g + range);
    b = random(ap_b - range, ap_b + range);
  } else {
    g = r;
    b = r;
  }
}

function setCustomColor() {
  ap_r = 35;
  ap_g = 35;
  ap_b = 35;
}

function createTiles() {
  let tileSize = 15;

  for (let i = 0; i * tileSize < window.innerWidth; i++) {
    for (let j = 0; j * tileSize < window.innerHeight; j++) {
      fill(r, g, b);
      noStroke();
      rect(i * tileSize, j * tileSize, tileSize, tileSize);
      pickColor();
    }
  }
}

function drawStats() {
  let div = 20;
  let w = window.innerWidth;
  let h = window.innerHeight;
  noStroke();

  // first rect: rgb values chosen
  fill(0);
  rect(w/div, (h/div)-(div/2), (w/div)*(div*0.5), div);
  fill(ap_r, ap_g, ap_b);
  textFont('Roboto');
  textAlign(LEFT, CENTER);
  textSize(div/1.5);
  text("rgb values [r, g, b]", (w/div)+(div/10), h/div);
  text(round(r), (w/div)*(div*0.3), h/div);
  text(round(g), (w/div)*(div*0.4), h/div);
  text(round(b), (w/div)*(div*0.5), h/div);

  // second rect:
  fill(0);
  rect(w/div, (h/div*2)-(div/2), (w/div)*(div*0.5), div);
  fill(ap_r, ap_g, ap_b);
  textFont('Roboto');
  textAlign(LEFT, CENTER);
  textSize(div/1.5);
  text("screen size [w, h]px", (w/div)+(div/10), h/div*2);
  text(window.innerWidth, (w/div)*(div*0.3), h/div*2);
  text(window.innerHeight, (w/div)*(div*0.4), h/div*2);

}
