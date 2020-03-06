let angle = 0;
let viewAngle;
let grid = 10;
let size = 20;

function setup() 
{
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  viewAngle= atan(1 / sqrt(2));
}

function draw()
{
  background(53, 53, 53);
  rectMode(CENTER);
  ambientMaterial(140, 250, 230);
  ortho();
  noStroke();

  ambientLight(0, 120, 120);
  directionalLight(192, 70, 20, 0, 0, -1)

  rotateX(-QUARTER_PI);
  rotateY(viewAngle)

  for (let z = -grid; z <= grid; z++)
  {
    for (let x = -grid; x <= grid; x++)
    {
      push();

      let d = dist(x * size, z * size, grid / 2, grid / 2);
      let o = map(d, 0, size * grid, -5, 5);
      let a = angle + o;
      let y = map(sin(a), -1, 1, 100, 300);

      translate(x * size, 0, z * size);
      box(size, y, size);

      pop();
    }
  }

  angle += 0.1;
}