let generation = 0;

let gravity = 0.1;
let airResistance = gravity / 4;

let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let groundLevel = wHeight / 30

let TOTAL = 5;
let projectiles = [];
let bestProjectileScore = 0;
let savedProjectiles = [];
let mainTarget;
let checkVelocity = 0;        // sum of all projectiles vy vx to check if a gen is finished

// gui elements
let paceSlider;
let posValue = 12;
let fontColor = 255;

function setup() {
  createCanvas(wWidth, wHeight);
  paceSlider = createSlider(0, 200, 1);

  // initial population
  for (var i = 0; i < TOTAL; i++) {projectiles[i] = new Projectile();}

  // make initial target, let NN think of the target
  mainTarget = new Target();
  mainTarget.show();
  for (let projectile of projectiles) {projectile.think(mainTarget);}
}

function draw() {
  // drawing stuff
  background(51);
  drawGround();
  mainTarget.show();
  for (let projectile of projectiles) {
      projectile.show();
      projectile.updateTrail();
  }

  for (let projectile of savedProjectiles) {
      projectile.color = color(255, 50, 50, 50);
      projectile.show();
  }
  gui();

  // logic stuff
  for (let n = 0; n < paceSlider.value(); n++) {logic();}
}


function logic() {
  checkVelocity = 0;
  for (let projectile of projectiles) {
    checkVelocity += projectile.vx;
    checkVelocity += projectile.vy;
    projectile.update(mainTarget);
  }

  for (let i = projectiles.length - 1; i >= 0; i-- ) {
    // determine if the projectile is "dead". Then
    // remove from main arr, and append to savedArr
    if (projectiles[i].life()) {
      savedProjectiles.push(projectiles.splice(i, 1)[0]);
    }
  }

  if (checkVelocity == 0) {
    nextGeneration();
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


function gui() {
  fill(31, 31, 31, 100);
  noStroke();
  rect(0, 0, window.innerWidth, posValue * 8);

  blendMode(DIFFERENCE);

  // top left
  textAlign(LEFT, TOP);
  fill (fontColor);
  textFont("consolas");
  textSize(posValue);
  text("Score: ", window.innerWidth / 100, posValue);
  text("Active Projectiles: " + projectiles.length, window.innerWidth / 100, 2 * posValue);
  text("Last Best Score: ", window.innerWidth / 100, 3 * posValue);
  text("Alltime Best Score: ", window.innerWidth / 100, 4 * posValue);
  text("Generation: " + generation, window.innerWidth / 100, 5 * posValue);

  // top right
  text("Logic Cycles per Frame: " + paceSlider.value(), window.innerWidth / 4, 3.5 * posValue);
  paceSlider.position(window.innerWidth / 4, posValue);

  // special
  textAlign(CENTER, CENTER);
  textSize(window.innerWidth / 5);
  if (paceSlider.value() == 0) {text("PAUSE", window.innerWidth / 2, window.innerHeight / 2);}

  blendMode(BLEND);
}
