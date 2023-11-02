class Pipe {
  constructor() {
    this.top = random(window.innerHeight / 2);
    this.bottom = random(window.innerHeight / 2);
    // ensure that the gap is at least a 10th of the window height
    while (this.bottom + this.top > window.innerHeight - window.innerHeight / 10) {
      this.top = random(window.innerHeight / 2);
      this.bottom = random(window.innerHeight / 2);
    }
    this.x = window.innerWidth;
    this.w = 40;
    this.speed = 5;
  }

  hits(bird) {
    // check if bird is in the y hitbox
    if (bird.y < this.top || bird.y > window.innerHeight - this.bottom) {
      // check if bird is in the x hitbox
      if (bird.x > this.x && bird.x < window.innerWidth - this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, window.innerHeight - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
