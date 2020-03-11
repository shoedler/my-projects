let vxMax = 8;
let vyMax = 15;

class Projectile
{
  constructor(brain)
  {
    // Visual properties
    this.color = color(255, 255, 255, 150);
    this.r = 7;

    // Physical properties
    this.launchVelocityX = 0;
    this.launchVelocityY = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.x = wWidth / 30;
    this.y = (wHeight - groundLevel) - this.r / 2;

    this.trail = [];
    this.trailLength = 10;

    // Genetic properties
    this.score = 0;
    this.fitness = 0;
    if (brain)
    {
      this.brain = brain.copy();
    }
    else
    {
      this.brain = new NeuralNetwork(4, 8, 2);
    }
  }


  think = (target) =>
  {
    let inputs = [];

    inputs[0] = this.y / wHeight;            // The Projectiles Y Position
    inputs[1] = this.x / wWidth;             // The Projectiles X Position
    inputs[2] = target.lowerBoundary;        // The Targets Lower Boundary X Position
    inputs[3] = target.upperBoundary;        // The Targets Upper Boundary X Position

    let output = this.brain.predict(inputs);

    return { 
              velocityX: vxMax * output[0], 
              velocityY: vyMax * output[1]
            }
  }


  launch = (velocities) =>
  {
    this.velocityX = velocities.velocityX;
    this.velocityY = velocities.velocityY;
  }


  mutate = () =>
  {
    this.brain.mutate(0.1);
  }


  draw = () =>
  {
    // Draw Projectile
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);

    // Draw Score
    textAlign(CENTER, TOP);
    fill(255);
    textSize(10);
    text(nfc(this.score,3), this.x, this.y - 2* this.r);
  }


  update = (target) =>
  {
    // Update Score, 1 = Maximum
    let d = target.middle - this.x
    this.score = 1 - 1 / target.middle * abs(d);

    
    // Physics, Y Axis
    
    let isOnGround = false;
    this.velocityY -= gravity;
    
    // Ground Bounce
    if (this.y - this.velocityY > (wHeight - groundLevel) - this.r / 2)
    {
      this.velocityY = -this.velocityY * bounciness;
      this.y = (wHeight - groundLevel) - this.r / 2;

      isOnGround = true;
      
      // Zero Velocity if it's smaller than gravity
      if (abs(this.velocityY) < gravity)
      {
        this.velocityY = 0;
      }
    }

    this.y -= this.velocityY;

    // Physics, X Axis
  
    // Subtract Air Resistance
    if (this.velocityX > 0 && this.velocityX - airResistance > 0) this.velocityX -= airResistance * this.velocityX;
    if (this.velocityX < 0 && this.velocityX + airResistance < 0) this.velocityX += airResistance * -this.velocityX;
    
    // Zero Velocity if in certain range
    if (this.velocityX <= airResistance + groundFriction && this.velocityX >= -airResistance - groundFriction)
    {
      this.velocityX = 0;
    }

    // Subtract Ground Friction
    if (isOnGround)
    {
      if (this.velocityX > 0 && this.velocityX - groundFriction > 0) this.velocityX -= groundFriction * this.velocityX;
      if (this.velocityX < 0 && this.velocityX + groundFriction < 0) this.velocityX += groundFriction * -this.velocityX;
    }

    // Right Wall bounce
    if (this.x + (this.r / 2) >= wWidth)
    {
      this.velocityX = -this.velocityX;
    }

    this.x += this.velocityX;
  }


  drawTrail = () =>
  {
    this.trail.push(new Trail(this.x, this.y));
    this.trail.forEach(t => t.draw());
    if (this.trail.length > this.trailLength) this.trail.splice(0, 1);
  }


  life = () =>
  {
    return (this.velocityX == 0 && this.velocityY == 0) ? true : false;
  }
}


class Trail
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }


  draw()
  {
    fill(255, 255, 255, 60);
    stroke(150);
    point(this.x, this.y);
  }
}
