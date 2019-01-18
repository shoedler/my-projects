
function nextGeneration() {
  calculateFitness();
  calculateBest();
  generation++;
}


function pickOne() {
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

}
