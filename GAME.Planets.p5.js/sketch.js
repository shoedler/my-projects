let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
let bgColor = 51;

let gravity_x = 0.01;
let gravity_y = 0.01;

let player;
let playerMoveForce = 2;
let hole;
let flock = [];
let dead = [];


function setup() {
  createCanvas(wWidth, wHeight);
  textFont("consolas");

  // create player
  player = new Entity(random(wWidth),
                      random(wHeight),
                      20,
                      true,
                      1);

  // create enemies
  for (var i = 0; i < 10; i++) {
    flock.push(new Entity(random(wWidth),     // initial x position
                          random(wHeight),    // initial y position
                          random(15, 40),     // radius
                          false,              // is player?
                          random(0.1, 1.5),   // mass
                          random(100, 255),   // red   component
                          random(100, 255),   // green component
                          random(100, 255))); // blue  component
  }

  // create blackhole
  hole = new BlackHole(100);
}


function draw() {
  background(bgColor);
  showScore(dead.length);

  hole.show();

  for (let i = 0; i < flock.length; i++) {
    flock[i].update();
    flock[i].show();
    if (flock[i].life(hole)) {
      dead.push(flock.splice(i, 1)[0]);
    }
  }

  player.update();
  player.show();
  if (player.life(hole)) {gameOver()}

  checkCollision();
}


function checkCollision() {
  for (let i = 0; i < flock.length; i++) {

    let x = flock[i].x - player.x;
    let y = flock[i].y - player.y;

    // detect collision using the phytagorean theorem
    let distance = sqrt(x*x + y*y)-(flock[i].r / 2 + player.r / 2);

    if (distance <= 0) { // collision happened

      if (flock[i].r < player.r) { // player "eats" flock[i] if it's radius is smaller than ours
        player.r += flock[i].r / 5;
        dead.push(flock.splice(i, 1)[0]);
        console.log("mampf");
      } else {                    // player gets "eaten" by flock[i]
        gameOver();
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


function showScore(score) {
  fill(200);
  textSize(20);
  textAlign(LEFT, BOTTOM);
  text("Dead " + score, wWidth * 0.05, wHeight * 0.1);
}


function gameOver() {
  fill(200);
  textSize(90);
  textAlign(CENTER,CENTER);
  text("GAME OVER", wWidth / 2, wHeight / 2);
  player.vx = 0;
  player.vy = 0;

  gravity_x = 0;
  gravity_y = 0;
  for (let entity of flock) {
    entity.vx = 0;
    entity.vy = 0;
  }
}


function windowResized() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}
