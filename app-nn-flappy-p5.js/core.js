let TOTAL = 300;

let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let posValue = 12;
let previousBestBirdScore = 0;
let alltimeBestBirdScore = 0;
let generation = 0;
let mainColor = 'rgb(202, 202, 202)';
let fontColor = 255;

const NORMAL = 0;
const SIMULATING = 1;
const SIMULATION_DONE = 2;
let gameState = NORMAL;

// gui elements
let paceSlider;
let saveButton;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  paceSlider = createSlider(0, 50, 1);
  paceSlider.style('width', String(round(window.innerWidth / 5)) + 'px');

  for (var i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  if (gameState == SIMULATING) {
    // Simulate until generation is finished (All birds are dead)
    while (gameLogic()) {}

    drawSimulationEnd();

    // Update game state
    gameState = SIMULATION_DONE;
  } else if (gameState == SIMULATION_DONE) {
    const t = millis();
    while (t + 2000 > millis()) {}

    // Update game state
    gameState = NORMAL;
  } else if (gameState == NORMAL) {
    // Run game logic
    for (let n = 0; n < paceSlider.value(); n++) gameLogic();

    // Draw routines
    background(51);

    birds.forEach((bird) => bird.show());
    pipes.forEach((pipe) => pipe.show());

    drawStats();

    // Update game state
    if (counter / 10 > 1000) {
      gameState = SIMULATING;
      drawSimulating();
    }
  } else {
    console.error(`Unknown gameState: ${gameState}`);
    gameState = NORMAL;
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function gameLogic() {
  if (counter % 120 == 0) {
    pipes.push(new Pipe());
  }
  counter++;

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j--) {
      // When does the bird die?
      if (pipes[i].hits(birds[j]) || birds[j].life()) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }

    // Remove off-screen pipes
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  // Update birds
  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
  }

  // Check if the current generation is finished (All birds are dead)
  if (birds.length === 0) {
    counter = 0;
    nextGeneration();
    pipes = [];
    return false;
  }

  if (alltimeBestBirdScore < birds[0].score) {
    alltimeBestBirdScore = birds[0].score;
  }

  if (counter % 1e5 == 0) {
    console.log(`Current score: ${counter / 10}`);
  }

  return true;
}

function drawSimulationEnd() {
  background(51);

  textAlign(CENTER, CENTER);
  textSize(window.innerWidth / 10);
  text(`Got to ${previousBestBirdScore / 10}`, window.innerWidth / 2, window.innerHeight / 2);
}

function drawSimulating() {
  background(51);

  textAlign(CENTER, CENTER);
  textSize(window.innerWidth / 10);
  text('Simulating...', window.innerWidth / 2, window.innerHeight / 2);
}

function drawStats() {
  fill(31, 31, 31, 100);
  noStroke();
  rect(0, 0, window.innerWidth, posValue * 8);

  blendMode(DIFFERENCE);

  // top left
  textAlign(LEFT, TOP);
  fill(fontColor);
  textFont('consolas');
  textSize(posValue);
  text('Score: ' + counter / 10, window.innerWidth / 100, posValue);
  text('Currently Alive Birds: ' + birds.length, window.innerWidth / 100, 2 * posValue);
  text('Last Best Score: ' + previousBestBirdScore / 10, window.innerWidth / 100, 3 * posValue);
  text('Alltime Best Score: ' + alltimeBestBirdScore / 10, window.innerWidth / 100, 4 * posValue);
  text('Generation: ' + generation, window.innerWidth / 100, 5 * posValue);

  // top right
  text('Logic Cycles per Frame: ' + paceSlider.value(), window.innerWidth / 4, 3.5 * posValue);
  paceSlider.position(window.innerWidth / 4, posValue);

  // special
  textAlign(CENTER, CENTER);
  textSize(window.innerWidth / 5);

  if (paceSlider.value() == 0) {
    text('PAUSE', window.innerWidth / 2, window.innerHeight / 2);
  }

  blendMode(BLEND);
}
