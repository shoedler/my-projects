
const TOTAL = 300;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let posValue = 12;
let bestBirdScore = 0;
let alltimeBestBirdScore = 0;
let generation = 0;
let mainColor = 'rgb(202, 202, 202)';
let fontColor = 255;

// gui elements
let paceSlider;
let saveButton;
let loadButton;
let loadURLInput;

let loadedBirdBrainJSON;
let loadedBirdBrainFlag = false;
let loadedBirdBrainSuccess = false;
let loadedTextDelay = 3000;
let loadedTextTimer = Infinity;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  paceSlider = createSlider(0, 50, 1);
  saveButton = createButton("save best bird's brain");
  loadButton = createButton("load brain for next gen");
  loadURLInput = createInput("Link to .JSON file. Use http://myjson.com/");
  styleElements();

  for (var i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}


function draw() {
  // logic stuff
  for (let n = 0; n < paceSlider.value(); n++) {logic();}

  // events
  saveButton.mousePressed(saveBestBird);
  loadButton.mousePressed(loadBird);

  // drawing stuff
  background(51);
  for (let bird of birds) {
    bird.show();
  }
  for (let pipe of pipes) {
    pipe.show();
  }
  if (alltimeBestBirdScore < birds[0].score) {alltimeBestBirdScore = birds[0].score;}
  if (loadedBirdBrainSuccess == true) {
    if (millis() > loadedTextTimer + loadedTextDelay) {
      loadedBirdBrainSuccess = false;
      loadedTextTimer = Infinity;
    }
    if (millis() < loadedTextTimer) {loadedTextTimer = millis();}
  }
  stats();
}


function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}


function logic() {
  if (counter % 120 == 0) {
    pipes.push(new Pipe());
  }
  counter++;

  for (let i = pipes.length - 1; i >= 0 ; i--) {
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j-- ) {
      // when does the bird die?
      if (pipes[i].hits(birds[j]) || birds[j].life()) {
        // save bird when it dies, don't make array of arrays! [0]
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
  }

  if (birds.length === 0) {
    counter = 0;
    nextGeneration();
    pipes = [];
  }
}


function saveBestBird() {
  let best = 0;
  let bird;
  for (bird of birds) {
    if (bird.score > best) {best = bird.score;}
  }
  saveJSON(bird.brain, 'bestBirdBrain.json');
}


function loadBird() {
  loadedBirdBrainJSON = loadJSON('https://api.myjson.com/bins/19nc2k' , brainLoaded());
  console.log('Brain loading...');
}
function brainLoaded() {
  loadedBirdBrainFlag = true;
  console.log('Brain loaded. Initializing injection...');
}


function stats() {
  fill(31, 31, 31, 100);
  noStroke();
  rect(0, 0, window.innerWidth, posValue * 8);

  blendMode(DIFFERENCE);

  // top left
  textAlign(LEFT, TOP);
  fill (fontColor);
  textFont("consolas");
  textSize(posValue);
  text("Score: " + counter / 10, window.innerWidth / 100, posValue);
  text("Currently Alive Birds: " + birds.length, window.innerWidth / 100, 2 * posValue);
  text("Last Best Score: " + bestBirdScore / 10, window.innerWidth / 100, 3 * posValue);
  text("Alltime Best Score: " + alltimeBestBirdScore / 10, window.innerWidth / 100, 4 * posValue);
  text("Generation: " + generation, window.innerWidth / 100, 5 * posValue);

  // top right
  text("Logic Cycles per Frame: " + paceSlider.value(), window.innerWidth / 4, 3.5 * posValue);
  paceSlider.position(window.innerWidth / 4, posValue);
  saveButton.position(window.innerWidth / 2, posValue);
  loadButton.position(window.innerWidth / 2, posValue * 3);
  loadURLInput.position(window.innerWidth / 2, posValue * 5);

  // special
  textAlign(CENTER, CENTER);
  textSize(window.innerWidth / 5);
  if (paceSlider.value() == 0) {text("PAUSE", window.innerWidth / 2, window.innerHeight / 2);}
  if (loadedBirdBrainSuccess == true) {text("LOADED", window.innerWidth / 2, window.innerHeight / 2);}

  blendMode(BLEND);
}
