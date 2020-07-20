/* this code is very crude. sorry */

let MAX_ITERATIONS = 100;
let MB_MAX_VIEW = 2.5
let MB_MIN_VIEW = -2.5

let ViewXm = MB_MIN_VIEW;
let ViewXp = MB_MAX_VIEW;
let ViewYm = MB_MIN_VIEW;
let ViewYp = MB_MAX_VIEW;

function setup()
{
  noLoop();
  createCanvas(500, 500);
  pixelDensity(1);
}

function draw()
{
  mandelbrot(ViewXm, ViewXp, ViewYm, ViewYp);
}

function mandelbrot(x0 = MB_MIN_VIEW, x1 = MB_MAX_VIEW, y0 = MB_MIN_VIEW, y1 = MB_MAX_VIEW)
{
  loadPixels();

  /* Loop over all pixels */
  for (let x = 0; x < width; x++)
  {
    for (let y = 0; y < height; y++)
    {
      let a = map(x, 0, width, x0, x1);
      let b = map(y, 0, height, y0, y1);

      let ca = a;
      let cb = b;

      let n = 0;

      while (n < MAX_ITERATIONS)
      {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (a * a + b * b > 16) break;

        n++;
      }

      /* Map the numbers amount of iterations [n] to a color
      map(value, lBoundCurrentRange, uBoundCurrentRange, lBoundTargetRange, uBoundTargetRange) */
      let pixVal = map(n, 0, MAX_ITERATIONS, 0, 1);
      pixVal = n == MAX_ITERATIONS ? 0 : map(sqrt(pixVal), 0, 1, 0, 255);

      let pix = (x + y * width) * 4;
      
      /* Map colors according to [pixVal]. */ 
      pixels[pix + 0] = map(pixVal,  150, 255, 0, 255); /* Red */
      pixels[pix + 1] = pixVal > 170 ? map(pixVal, 170, 190, 255, 0) : map(pixVal,  70,  170, 0, 255); /* Green */
      pixels[pix + 2] = pixVal >  90 ? map(pixVal, 90, 110, 255, 0)  : map(pixVal,   0,  90, 0, 255); /* Blue */
      pixels[pix + 3] = 255;   /* Alpha */
    }
  }

  updatePixels();
}
