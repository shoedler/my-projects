class Generation
{
  constructor(population = []) 
  {
    this.population = population;
    this.dead = [];

    // Increment Generation Counter
    generation++;
  }


  populateNew = (amount) =>
  {
    for (let i = 0; i < amount; i++)
    {
      this.population.push(new Projectile());
    }
  }

  
  calculateFitness = () => 
  {
    let sum = 0;

    this.dead.forEach(p => sum += p.score);
    this.dead.forEach(p => p.fitness = p.score / sum);

    // Normalize fitness between 1 and 0
    this.dead.forEach(p => p.fitness = p.score / sum);
  }


  draw = () =>
  {
    // Draw Projectiles and their Trail
    this.population.forEach(p => 
    {
      p.draw();
      p.drawTrail();
    });

    // Draw Saved (Dead) Projectiles
    this.dead.forEach( p =>
    {
      p.color = color(255, 50, 50, 50);
      p.draw();
    });
  }


  mutate = () =>
  {
    let index = 0;
    let r = random(1);

    // Pick from pop algorithm
    while (r > 0) 
    {
      r = r - this.dead[index].fitness;
      index++;
    }
    index--;    

    let child = new Projectile(this.dead[index].brain);

    // Do crossover here
    child.mutate();
    
    return child;
  }


  start = (target) =>
  {
    this.population.forEach(p =>
    {
      let launchVelocities = p.think(target);
      p.launch(launchVelocities);
    })
  }

  
  isFinished = () =>
  {
    return new Promise((resolve, reject) =>
    {
      if (this.population.length == 0)
      {
        this.calculateFitness();
        
        let newPopulation = [];

        for (let i = 0; i < TOTAL; i++) 
        {
          newPopulation[i] = this.mutate();
        }
        
        resolve(newPopulation);
      }
      else
      {
        resolve(false);
      }
    })
  }


  run = (target) =>
  {
    // Update Physics  & Score of each Projectile
    this.population.forEach(p => p.update(target));

    // Move dead Projectiles to the saved Array
    for (let i = this.population.length - 1; i >= 0; i-- )
    {
      if (this.population[i].life()) this.dead.push(this.population.splice(i, 1)[0]);
    }
  }


  getBest = () =>
  {
    // Get Best Score of current Generation 
    let best = this.dead.reduce((p, c) => { return (p.score > c.score) ? p : c });
    return best.score.toFixed(3);
  }
}