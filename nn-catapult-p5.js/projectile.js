const VEL_X_MAX = 15;
const VEL_Y_MAX = 15;

class Projectile {
  constructor(brain) {
    // Visual properties
    this.color = color(255, 255, 255, 200);
    this.r = 7;

    // Physical properties
    this.velocityX = 0;
    this.velocityY = 0;
    this.x = wWidth / 30;
    this.y = wHeight - groundLevel - this.r / 2;
    this.id;

    this.trail = [];
    this.trailLength = 10;

    // Genetic properties
    this.score = 0;
    this.fitness = 0;
    this.guessedVelocityX = 0;
    this.guessedVelocityY = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 8, 2);
    }
  }

  think = (target) => {
    let inputs = [];

    inputs[0] = this.y / wHeight; // The Projectiles Y Position
    inputs[1] = this.x / wWidth; // The Projectiles X Position
    inputs[2] = target.lowerBoundary; // The Targets Lower Boundary X Position
    inputs[3] = target.upperBoundary; // The Targets Upper Boundary X Position

    let output = this.brain.predict(inputs);

    (this.guessedVelocityX = VEL_X_MAX * output[0]), (this.guessedVelocityY = VEL_Y_MAX * output[1]);
  };

  launch = () => {
    this.velocityX = this.guessedVelocityX;
    this.velocityY = this.guessedVelocityY;
  };

  mutate = () => {
    this.brain.mutate(0.1);
  };

  draw = () => {
    let yOffset = wHeight / 2;
    let xOffset = (this.id + 1) * 100;
    let textPoint = 10;

    // Draw Fitness & Score
    textAlign(LEFT, BOTTOM);
    fill(this.color);
    noStroke();
    textSize(textPoint);

    text(
      `gvx:     ${nfc(this.guessedVelocityX, 3)}\n` +
        `gvy:     ${nfc(this.guessedVelocityY, 3)}\n` +
        `fitness: ${nfc(this.fitness, 3)}\n` +
        `score:   ${nfc(this.score, 3)}`,
      xOffset,
      yOffset
    );

    // Draw Line
    stroke(255, 255, 255, 50);
    strokeWeight(1);
    drawingContext.setLineDash([2, 4]);
    line(this.x, this.y, xOffset, yOffset);
    drawingContext.setLineDash([]);

    // Draw Projectile
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  };

  update = (target) => {
    // Update Score, 1 = Maximum
    let d = target.middle - this.x;
    this.score = 1 - (1 / target.middle) * abs(d);

    // Physics, Y Axis
    let isOnGround = false;
    this.velocityY -= gravity;

    // Ground Bounce
    if (this.y - this.velocityY > wHeight - groundLevel - this.r / 2) {
      this.velocityY = -this.velocityY * bounciness;
      this.y = wHeight - groundLevel - this.r / 2;

      isOnGround = true;

      // Zero Velocity if it's smaller than gravity
      this.velocityY = abs(this.velocityY) < gravity ? 0 : this.velocityY;
    }

    this.y -= this.velocityY;

    // Physics, X Axis
    // Subtract Air Resistance
    this.velocityX -= this.velocityX > 0 && this.velocityX - airResistance > 0 ? airResistance * this.velocityX : 0;
    this.velocityX += this.velocityX < 0 && this.velocityX + airResistance < 0 ? airResistance * -this.velocityX : 0;

    // Zero Velocity if in certain range
    this.velocityX =
      this.velocityX <= airResistance + groundFriction && this.velocityX >= -airResistance - groundFriction
        ? 0
        : this.velocityX;

    // Subtract Ground Friction
    if (isOnGround) {
      if (this.velocityX > 0 && this.velocityX - groundFriction > 0) this.velocityX -= groundFriction * this.velocityX;
      if (this.velocityX < 0 && this.velocityX + groundFriction < 0) this.velocityX += groundFriction * -this.velocityX;
    }

    // Right Wall bounce
    this.velocityX *= this.x + this.r / 2 >= wWidth ? -1 : 1;

    this.x += this.velocityX;
  };

  drawTrail = () => {
    this.trail.push(new Trail(this.x, this.y));
    this.trail.forEach((t) => t.draw());
    if (this.trail.length > this.trailLength) this.trail.splice(0, 1);
  };

  life = () => {
    if (this.velocityX == 0 && this.velocityY == 0) {
      this.color = color(255, 50, 50, 100);
      return true;
    }
    return false;
  };
}

class Trail {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(255, 255, 255, 60);
    stroke(150);
    point(this.x, this.y);
  }
}
