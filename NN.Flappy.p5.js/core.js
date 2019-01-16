
const TOTAL = 300;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let posValue = 12;
let paceSlider;
let saveButton;
let loadButton;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  paceSlider = createSlider(0, 50, 1);
  saveButton = createButton("save best bird's brain");
  loadButton = createButton("load brain for next gen");


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
    if (bird.score > best) {
      best = bird.score;
    }
  }
  saveJSON(bird.brain, 'bird.json');
}

function loadBird() {

}


function stats() {
  textAlign(LEFT, TOP);
  fill (255);
  textFont("consolas");
  textSize(posValue);
  blendMode(DIFFERENCE);

  // top left
  text("Score: " + counter / 10, window.innerWidth / 100, posValue);
  text("Alive Birds: " + birds.length, window.innerWidth / 100, 2 * posValue);
  text("Current Best Score: " + bestBirdScore / 10, window.innerWidth / 100, 3 * posValue);
  text("Current Best Fitness: " + bestBirdFitness, window.innerWidth / 100, 4 * posValue);
  text("Generation: " + generation, window.innerWidth / 100, 5 * posValue);

  // top right
  text("Logic Cycles per Frame: " + paceSlider.value(), window.innerWidth / 4, 3.5 * posValue);
  paceSlider.position(window.innerWidth / 4, posValue);
  paceSlider.style('width', String(round(window.innerWidth / 5)) + 'px');
  saveButton.position(window.innerWidth / 2, posValue);
  loadButton.position(window.innerWidth / 2, posValue * 3);
  saveButton.style('font-family', 'consolas');
  loadButton.style('font-family', 'consolas');

  // special
  textAlign(CENTER, CENTER);
  textSize(window.innerWidth / 5);
  if (paceSlider.value() == 0) {text("PAUSE", window.innerWidth / 2, window.innerHeight / 2);}
  blendMode(BLEND);
}
