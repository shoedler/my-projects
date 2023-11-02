class Simulation {
  constructor(n = 5) {
    /* Simulation Properties */
    this.cyclesPerFrame = 1;
    this.frameRate = 60;
    this.frameRateBuffer = [];
    this.frameRateSamples = 100;
    frameRate(this.frameRate);

    /* Pendulum Properties */
    this.pendulumPopulation = [];
    this.pendulumAmount = n;
    this.pendulumLengthDifference = 3;
    this.pendulumMaxLenght = window.innerHeight / 5;
    this.pendulumBallSize = 20;
    this.pendulumStartingAngle = Math.PI / 2;
    this.pendulumAngularVelocityDampening = 1;
    this.pendulumGravityConstant = 0.5;
    this.pendulumRGBSumRange = { from: 473, to: 700 };
    this.pendulumCircumference = true;

    /* Graph Properties */
    this.graph = null;
    this.graphScrollSpeed = 2;
    this.graphDivisions = 8;
    this.graphCaptureRate = 1;
    this.graphLabelSine = false;
    this.graphLabelAngle = false;
    this.graphSmoothing = false;

    /* Scale Properties */
    this.scaleAngle = HALF_PI;
    this.scaleShow = true;
    this.scaleDrawSine = false;
    this.scaleDrawCosine = false;
    this.scale = new Scale(this);

    this.reset();
  }

  get pendulums() {
    return this.pendulumAmount;
  }
  set pendulums(n) {
    this.pendulumAmount = n;
    if (n < this.pendulumPopulation.length) {
      this.pendulumPopulation.splice(n);
    } else if (n > this.pendulumPopulation.length) {
      for (let i = this.pendulumPopulation.length - 1; i <= n; i++) {
        /* Make arbitrary colors with good contrast */
        let r = 200;
        let g = 200;
        let b = 200;
        let RGBSum = r + g + b;

        while (RGBSum > this.pendulumRGBSumRange.from && RGBSum < this.pendulumRGBSumRange.to) {
          r = random(70, 255);
          g = random(70, 255);
          b = random(70, 255);
          RGBSum = r + g + b;
        }

        this.pendulumPopulation.push(new Pendulum(this, i, r, g, b));
      }
    }
  }

  reset = () => {
    this.pendulumPopulation = []; /* Remove current population */
    this.graph = null; /* Remove current Graph */

    for (let i = 0; i < this.pendulumAmount; i++) {
      /* Make arbitrary colors with good contrast */
      let r = 200;
      let g = 200;
      let b = 200;
      let RGBSum = r + g + b;

      while (RGBSum > this.pendulumRGBSumRange.from && RGBSum < this.pendulumRGBSumRange.to) {
        r = random(70, 255);
        g = random(70, 255);
        b = random(70, 255);
        RGBSum = r + g + b;
      }

      this.pendulumPopulation.push(new Pendulum(this, i, r, g, b));
    }

    /* Create new Graph */
    this.graph = new Graph(this);
  };

  run = () => {
    for (let i = 0; i < this.cyclesPerFrame; i++) {
      this.pendulumPopulation.forEach((p) => p.update());
    }

    /* Handle framerate equalization */
    this.frameRateBuffer.push(frameRate());

    if (this.frameRateBuffer.length == this.frameRateSamples) {
      let frameSum = this.frameRateBuffer.reduce((a, c) => a + c);
      this.frameRate = frameSum / this.frameRateBuffer.length;
      this.frameRateBuffer = [];
      console.log(this.frameRate);
    }
  };

  render = () => {
    if (this.pendulumCircumference) this.pendulumPopulation.forEach((p) => p.drawCircumference());
    this.pendulumPopulation.forEach((p) => p.draw());

    this.graph.draw();
    this.scale.draw();
  };
}
