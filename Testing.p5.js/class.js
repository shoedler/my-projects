
function Particle(x,y,m) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(0, 1),random(0, 1));
  this.acc = createVector(0, 0);
  this.mass = m;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    // var f = p5.Vector.div(force,this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.hitsBorders = function() {
    // border collision on y axis
    if(this.pos.y > height - this.mass * 5) {
      this.vel.y *=- 1;
      this.pos.y = height - this.mass * 5;
    }
    if(this.pos.y < this.mass * 5) {
      this.vel.y *=- 1;
      this.pos.y = this.mass * 5;
    }

    // border collision on x axis
    if (this.pos.x > width - this.mass * 5) {
      this.vel.x *=- 1;
      this.pos.x = width - this.mass * 5;
    }
    if (this.pos.x < this.mass * 5) {
      this.vel.x *=- 1;
      this.pos.x = this.mass * 5;
    }
  }

  this.show = function() {
    fill(255, 150);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10);
  }
}


function Attractor() {
  this.pos = createVector(width / 2, height / 2);
  this.mass = 60;
  this.G = 1;
  this.endGradient = bgColor; // bgColor is a global var
  this.startGradient = 20;

  this.calculateAttraction = function(p) {
    var force = p5.Vector.sub(this.pos, p.pos);
    var distance = force.mag();

    distance = constrain(distance, 5, 25);
    force.normalize();

    var strength = (this.G * this.mass * p.mass) / (distance * distance);

    force.mult(strength);
    return force;
  }

  this.show = function() {
    let reverse_i;
    noStroke();

    for (let i = this.mass; i > 0; i--) {
      reverse_i = this.mass - i;
      if ((this.startGradient + reverse_i) > this.endGradient) {
        fill(this.endGradient);
      } else {
        fill(this.startGradient + reverse_i);
      }
      ellipse(width / 2, height / 2, i, i);
    }
  }
}
