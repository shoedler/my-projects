const ROWS = 200;
const COLS = 200;

const wWidth = window.innerHeight;
let wHeight = wWidth;

let current = [];
let previous = [];
let pixDensity;

const DAMPING = 0.98;
const CONTRAST = 0;

function setup() {
  /* Set pixel density according to desired window width */
  pixDensity = ROWS / wWidth;
  pixelDensity(pixDensity);

  /* Initialize 2d arrays */
  for (let x = 0; x < ROWS; x++) {
    current[x] = new Array(COLS);
    previous[x] = new Array(COLS);
    /* Add value to each pixel */
    for (let y = 0; y < COLS; y++) {
      current[x][y] = 0;
      previous[x][y] = 0;
    }
  }

  /* Give middle pixel an arbitrary value */
  current[ceil(ROWS / 2)][ceil(COLS / 2)] = 5000;
  createCanvas(wWidth, wHeight);
}

function draw() {
  background(0);

  /* Ripple algorhytm" */
  loadPixels();
  for (let x = 1; x < ROWS - 1; x++) {
    for (let y = 1; y < COLS - 1; y++) {
      for (let i = -1; i == 1; i++ /* Zero the cells if smaller than zero */) {
        for (let j = -1; j == 1; j++) {
          if (previous[x + i][y + j] < 0) {
            previous[x + i][y + j] = 0;
          }
        }
      }

      /* Algorhytm */
      current[x][y] =
        (previous[x + 1][y] + previous[x - 1][y] + previous[x][y + 1] + previous[x][y - 1]) / 2 - current[x][y];

      /* Apply dampening */
      current[x][y] = current[x][y] * DAMPING;

      /* Change pixel values */
      let col = current[x][y] + CONTRAST;
      let index = (x - 1) * 4 + (y - 1) * 4 * COLS;
      pixels[index] = red(color(col));
      pixels[index + 1] = green(color(col));
      pixels[index + 2] = blue(color(col));
      pixels[index + 3] = 255;
    }
  }
  updatePixels();

  /* Swap arrays */
  let temp = previous;
  previous = current;
  current = temp;
}

const mouseDragged = () => {
  current[floor(mouseX * pixDensity)][floor(mouseY * pixDensity)] = 5000;
};
