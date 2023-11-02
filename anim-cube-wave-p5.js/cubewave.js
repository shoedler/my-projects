const GRID = 10;
const SIZE = 20;

let angle = 0;
let viewAngle;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  viewAngle = atan(1 / sqrt(2));
}

function draw() {
  background(53, 53, 53);
  rectMode(CENTER);
  ambientMaterial(140, 250, 230);
  ortho();
  noStroke();

  ambientLight(0, 120, 120);
  directionalLight(192, 70, 20, 0, 0, -1);

  rotateX(-QUARTER_PI);
  rotateY(viewAngle);

  for (let z = -GRID; z <= GRID; z++) {
    for (let x = -GRID; x <= GRID; x++) {
      push();

      let d = dist(x * SIZE, z * SIZE, GRID / 2, GRID / 2);
      let o = map(d, 0, SIZE * GRID, -5, 5);
      let a = angle + o;
      let y = map(sin(a), -1, 1, 100, 300);

      translate(x * SIZE, 0, z * SIZE);
      box(SIZE, y, SIZE);

      pop();
    }
  }

  angle += 0.1;
}
