let generation = 0;

let gravity = 0.1;
let airResistance = gravity / 4;

let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let groundLevel = wHeight / 30

let TOTAL = 100;
let projectiles = [];
let savedProjectiles = [];
let testTarget;


function setup() {
  createCanvas(wWidth, wHeight);
  for (var i = 0; i < TOTAL; i++) {
    projectiles[i] = new Projectile();
    projectiles[i].vx = random(3, 10);
    projectiles[i].vy = random(3, 10);
  }
  testTarget = new Target();
}


function draw() {
  background(51);
  drawGround();
  testTarget.show();

  let checkVelocity = 0;
  for (let projectile of projectiles) {
    projectile.show();
    projectile.update(testTarget);
    checkVelocity += projectile.vx;
    checkVelocity += projectile.vy;
  }

  for (let i = projectiles.length - 1; i >= 0; i-- ) {
    // determine if the projectile is "dead" (finished")
    if (projectiles[i].vx == 0 && projectiles[i].vy == 0) {
      savedProjectiles.push(projectiles.splice(i, 1)[0]);
    }
  }
  if (checkVelocity == 0) {
    nextGeneration();
    checkVelocity = 1;
  }
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
