/* this code is very crude. sorry */

let MAX_ITERATIONS = 100;
let MB_MAX_VIEW = 2.5
let MB_MIN_VIEW = -2.5

let ZOOM_RANGE = 0.3

let ViewXm = MB_MIN_VIEW;
let ViewXp = MB_MAX_VIEW;
let ViewYm = MB_MIN_VIEW;
let ViewYp = MB_MAX_VIEW;




function setup()
{
  noLoop();
  createCanvas(500, 500);
  pixelDensity(1);

  ViewXm = MB_MIN_VIEW;
  ViewXp = MB_MAX_VIEW;
  ViewYm = MB_MIN_VIEW;
  ViewYp = MB_MAX_VIEW;
}




function draw()
{
  mandelbrot(ViewXm, ViewXp, ViewYm, ViewYp);
}




function mouseClicked()
{
  zoomIn(ZOOM_RANGE);
  mandelbrot(ViewXm, ViewXp, ViewYm, ViewYp);
}




function keyPressed()
{
  let zoomStep = (abs(ViewXm) + abs(ViewXp)) * 0.05;
  let zoomLevel = (abs(ViewXm) + abs(ViewXp)) * 0.1;

  switch (keyCode)
  {
    case ESCAPE:
      zoomOut();
      break;

    case LEFT_ARROW:
      zoomMove(-1 * zoomStep, 0);
      break;

    case RIGHT_ARROW:
      zoomMove(zoomStep, 0);
      break;

    case UP_ARROW:
      zoomMove(0, -1 * zoomStep);
      break;

    case DOWN_ARROW:
      zoomMove(0, zoomStep);
      break;

    case ENTER:
      zoomAdjust(zoomLevel, zoomLevel);
      break;

    case SHIFT:
      zoomAdjust(-1 * zoomLevel, -1 * zoomLevel);
      break;

    default:

  }
}




function zoomAdjust(x, y)
{
  ViewXm += x
  ViewXp -= x
  ViewYm += y
  ViewYp -= y

  mandelbrot(ViewXm, ViewXp, ViewYm, ViewYp);
}




function zoomMove(x, y)
{
  ViewXm += x
  ViewXp += x
  ViewYm += y
  ViewYp += y

  mandelbrot(ViewXm, ViewXp, ViewYm, ViewYp);
}





function zoomIn(zoomRange = ZOOM_RANGE)
{
  let zx = map(mouseX, 0, width, MB_MIN_VIEW, MB_MAX_VIEW);
  let zy = map(mouseY, 0, height, MB_MIN_VIEW, MB_MAX_VIEW);

  ViewXm = zx - zoomRange
  ViewXp = zx + zoomRange
  ViewYm = zy - zoomRange
  ViewYp = zy + zoomRange

  mandelbrot(ViewXm, ViewXp, ViewYm, ViewYp);
}





function zoomOut()
{
  ViewXm = MB_MIN_VIEW;
  ViewXp = MB_MAX_VIEW;
  ViewYm = MB_MIN_VIEW;
  ViewYp = MB_MAX_VIEW;

  mandelbrot(ViewXm, ViewXp, ViewYm, ViewYp);
}





function mandelbrot(x0 = MB_MIN_VIEW, x1 = MB_MAX_VIEW, y0 = MB_MIN_VIEW, y1 = MB_MAX_VIEW)
{
  loadPixels();

  /* loop over width pixels */
  for (let x = 0; x < width; x++)
  {
    /* loop over height pixels */
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
        if (a * a + b * b > 16)
        {
          break;
        }
        n++;
      }

      /* map the numbers amount of iterations [n] to a color
      map(value, lBoundCurrentRange, uBoundCurrentRange, lBoundTargetRange, uBoundTargetRange) */
      let pixVal = map(n, 0, MAX_ITERATIONS, 0, 1);
      pixVal = map(sqrt(pixVal), 0, 1, 0, 255);

      if (n == MAX_ITERATIONS)
      {
        pixVal = 0;
      }

      /* map colors according to [pixVal]. make sure the
      ranges overlap */
      /* 0-90 | 70-170 | 150-255 */
      let red   = map(pixVal,  150, 255, 0, 255);
      let green = map(pixVal,  70,  170, 0, 255);
      if (pixVal > 170)
      {
        green = map(pixVal, 170, 190, 255, 0)
      }
      let blue  = map(pixVal,   0,  90, 0, 255);
      if (pixVal > 90)
      {
        blue = map(pixVal, 90, 110, 255, 0)
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = red;   /* red */
      pixels[pix + 1] = green; /* green */
      pixels[pix + 2] = blue;  /* blue */
      pixels[pix + 3] = 255;   /* alpha */
    }
  }

  updatePixels();
}
