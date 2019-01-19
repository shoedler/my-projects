
function nextGeneration() {
  calculateFitness();
  calculateBest(); // only for visuals

  generation++;

  for (var i = 0; i < TOTAL; i++) {
    projectiles[i] = pickOneAndMutate();
  }
  savedProjectiles = [];

  // make a new target, let NN think of the target
  mainTarget = new Target();
  mainTarget.show();
  for (let projectile of projectiles) {projectile.think(mainTarget);}

  generation++;
}


function pickOneAndMutate() {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - savedProjectiles[index].fitness;
    index++;
  }
  index--;

  let fitestProjectile = savedProjectiles[index];
  let child = new Projectile(fitestProjectile.brain);
  // do crossover here
  child.mutate();
  return child;
}


function calculateFitness() {
  for (let projectile of savedProjectiles) {
    projectile.fitness = projectile.score;
  }
}


function calculateBest() {
  bestProjectileScore = 0;
  for (let i = savedProjectiles.length - 1; i >= 0; i--) {
    if (savedProjectiles[i].score > bestProjectileScore) {bestProjectileScore = savedProjectiles[i].score;}
  }
}
