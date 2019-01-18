class Target {
  constructor() {
    this.w = wHeight / 40;
    this.x = random(wWidth / 2, wWidth - this.w);
    this.color = color(200, 0, 0, 100);
  }

  show() {
    fill(this.color);
    noStroke();
    rect(this.x, wHeight - groundLevel, this.w, groundLevel);
  }

  strike(projectile) {
    if (projectile.vy == 0) {
      if (projectile.x > this.x && projectile.x < this.x + this.w) {
        console.log("WON");
      }
    }
  }
}
