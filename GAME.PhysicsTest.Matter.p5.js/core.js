
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var engine;

var boxA;
var boxB;
var ground;

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  boxA = Bodies.rectangle(windowWidth / 2, windowHeight / 2, 80, 80);
  boxB = Bodies.rectangle(windowWidth / 3, windowHeight / 3, 80, 80);
  ground = Bodies.rectangle(windowWidth / 2, windowHeight + (windowHeight / 20), windowWidth + (windowWidth / 20), 60, {
    isStatic: true
  });
  World.add(engine.world, [boxA, boxB, ground]);
  Engine.run(engine);
}

function draw() {
  // I could ask for everything in the world
  // var bodies = Composite.allBodies(engine.world);

  background(51);

  var vertices = boxA.vertices;
  fill(255);
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape();

  // boxB vertices
  var vertices = boxB.vertices;
  fill(255);
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape();

  // Ground vertices
  var vertices = ground.vertices;
  beginShape();
  fill(127);
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
