class Pipe {
  constructor() {
    this.top = random(window.innerHeight / 2);
    this.bottom = random(window.innerHeight / 2);
    this.spacing = 10;
    // ensure that the gap is at least a 10th of the window height
    while (this.bottom + this.top > window.innerHeight - window.innerHeight / this.spacing) {
      this.top = random(window.innerHeight / 2);
      this.bottom = random(window.innerHeight / 2);
    }
    this.x = window.innerWidth;
    this.w = 40;
    this.speed = 5;
  }

  hits(bird) {
    let halfBird = bird.r / 2;

    if (bird.y - halfBird < this.top || bird.y + halfBird > window.innerHeight - this.bottom) {
      // check if bird is in the x hitbox
      if (bird.x + halfBird > this.x && bird.x - halfBird < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top,);
    rect(this.x, window.innerHeight - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true
    } else {
      return false;
    }
  }
}
