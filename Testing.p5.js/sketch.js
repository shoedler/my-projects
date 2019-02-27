var particles = [];
var player;
var TOTAL_PARTICLES = 30
var attractor;
var bgColor = 51;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  var sum = 0;

  for (var k = 1; k <= 5; k++) {
    sum += (1 / k);
  }

  console.log(sum);

  for (var i = 0 ; i < TOTAL_PARTICLES ; i++){
    particles[i] = new Particle(random(width), random(height), random(1,3));
  }
  attractor = new Attractor(width/2, height/2);
  player = new Particle(width / 4, height / 4, 2);
}

function draw() {
  background(bgColor);

  var fPlayer = attractor.calculateAttraction(player);
  player.applyForce(fPlayer);
  player.update();
  player.show();
  // player.hitsBorders();

  // for (var i=0; i < particles.length; i++) {
  //     var force = attractor.calculateAttraction(particles[i]);
  //     particles[i].applyForce(force);
  //     particles[i].update();
  //     particles[i].show();
  //     particles[i].hitsBorders();
  // }
  attractor.show();
}

function keyPressed() {
  var fMod
  switch (keyCode) {
    case 38: // up
      fMod = createVector(0, -1);
      player.acc.add(fMod);
      break;

    case 40: // down
      fMod = createVector(0, 1);
      player.acc.add(fMod);
      break;

    case 37: // left
      fMod = createVector(-1, 0);
      player.acc.add(fMod);
      break;

    case 39: // right
      fMod = createVector(1, 0);
      player.acc.add(fMod);
      break;
    console.log(player.acc);
  }
}
