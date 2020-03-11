class Bird
{
  constructor(brain)
  {
    this.y = window.innerHeight / 2;
    this.x = 60;
    this.r = 32;

    this.g = 0.4;
    this.v = 0;
    this.lift = 9;

    this.vNormalize = 10;
    this.score = 0;
    this.fitness = 0;

    // only make brain if it doesn't have one (1st generation)
    // and there's no loaded brain in "queue" (loadedBirdBrainFlag)
    if (brain && loadedBirdBrainFlag == false)
    {
      this.brain = brain.copy();
    }
    else if (loadedBirdBrainFlag)
    {
      let loadedBirdBrain = NeuralNetwork.deserialize(loadedBirdBrainJSON);
      this.brain = loadedBirdBrain.copy();
      console.log('Brain injected!');
      loadedBirdBrainSuccess = true;
      loadedBirdBrainJSON = null;
      loadedBirdBrainFlag = false;
    }
    else
    {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  show()
  {
    fill(255, 100);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }


  think(pipes)
  {
    // find the closest pipe
    let closestPipe = null;
    let closestPipeD = Infinity;
    for (let i = 0; i < pipes.length; i++)
    {
      let d = (pipes[i].x + pipes[i].w) - this.x;
      if (d < closestPipeD && d > 0)
      {
        closestPipe = pipes[i];
        closestPipeD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / window.innerHeight;                // Bird's Y Position
    inputs[1] = closestPipe.top / window.innerHeight;       // Closest Pipe Top Y Position
    inputs[2] = closestPipe.bottom / window.innerHeight;    // Closest Pipe Bottom Y Position
    inputs[3] = closestPipe.x / window.innerWidth;          // Closest Pipe X Position
    inputs[4] = this.v / this.vNormalize;                   // Bird's Velocity
    let output = this.brain.predict(inputs);

    if (output[0] > output[1])
    {
      this.up();
    }
  }

  update()
  {
    this.score++;

    this.v += this.g;
    this.y += this.v;
  }

  up()
  {
    this.v -= this.lift;
  }

  mutate()
  {
    this.brain.mutate(0.1);
  }

  life()
  {
    // bird dies if it hits the top or the bottom of the screen
    if (this.y > window.innerHeight || this.y < 0)
    {
      return true;
    }
    return false;
  }
}
