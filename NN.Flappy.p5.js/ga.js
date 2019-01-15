
function nextGeneration() {

  calculateFitness();

  for (var i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}

function pickOne() {
  let bird = random(savedBirds);
  let child = new Bird(bird.brain);
  // do crossover here
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of birds) {
    sum += bird.score;
  }
  // normalize fitness between 1 and 0
  for (let bird of birds) {
    bird.fitness = bird.score / sum;
  }
}
