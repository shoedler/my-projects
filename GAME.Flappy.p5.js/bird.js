class Bird {
  constructor() {
    this.y = window.innerHeight / 2;
    this.x = 60;
    this.r = 32;
    this.g = 0.6;
    this.v = 0;
    this.lift = 17;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r, this.r);
  }

  update() {
    this.v += this.g;
    this.y += this.v;
  }

  up() {
    this.v -= this.lift;
  }

  life() {
    // bird dies if it hits the top or the bottom of the screen
    if (this.y > window.innerHeight) {
      return true;
    } else if (this.y < 0) {
      return true;
    }
    return false;
  }

}
