const Rows = 200;
const Cols = 200;

const wWidth = window.innerHeight;
let wHeight = wWidth;

let current = [];
let previous = [];
let pixDensity;

const Dampening = 0.98;
const Contrast = 0;

function setup()
{
  /* Set pixel density according to desired window width */
  pixDensity = Rows / wWidth;
  pixelDensity(pixDensity);

  /* Initialize 2d arrays */
  for (let x = 0; x < Rows; x++)
  {
    current[x] = new Array(Cols);
    previous[x] = new Array(Cols);
    /* Add value to each pixel */
    for (let y = 0; y < Cols; y++)
    {
      current[x][y] = 0;
      previous[x][y] = 0;
    }
  }

  /* Give middle pixel an arbitrary value */
  current[ceil(Rows/2)][ceil(Cols/2)] = 5000;
  createCanvas(wWidth, wHeight);
}

function mouseDragged()
{
  current[floor(mouseX * pixDensity)][floor(mouseY * pixDensity)] = 5000;
}

function draw()
{
  background(0);

  /* Ripple algorhytm" */
  loadPixels();
  for (let x = 1; x < Rows - 1; x++)
  {
    for (let y = 1; y < Cols - 1; y++)
    {
      for (let i = -1; i == 1; i++) /* Zero the cells if smaller than zero */
      {
        for (let j = -1; j == 1; j++)
        {
          if (previous[x+i][y+j] < 0) {previous[x+i][y+j] = 0};
        }
      }

      /* Algorhytm */
      current[x][y] = (previous[x+1][y] +
                       previous[x-1][y] +
                       previous[x][y+1] +
                       previous[x][y-1]) / 2 - current[x][y];

      /* Apply dampening */
      current[x][y] = current[x][y] * Dampening;

      /* Change pixel values */
      let col = current[x][y] + Contrast;
      let index = (x - 1) * 4 + (y - 1) * 4 * Cols;
      pixels[index]     = red  (color(col));
      pixels[index + 1] = green(color(col));
      pixels[index + 2] = blue (color(col));
      pixels[index + 3] = 255;
    }
  }
  updatePixels();

  /* Swap arrays */
  let temp = previous;
  previous = current;
  current = temp;
}
