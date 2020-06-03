/* this code is very crude. sorry */

function setup()
{
  noLoop();
  createCanvas(500, 500);
  pixelDensity(1);
}

function draw()
{
  mandelbrot(-2.5, 2.5, -2.5, 2.5, 100);
}

function mandelbrot(x0 = MB_MIN_VIEW, x1 = MB_MAX_VIEW, y0 = MB_MIN_VIEW, y1 = MB_MAX_VIEW, iterations = MAX_ITERATIONS)
{
  loadPixels();

  /* Loop over width pixels */
  for (let x = 0; x < width; x++)
  {
    /* Loop over height pixels */
    for (let y = 0; y < height; y++)
    {
      let a = map(x, 0, width, x0, x1);
      let b = map(y, 0, height, y0, y1);

      let ca = a;
      let cb = b;

      let n = 0;

      /* Check if current values tend towards infinity */
      while (n < iterations)
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
      let pixVal = map(n, 0, iterations, 0, 1);
      pixVal = n == iterations ? 0 : map(sqrt(pixVal), 0, 1, 0, 255);

      /* Map colors according to [pixVal]. make sure the ranges overlap */
      let pix = (x + y * width) * 4;
      pixels[pix + 0] = map(pixVal, 150, 255, 0, 255);                                                /* red */
      pixels[pix + 1] = pixVal > 170 ? map(pixVal, 170, 190, 255, 0) : map(pixVal, 70, 170, 0, 255);; /* green */
      pixels[pix + 2] = pixVal > 90 ? map(pixVal, 90, 110, 255, 0) : map(pixVal, 0, 90, 0, 255);   ;  /* blue */
      pixels[pix + 3] = 255;                                                                          /* alpha */
    }
  }

  updatePixels();
}
