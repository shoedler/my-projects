/* Flock Poly
Simon Schödler
Source by p5.js examples & daniel shiffman
19.12.2018
*/

let r,g,b;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pickColor();
}

function draw() {
  background(51);

  let tileSize = 100;
  let wait;

  wait = millis();

  for (let i = 0; i * tileSize + tileSize < 250; i++) {
    for (let j = 0; j * tileSize + tileSize < window.innerHeight; j++) {
      if (wait + 100 > millis() && wait + 150 < millis()) {
        fill(r, g, b);
        console.log("hi");
        noStroke();
        rect(i * tileSize, j * tileSize, tileSize, tileSize);
        pickColor();
        wait = millis();
      }
    }
  }
}

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}
