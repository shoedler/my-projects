const nextGeneration = () => {
  calculateFitness();
  calculateBest();

  generation++;

  // Get 'best' bird of the previous generation
  const bestBird = savedBirds.reduce((a, b) => (a.fitness > b.fitness ? a : b));

  for (var i = 0; i < TOTAL; i++) {
    // For bad performances, use more randomization
    if (previousBestBirdScore / 10 < 100) {
      birds[i] = pickOne();
    } else if (previousBestBirdScore / 10 < 1000) {
      birds[i] = new Bird(bestBird.brain.copy());
      birds[i].mutate(0.1);
    } else {
      birds[i] = new Bird(bestBird.brain.copy());
      birds[i].mutate(0.01);
    }
  }
  savedBirds = [];
};

const pickOne = () => {
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
};

const calculateFitness = () => {
  let sum = savedBirds.map((b) => b.score).reduce((a, b) => a + b);

  // normalize fitness between 1 and 0
  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
};

const calculateBest = () => {
  previousBestBirdScore = 0;
  for (let i = savedBirds.length - 1; i >= 0; i--) {
    if (savedBirds[i].score > previousBestBirdScore) {
      previousBestBirdScore = savedBirds[i].score;
    }
  }
};
