class Projectile {
  constructor() {
    // visual properties
    this.color = 200;
    this.r = 7;

    // physical properties
    this.vx = 0;
    this.vy = 0;
    this.x = wWidth / 30;
    this.y = (wHeight - groundLevel) - this.r / 2;

    // genetic properties
    this.score = 0;
    this.fitness = 0;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }

  update(target) {
    // increase score
    if (this.x < target.lowerBoundary) {this.score = 1 / target.x * this.x;}
    if (this.x > target.upperBoundary) {this.score = target.middle / this.x;}

    // evaluate if the projectile won
    if (this.vy == 0) {
      if (this.x - this.r > target.x && this.x + this.r < target.x + target.w) {
        // won the game
      }
    }
    // physics
    this.y -= this.vy;
    if (this.y - this.vy > (wHeight - groundLevel) - this.r / 2) {
      this.vy = 0;
    } else {
      this.vy -= gravity;
    }

    if (this.vx <= 0) {
      this.vx = 0;
    } else {
      this.vx -= airResistance;
      this.x += this.vx;
    }

  }
}
