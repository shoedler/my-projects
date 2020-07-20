var bird;
var pipes = [];

function setup()
{
  createCanvas(window.innerWidth, window.innerHeight);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw()
{
  background(51);

  if (bird.life()) gameOver();

  for (var i = pipes.length - 1; i > 0 ; i--)
  {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) gameOver();
    if (pipes[i].offscreen()) pipes.splice(i, 1);
  }

  bird.update();
  bird.show();

  if (frameCount % 80 == 0) pipes.push(new Pipe()); 

  stats();

}

function keyPressed()
{
  if (key == ' ') bird.up();
}

const gameOver = () =>
{
  noLoop();
  textAlign(CENTER, CENTER);
  fill(255);
  textFont("consolas");
  textSize(80);
  text("GAME OVER", window.innerWidth / 2, window.innerHeight / 2);
  textSize(60);
  text(frameCount / 10, window.innerWidth / 2, window.innerHeight / 2 + 80);
}

const stats = () =>
{
  textAlign(LEFT, CENTER);
  fill (255);
  textFont("consolas");
  textSize(12);
  blendMode(DIFFERENCE);
  text(frameCount / 10, window.innerWidth / 100, window.innerHeight / 200);
  blendMode(BLEND);
}
