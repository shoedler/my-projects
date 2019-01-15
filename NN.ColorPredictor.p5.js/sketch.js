

let r,g,b;
let brain;
let which = "black";

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop();
  // new neural netork instance, 3 Inputs, 3 Hidden Nodes, 2 outputs
  brain = new NeuralNetwork(3, 3, 2);

  // train neural nework, i times
  for (let i = 0; i < 10000; i++) {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let targets = trainColor(r, g, b);
    let inputs = [r / 255, g / 255, b / 255];
    brain.train(inputs, targets);
  }

  pickColor();
}

function draw() {
  background(r, g, b);

  strokeWeight(5);
  stroke(255 - r, 255 - g, 255 - b);
  line(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);

  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", window.innerWidth / 4 , window.innerHeight / 2);
  fill(255);
  text("white", window.innerWidth / 4 * 3, window.innerHeight / 2);

  let which = colorPredictor(r, g, b);

  if (which == "black") {
    fill(0);
    ellipse(window.innerWidth / 4 , window.innerHeight / 7 * 4, 60);
  } else {
    fill(255);
    ellipse(window.innerWidth / 4 * 3, window.innerHeight / 7 * 4, 60)
  }
}

function colorPredictor(r, g, b) {
  let inputs = [r / 255, g / 255, b / 255];
  // Feed forward data trough neural network
  let outputs = brain.predict(inputs);
  console.log(outputs);
  console.log("Total rgb value:");
  console.log(round(r+b+g));
  console.log("rgb individually:");
  console.log(round(r));
  console.log(round(g));
  console.log(round(b));

  if (outputs[0] > outputs[1]) {
    return "black";
  } else {
    return "white";
  }

}

function trainColor(r, g, b) {
  if (r + g + b > 300) {
    return [1, 0];
  } else {
    return [0, 1];
  }
}

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}

function mousePressed() {
  // let targets;
  // let inputs = [r / 255, g / 255, b / 255];
  //
  // // train neural network
  // if (mouseX > window.innerWidth / 2) {
  //   targets = [0, 1]; // correct output is black
  // } else {
  //   targets = [1, 0]; // correct output is white
  // }
  //
  // brain.train(inputs, targets);

  pickColor();
}
