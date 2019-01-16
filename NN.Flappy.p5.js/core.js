/* COMEBAK 19:30 pt2 */

const TOTAL = 300;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (var i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  background(51);

  if (counter % 60 == 0) {
    pipes.push(new Pipe());
  }
  counter++;

  for (var i = pipes.length - 1; i >= 0 ; i--) {
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

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }

  stats();
}


function gameOver() {

}

function stats() {
  let magic = 12;
  textAlign(LEFT, TOP);
  fill (255);
  textFont("consolas");
  textSize(magic);
  blendMode(DIFFERENCE);
  text("Score: " + frameCount / 10, window.innerWidth / 100, magic);
  blendMode(BLEND);
}
