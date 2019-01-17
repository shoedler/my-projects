// define module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// global defs
var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine
});
var world = engine.world;

var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  Engine.run(engine);
  Render.run(render);
  World.add(engine.world, [boxA, boxB, ground]);
}

function mousePressed() {
}

function draw() {
  //background(51);
}
