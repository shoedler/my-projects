
function nextGeneration() {
  calculateFitness();
  calculateBest();

  generation++;

  for (var i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}


function pickOne() {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;

  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  // do crossover here
  child.mutate();
  return child;
}


function calculateFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }
  // normalize fitness between 1 and 0
  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}


function calculateBest() {
  bestBirdScore = 0;
  for (let i = savedBirds.length - 1; i >= 0; i--) {
    if (savedBirds[i].score > bestBirdScore) {bestBirdScore = savedBirds[i].score;}
  }
}
