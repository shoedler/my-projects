let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
let player;
let playerMoveForce = 2;
let flock = [];
let dead = [];

function setup() {
  createCanvas(wWidth, wHeight);

  // create player
  player = new Entity(random(wWidth), random(wHeight));
  player.player = true;

  // create enemies
  for (var i = 0; i < 10; i++) {
    flock.push(new Entity(random(wWidth), random(wHeight)));
  }

  // set each enemies values randomly
  for (let entity of flock) {
    entity.color_r = random(100, 255);
    entity.color_g = random(100, 255);
    entity.color_b = random(100, 255);
    entity.gravity = random(0.2, 0.5);      // 0.1   @ player
    entity.airResistance = random(0.1);     // 0.009 @ player
    entity.r = random(15, 50);              // 20    @ player
  }
}

function draw() {
  background(51);

  fill(200);
  textSize(20);
  textAlign(LEFT, BOTTOM);
  text("Score " + dead.length, wWidth * 0.05, wHeight * 0.1);

  for (let entity of flock) {
    entity.update();
    entity.show();
  }

  player.update();
  player.show();

  collides();
}

function collides() {
  for (let i = 0; i < flock.length; i++) {

    var x = flock[i].x - player.x;
    var y = flock[i].y - player.y;
    var distance = sqrt(x*x + y*y)-(flock[i].r / 2 + player.r / 2);

    if (distance <= 0) { // collision happened

      if (flock[i].r < player.r) { // player "eats" flock[i] if it's radius is smaller than ours
        player.r += flock[i].r / 5;
        dead.push(flock.splice(i, 1)[0]);
        console.log("mampf");
      }

    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case 38:
      player.move(0, -playerMoveForce);
      break;

    case 40:
      player.move(0, playerMoveForce);
      break;

    case 37:
      player.move(-playerMoveForce, 0);
      break;

    case 39:
      player.move(playerMoveForce, 0);
      break;
  }
}

function windowResized() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
