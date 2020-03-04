let vxMax = 8;
let vyMax = 15;

class Projectile
{
  constructor(brain)
  {
    // visual properties
    this.color = color(255, 255, 255, 150);
    this.r = 7;

    // physical properties
    this.vx = 0;
    this.vy = 0;
    this.x = wWidth / 30;
    this.y = (wHeight - groundLevel) - this.r / 2;

    this.trail = [];
    this.trailLength = 10;

    // genetic properties
    this.score = 0;
    this.fitness = 0;
    if (brain)
    {
      this.brain = brain.copy();
    }
    else
    {
      this.brain = new NeuralNetwork(3, 8, 2);
    }
  }

  think(target) {
    let inputs = [];
    inputs[0] = this.y / wHeight;
    inputs[1] = this.x / wWidth;
    inputs[2] = target.middle / wWidth;

    let output = this.brain.predict(inputs);
    this.vx = vxMax * output[0];
    this.vy = vyMax * output[1];
  }

  mutate()
  {
    this.brain.mutate(0.1);
  }

  show()
  {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);

    // score
    textAlign(CENTER, TOP);
    fill(255);
    textSize(10);
    text(nfc(this.score,3), this.x, this.y - 2* this.r);
  }

  update(target)
  {
    // increase score. 1 = max
    if (this.x < target.middle)
    {
      this.score = 1 / target.x * this.x;
    }

    if (this.x > target.middle)
    {
      this.score = target.middle / this.x;
    }

    // physics
    this.y -= this.vy;
    if (this.y - this.vy > (wHeight - groundLevel) - this.r / 2)
    {
      this.vy = 0;
      this.y = (wHeight - groundLevel) - this.r / 2;
    }
    else
    {
      this.vy -= gravity;
    }

    if (this.vx <= 0)
    {
      this.vx = 0;
    }
    else if (this.x + (this.r / 2) >= wWidth)
    {
      this.vx = 0;
      this.x = (wWidth - this.r / 2)
    }
    else
    {
      this.vx -= airResistance;
      this.x += this.vx;
    }
  }

  updateTrail()
  {
    this.trail.push(new Trail(this.x, this.y));
    for (let trail of this.trail)
    {
      trail.show();
    }

    if (this.trail.length > this.trailLength)
    {
      this.trail.splice(0, 1);
    }
  }

  life()
  {
    if (this.vx == 0 && this.vy == 0)
    {
      return true;
    }
    return false;
  }
}

class Trail
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  show()
  {
    fill(255, 255, 255, 60);
    stroke(150);
    point(this.x, this.y);
  }
}
