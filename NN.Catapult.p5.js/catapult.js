class Projectile {
  constructor() {
    // physical properties
    this.vx = 0;
    this.vy = 0;
    this.x = 0;
    this.y = 0;
    this.r = 5;

    // visual properties
    this.color = 0;

    // genetic properties
    this.score = 0;
    this.fitness = 0;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }

  update() {
    this.score++;

    this.vy -= airResistance;
    this.y += this.vy;

    this.vx += gravity;
    this.x += this.vx;

  }
}
