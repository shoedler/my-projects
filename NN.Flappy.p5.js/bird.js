class Bird {
  constructor(brain) {
    this.y = window.innerHeight / 2;
    this.x = 60;
    this.r = 32;

    this.g = 0.6;
    this.v = 0;
    this.lift = 12;

    this.score = 0;
    this.fitness = 0;

    // only make brain if it doesn't have one (1st generation)
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 4, 2);
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r, this.r);
  }

  think(pipes) {

    // find the closest pipe
    let closestPipe = null;
    let closestPipeD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < closestPipeD) {
        closestPipe = pipes[i];
        closestPipeD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / window.innerHeight;
    inputs[1] = closestPipe.top / window.innerHeight;
    inputs[2] = closestPipe.bottom / window.innerHeight;
    inputs[3] = closestPipe.x / window.innerWidth;
    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.up();
    }
  }

  update() {
    this.score++;

    this.v += this.g;
    this.y += this.v;
  }

  up() {
    this.v -= this.lift;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  life() {
    // bird dies if it hits the top or the bottom of the screen
    if (this.y > window.innerHeight) {
      return true;
    } else if (this.y < 0) {
      return true;
    }
    return false;
  }

}
