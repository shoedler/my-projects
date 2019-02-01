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

  life(blackhole, entity) {
    // ######
    // detect collision with black hole
    let xB = blackhole.x - this.x;
    let yB = blackhole.y - this.y;

    // detect collision with another entity
    let xE = entity.x - this.x;
    let yE = entity.y - this.y;

    // detect collision using the phytagorean theorem
    let distanceB = sqrt(xB*xB + yB*yB)-(blackhole.r / 2 + this.r / 2);
    let distanceE = sqrt(xE*xE + yE*yE)-(entity.r / 2 + this.r / 2);

    if (distanceB <= 0) { // collision happened
      this.r = this.r + distanceB;
    }

    if (distanceE <= 0) {
      this.r = this.r + distanceE;
    }

    console.log(distanceE);
    console.log(distanceB);
    debugger;

    // true if dead
    if (this.r <= 0) {
      return true;
    }

  }
}

class BlackHole {
  constructor(r) {
    this.r = r;
    this.x = wWidth / 2;
    this.y = wHeight / 2;
    this.endGradient = bgColor; // bgColor is a global var
    this.startGradient = 20;
  }

  show() {
    let reverse_i;
    for (let i = this.r; i > 0; i--) {
      reverse_i = this.r - i;
      if ((this.startGradient + reverse_i) > this.endGradient) {
        fill(this.endGradient);
      } else {
        fill(this.startGradient + reverse_i);
      }

      ellipse(this.x, this.y, i, i);
    }
  }
}
