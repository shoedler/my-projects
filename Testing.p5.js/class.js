class Entity {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.r = 20;
    this.gravity = 0.01;
    this.airResistance = 0.009;
    this.color_r = 255;
    this.color_g = 255;
    this.color_b = 255;
    this.player = false;
  }

  show() {
    noStroke();
    if (this.player) {
      for (let i = 1; i < this.r; i++) {
        fill(random(255), random(255), random(255));
        ellipse(this.x, this.y, i, i);
      }
    } else {
      fill(this.color_r, this.color_g, this.color_b);
      ellipse(this.x, this.y, this.r, this.r);
    }
  }

  update() {
    // y physics
    if (this. y < wHeight / 2) {
      this.vy += this.gravity;
    } else {
      this.vy -= this.gravity;
    }
    this.y += this.vy;

    // x physics
    // if (this.vx + this.airResistance > 0) {
    //   this.vx -= this.airResistance;
    // } else if (this.vx - this.airResistance < 0) {
    //   this.vx += this.airResistance;
    // } else {
    //   this.vx = 0;
    // }

    if (this.x < wWidth / 2) {
      this.vx += this.airResistance;
    } else {
      this.vx -= this.airResistance;
    }

    this.x += this.vx

  }

  move(vx, vy) {
    this.vx += vx;
    this.vy += vy;
  }

}
