const B = 31;
let p = null;
let b = [];

function setup()
{
  createCanvas(window.innerWidth, window.innerHeight);
  p = new Player();
  for (let i = 0; i < 5; i++) b.push(new Boundary(random(0, width), random(0, height), random(0, width), random(0, height)));
}

function draw()
{
  background(B);

  // let xofs = 0;
  // let yofs = 0;

  // if (keyIsDown(DOWN_ARROW))  yofs = -0.1;
  // if (keyIsDown(UP_ARROW))    yofs = 0.1;
  // if (keyIsDown(LEFT_ARROW))  xofs = -0.1;
  // if (keyIsDown(RIGHT_ARROW)) xofs = 0.1;

  p.run(keyIsDown(CONTROL), keyIsDown(ENTER), b);
  b.forEach(bound => bound.render());

  noStroke();
  textSize(10);
  fill(100);
  text(frameRate().toFixed(2), 10, 10);
  text(`pos vec x ${p.pos.x.toFixed(2)}`, 10, 20);
  text(`pos vec y ${p.pos.y.toFixed(2)}`, 10, 30);
  text(`dir vec x ${p.dir.x.toFixed(2)}`, 10, 40);
  text(`dir vec y ${p.dir.y.toFixed(2)}`, 10, 50);
  push()
  translate(p.pos)
  let a = degrees(p.pos.angleBetween(createVector(mouseX, mouseY)));
  pop();
  text(`view angle ${a} deg`, 10, 60);
}

