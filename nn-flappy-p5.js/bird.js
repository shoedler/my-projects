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

    this.brain = brain? brain.copy() : new NeuralNetwork(5, 8, 2)
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

  up = () => this.v -= this.lift; 

  mutate = (v = 0.1) => this.brain.mutate(v);
  
  // bird dies if it hits the top or the bottom of the screen
  life = () => this.y > window.innerHeight || this.y < 0
}
