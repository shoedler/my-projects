
class Entity {
  constructor(x, y, r, player, mass, color_r, color_g, color_b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color_r = color_r;
    this.color_g = color_g;
    this.color_b = color_b;
    this.player = player;
    this.mass = mass;

    this.vx = 0;
    this.vy = 0;
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
    if (this.y < wHeight / 2) {
      this.vy += (this.mass * gravity_y);
    } else {
      this.vy -= (this.mass * gravity_y);
    }
    this.y += this.vy;

    if (this.x < wWidth / 2) {
      this.vx += (this.mass * gravity_x);
    } else {
      this.vx -= (this.mass * gravity_x);
    }

    this.x += this.vx

  }

  move(vx, vy) {
    this.vx += vx;
    this.vy += vy;
  }

}
