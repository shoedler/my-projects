
function nextGeneration()
{
  calculateFitness();
  calculateBest(); // only for visual appeal

  generation++;

  for (var i = 0; i < TOTAL; i++)
  {
    projectiles[i] = pickOneAndMutate();
  }
  savedProjectiles = [];

  // make a new target, let NN think of the target
  mainTarget = new Target();
  mainTarget.show();
  for (let projectile of projectiles)
  {
    projectile.think(mainTarget);
  }
}


function pickOneAndMutate()
{
  let index = 0;
  let r = random(1);

  // pick from pop algorhytm
  while (r > 0)
  {
    r = r - savedProjectiles[index].fitness;
    index++;
  }
  index--;

  let pickedProjectile = savedProjectiles[index];

  let child = new Projectile(pickedProjectile.brain);
  // do crossover here
  child.mutate();
  return child;
}


function calculateFitness()
{
  let sum = 0;
  for (let projectile of savedProjectiles)
  {
    sum += projectile.score;
  }
  // normalize fitness between 1 and 0
  for (let projectile of savedProjectiles)
  {
    projectile.fitness = projectile.score / sum;
  }
}


function calculateBest()
{
  bestProjectileScore = 0;
  for (let i = savedProjectiles.length - 1; i >= 0; i--)
  {
    if (savedProjectiles[i].score > bestProjectileScore)
    {
      bestProjectileScore = savedProjectiles[i].score;
    }
  }
}
