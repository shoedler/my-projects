let generation = 0;

let gravity = 0.1;
let airResistance = gravity / 4;

let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let groundLevel = wHeight / 30

let testProjectile;
let testTarget;

function setup() {
  createCanvas(wWidth, wHeight);
  testProjectile = new Projectile();
  testProjectile.vx = 5;
  testProjectile.vy = 10;
  testTarget = new Target();
}

function draw() {
  background(51);
  drawGround();

  testTarget.show();
  testProjectile.show();
  testProjectile.update();
  testTarget.strike(testProjectile);
}

function windowResized() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}

function drawGround() {
  fill(75, 135, 85);
  noStroke();
  rect(0, wHeight - groundLevel, wWidth, groundLevel);
}
