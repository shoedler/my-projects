let TIME_INIT = 15;
let seconds;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  setInterval(timeIt, 1000);
  seconds = TIME;
}

function draw() {
  if (TIME > 0) {
    background(31, 31, 31);
  } else {
    background(255, 70, 70);
  }
  textFont("consolas");
  textSize(100);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Countdown " + seconds, window.innerWidth / 2, window.innerHeight / 2);
}

function timeIt() {
  if (TIME > 0) {TIME--;}
  seconds = TIME % 60;
}

function keyPressed() {
  if (keyCode == 32) {
    console.log("Reset");
    TIME = TIME_INIT;
  }
}
