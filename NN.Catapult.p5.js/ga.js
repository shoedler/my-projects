
function nextGeneration() {
  calculateFitness();
  calculateBest();
  generation++;
}


function pickOne() {
}


function calculateFitness() {
  for (let projectile of savedProjectiles) {
    projectile.fitness = projectile.score;
    console.log(projectile.fitness);
  }
}


function calculateBest() {

}
