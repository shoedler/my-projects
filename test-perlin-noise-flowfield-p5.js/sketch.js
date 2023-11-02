const INCREMENT = 0.1;
const SCALE = 30;

let f = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  let rows = floor(height / SCALE);
  let columns = floor(width / SCALE);

  f = new Flowfield(rows, columns, SCALE);

  background(255);
}

function draw() {
  fill(255);
  rect(0, 0, 40, textSize());
  textAlign(LEFT, TOP);
  fill(150);
  text(nfc(frameRate(), 2), 0, 0);

  f.update();
}

class Flowfield {
  constructor(r, c, s) {
    this.rows = r;
    this.columns = c;
    this.scale = s;

    this.particleAmount = 10000;
    this.increment = 0.1;
    this.zIncrement = 0.002;

    this.yOffset = 0;
    this.xOffset = 0;
    this.zOffset = 0;

    this.debug = false;

    this.vectors = [];
    this.vectors.length = this.rows * this.columns;

    this.particles = [];

    this.populate();
  }

  populate = () => {
    for (let i = 0; i < this.particleAmount; i++) {
      this.particles.push(new Particle(this));
    }
  };

  update = () => {
    /* Update Flowfield */
    this.yOffset = 0;
    for (let y = 0; y < this.rows; y++) {
      this.xOffset = 0;
      for (let x = 0; x < this.columns; x++) {
        let angle = noise(this.xOffset, this.yOffset, this.zOffset) * TWO_PI * 3;

        let v = p5.Vector.fromAngle(angle);
        v.setMag(1);

        this.vectors[this.index(x, y)] = v;

        if (this.debug) this.drawDebug(x, y, v);

        this.xOffset += this.increment;
      }

      this.yOffset += this.increment;
    }

    this.zOffset += this.zIncrement;

    /* Update Particles */
    this.particles.forEach((p) => {
      let x = floor(p.pos.x / this.scale);
      let y = floor(p.pos.y / this.scale);
      p.follow(this.vectors[this.index(x, y)]);
      p.update();
      p.edges();
      p.show();
    });
  };

  index = (x, y) => {
    return x + y * this.columns;
  };

  drawDebug = (x, y, v) => {
    /* Grid */
    stroke(150);
    strokeWeight(0.5);
    fill(255);
    rect(x * this.scale, y * this.scale, this.scale, this.scale);

    /* Vector */
    push();
    stroke(0);
    strokeWeight(1);
    translate(x * SCALE, y * SCALE);
    rotate(v.heading());
    line(0, 0, SCALE, 0);
    pop();

    /* Grid Label */
    textAlign(LEFT, TOP);
    noStroke();
    fill(150);
    textSize(10);
    text(`X${x}/Y${y}`, x * this.scale, y * this.scale);
  };
}

function Particle(p) {
  this.parent = p;
  this.pos = createVector(
    random(this.parent.columns * this.parent.scale),
    random(this.parent.rows * this.parent.scale)
  );
  this.prePos = this.pos.copy();
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = 4;

  this.update = () => {
    this.prePos.x = this.pos.x;
    this.prePos.y = this.pos.y;

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = (f) => {
    this.acc.add(f);
  };

  this.show = () => {
    stroke(0, 5);
    strokeWeight(0.5);
    line(this.pos.x, this.pos.y, this.prePos.x, this.prePos.y);
  };

  this.edges = () => {
    if (this.pos.x < 0) {
      this.pos.x = this.prePos.x = this.parent.columns * this.parent.scale;
    }

    if (this.pos.y < 0) {
      this.pos.y = this.prePos.y = this.parent.rows * this.parent.scale;
    }

    if (this.pos.x > this.parent.columns * this.parent.scale) {
      this.pos.x = this.prePos.x = 0;
    }

    if (this.pos.y > this.parent.rows * this.parent.scale) {
      this.pos.y = this.prePos.y = 0;
    }
  };

  this.follow = (vector) => {
    this.applyForce(vector);
  };
}
