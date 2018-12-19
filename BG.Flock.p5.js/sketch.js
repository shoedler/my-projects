// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

const flock = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }
}

// Update canvas size in cas the user resizes his browser window
window.onresize = function(e) {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(53,53,53);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
