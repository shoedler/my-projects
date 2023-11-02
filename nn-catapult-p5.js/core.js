// Windowd Size Constants
const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

// Environment Constants
const gravity = 0.1;
const bounciness = 0.2;
const airResistance = 0.01;
const groundFriction = 0.05;
const groundLevel = wHeight / 30;

// Genetic Algorithm Properties
let TOTAL = 5;
let generation = 0;
let target;
let bestProjectileScore = 0;
let bestScoreOfAllTime = 0;
let currentGeneration = null;

// GUI Vars
let paceSlider;
let posValue = 12;
let fontColor = 255;

function setup() {
  // Initialize GUI Elements
  createCanvas(wWidth, wHeight);
  paceSlider = createSlider(0, 200, 1);

  currentGeneration = new Generation();
  currentGeneration.populateNew(TOTAL);

  // Initialize Target
  target = new Target();

  // Start initial Generation
  currentGeneration.start(target);
}

function draw() {
  // Drawing Elements
  drawEnvironment();
  target.draw();
  currentGeneration.draw();
  gui();

  // Run the calculation n Times, depending on the paceSlider
  for (let n = 0; n < paceSlider.value(); n++) {
    evolve();
  }
}

let evolve = async () => {
  let newPopulation = await currentGeneration.isFinished();

  if (!newPopulation) {
    // Run current Generation
    currentGeneration.run(target);
  } else {
    bestProjectileScore = currentGeneration.getBest();

    // Update Best of all Time
    bestScoreOfAllTime = bestProjectileScore > bestScoreOfAllTime ? bestProjectileScore : bestScoreOfAllTime;

    // Make next generation
    currentGeneration = new Generation(newPopulation);

    // Make new target
    target = new Target();
    target.draw();

    // Start Generation
    currentGeneration.start(target);
  }
};

let drawEnvironment = () => {
  background(51);
  fill(75, 135, 85);
  noStroke();
  rect(0, wHeight - groundLevel, wWidth, groundLevel);
};

let gui = () => {
  // Draw GUI Backdrop
  fill(31, 31, 31, 100);
  noStroke();
  rect(0, 0, window.innerWidth, posValue * 8);

  // Draw GUI Text
  blendMode(DIFFERENCE);
  textAlign(LEFT, TOP);
  fill(fontColor);
  textFont('consolas');
  textSize(posValue);

  text(`Active Projectiles: ${currentGeneration.population.length}`, window.innerWidth / 100, 1 * posValue);
  text(`Last Best Score:    ${bestProjectileScore}`, window.innerWidth / 100, 2 * posValue);
  text(`Alltime Best Score: ${bestScoreOfAllTime}`, window.innerWidth / 100, 3 * posValue);
  text(`Generation:         ${generation}`, window.innerWidth / 100, 4 * posValue);

  // Draw Pace Slider
  text(`Logic Cycles per Frame: ${paceSlider.value()}`, window.innerWidth / 4, 3.5 * posValue);
  paceSlider.position(window.innerWidth / 4, posValue);

  // Draw Pause Overlay
  textAlign(CENTER, CENTER);
  textSize(window.innerWidth / 5);

  if (paceSlider.value() == 0) text('PAUSE', window.innerWidth / 2, window.innerHeight / 2);

  blendMode(BLEND);
};

let plot = (arr) => {
  let ret = '[';
  arr.forEach((n) => {
    ret += n.substring(1, 5);
    ret += `, `;
  });
  ret = ret.substring(0, ret.length - 3);
  ret += ']';

  return ret;
};
