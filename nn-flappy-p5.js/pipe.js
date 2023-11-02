class Pipe {
  constructor() {
    this.spacing = 125;
    this.top = random(window.innerHeight / 6, (3 / 4) * window.innerHeight);
    this.bottom = height - (this.top + this.spacing);

    this.x = window.innerWidth;
    this.w = 80;
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
    noStroke();
    rectMode(CORNER);
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
