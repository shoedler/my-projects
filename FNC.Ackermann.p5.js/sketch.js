let i = 0;
let j = 0;
let iteration = 4;

function setup()
{
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw()
{
  background(51);
}

function ackermann(ii, jj)
{
  let answer;

  if (ii == 0)
  {
    answer = jj + 1;
  }
  else if (jj == 0)
  {
    answer = ackermann(ii - 1, 1);
  } else
  {
    answer = ackermann(ii - 1, ackermann(ii, jj - 1));
  }

  return answer;
}

function keyPressed()
{
  if (key = " ")
  {

    if (j == iteration)
    {
      j = 0;
      i++;
    }

    j++;

    console.log("Ackermann of (" + i + ", " + j + ") is :");
    console.log(ackermann(i,j));
    console.log(" ");
  }
}
