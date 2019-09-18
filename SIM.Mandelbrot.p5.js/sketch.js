let minval = -0.5;
let maxval = 0.5;

let minSlider;
let maxSlider;

let frDiv;

function setup()
{
  createCanvas(window.innerWidth, window.innerHeight);
  pixelDensity(1);

  minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 2.5, 2.5, 0.01);

  frDiv = createDiv('');
}

function draw()
{
  let MAX_ITERATIONS = 100;

  loadPixels();
  for (let x = 0; x < width; x++)
  {
    for (let y = 0; y < height; y++)
    {

      let a = map(x, 0, width, minSlider.value(), maxSlider.value());
      let b = map(y, 0, height, minSlider.value(), maxSlider.value());

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

      let bright = map(n, 0, MAX_ITERATIONS, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == MAX_ITERATIONS)
      {
        bright = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  frDiv.html(floor(frameRate()));
}
