/* COMEBAK 19:30 pt2 */

const TOTAL = 250;
var birds = [];
let savedBirds = [];
var pipes = [];
let counter = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (var i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
}

function draw() {
  background(51);

  if (frameCount % 60 == 0) {
    pipes.push(new Pipe());
  }
  counter++;

  for (var i = pipes.length - 1; i > 0 ; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    for (let j = birds.length - 1; j >= 0; j-- ) {
      if (pipes[i].hits(birds[j]) || birds[j].life()) {
        // save bird when it dies, don't make array of arrays! [0]
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }
  }

  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.show();
  }

  if (birds.length === 0) {
    counter = 0;
    nextGeneration();
    pipes = [];
  }

  stats();
}


function gameOver() {

}

function stats() {
  textAlign(LEFT, CENTER);
  fill (255);
  textFont("consolas");
  textSize(12);
  blendMode(DIFFERENCE);
  text(frameCount / 10, window.innerWidth / 100, window.innerHeight / 200);
  blendMode(BLEND);
}
