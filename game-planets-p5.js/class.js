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

    this.vx = x < winWidth / 2 ? random(-0.1, -1) : random(0.1, 1);
    this.vy = y < winHeight / 2 ? random(-0.1, -1) : random(0.1, 1);
  }

  show() {
    noStroke();
    if (this.player) {
      fill(random(255), random(255), random(255));
      ellipse(this.x, this.y, this.r, this.r);
    } else {
      fill(this.color_r, this.color_g, this.color_b);
      ellipse(this.x, this.y, this.r, this.r);
    }
  }

  update() {
    // Y
    this.vy += this.y < winHeight / 2 ? this.mass * gravityY : -this.mass * gravityY;
    this.y += this.vy;

    // X
    this.vx += this.x < winWidth / 2 ? this.mass * gravityX : -this.mass * gravityX;
    this.x += this.vx;
  }

  move(vx, vy) {
    this.vx += vx;
    this.vy += vy;
  }

  life(entity) {
    // Detect collision with another entity
    let x = entity.x - this.x;
    let y = entity.y - this.y;

    // Detect collision using the phytagorean theorem
    let distance = sqrt(x * x + y * y) - (entity.r / 2 + this.r / 2);

    if (distance <= 0) {
      if (this.r < entity.r) {
        entity.r = entity.r - distance / 6;
        this.r = this.r + distance / 1;
      } else {
        this.r = this.r - distance / 6;
        entity.r = entity.r + distance / 1;
      }
    }

    // True if dead
    if (this.r <= 0) return true;
  }
}

class BlackHole {
  constructor(r) {
    this.r = r;
    this.x = winWidth / 2;
    this.y = winHeight / 2;
    this.endGradient = BG_COLOR; // bgColor is a global var
    this.startGradient = 20;
  }

  show() {
    let reverse_i;
    for (let i = this.r; i > 0; i--) {
      reverse_i = this.r - i;
      let gradient =
        this.startGradient + reverse_i > this.endGradient ? this.endGradient : this.startGradient + reverse_i;
      fill(gradient);
      ellipse(this.x, this.y, i, i);
    }
  }
}
