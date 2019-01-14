/* Style Tiles
Simon Schödler
14.01.2019
*/

let r, g, b;
let ap_r, ap_g, ap_b;
let range = 10;             // amount of + & - range around the rgb component approximation. e.g. ap_r = 45 => range 10 = from 35 to 55
let iterations = 10;        // amount of iterations in getting a random approximation of every rgb component

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  approximateColors();
  pickColor();
  console.log(ap_r, ap_g, ap_b);
  createTiles();
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
  g = random(ap_g - range, ap_g + range);
  b = random(ap_b - range, ap_b + range);
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
