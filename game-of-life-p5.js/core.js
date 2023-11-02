const SIZE = 5;
const NEIGHBORS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const GLIDER_BLUEPRINT = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 1],
];

let widthAmount, heightAmount;

let xMax, xMin, yMax, yMin;
let pxMax, pxMin, pyMax, pyMin;

let grid = [],
  next = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  widthAmount = Math.floor(width / SIZE);
  heightAmount = Math.floor(height / SIZE);

  grid = new Array(widthAmount, heightAmount).dim();

  // Initialize grid with the famous 'glider' - or 'ant' as John Conway regretably didn't name it.
  shapeInsert(widthAmount - 5, 5, GLIDER_BLUEPRINT);
  shapeInsert(widthAmount - 8, 10, GLIDER_BLUEPRINT);

  // Initialize Render area
  xMax = widthAmount - 2;
  xMin = 1;
  yMax = heightAmount - 2;
  yMin = 1;
}

function draw() {
  background(53);

  next = new Array(widthAmount, heightAmount).dim();

  // Update previous Render area
  let pxMax = (xMax + 1 + widthAmount) % widthAmount;
  let pxMin = (xMin + -1 + widthAmount) % widthAmount;
  let pyMax = (yMax + 1 + heightAmount) % heightAmount;
  let pyMin = (yMin + -1 + heightAmount) % heightAmount;

  // Render area boundary overflow simpy uses the whole window range
  if (pxMax < pxMin) {
    pxMin = 0;
    pxMax = widthAmount - 1;
  }

  if (pyMax < pyMin) {
    pyMin = 0;
    pyMax = heightAmount;
  }

  // Reset current Render area
  xMax = 0;
  xMin = widthAmount;
  yMax = 0;
  yMin = heightAmount;

  stroke(53);
  strokeWeight(1);

  // Render all Cells in previous Render area
  for (let x = pxMin; x <= pxMax; x++) {
    for (let y = pyMin; y <= pyMax; y++) {
      let c = grid[x][y] ? color(255, 255, 255, 255) : color(0, 0, 0, 0);

      fill(c);
      rect(x * SIZE, y * SIZE, SIZE, SIZE);

      // Check Neighbours
      let aliveNeighbors = 0;

      NEIGHBORS.forEach((n) => {
        aliveNeighbors += grid[(x + n[0] + widthAmount) % widthAmount][(y + n[1] + heightAmount) % heightAmount];
      });

      // Game of Life Rules
      next[x][y] = aliveNeighbors == 3 ? 1 : grid[x][y]; // Birth or as it was
      next[x][y] = aliveNeighbors < 2 || aliveNeighbors > 3 ? 0 : next[x][y]; // Death of Overcrowding or of Isolation

      // Update next Render-area
      if (next[x][y]) {
        xMax = x > xMax ? x : xMax;
        xMin = x < xMin ? x : xMin;
        yMax = y > yMax ? y : yMax;
        yMin = y < yMin ? y : yMin;
      }
    }
  }

  // Draw Render-area
  noFill();
  stroke(255, 255, 0, 40);
  strokeWeight(1);
  rect(pxMin * SIZE, pyMin * SIZE, (pxMax - pxMin) * SIZE, (pyMax - pyMin) * SIZE);

  grid = next;
}

const shapeInsert = (x, y, shape) => {
  shape.forEach((cell) => {
    grid[x + cell[0]][y + cell[1]] = 1;
  });
};

Array.prototype.dim = function () {
  if (this.length == 2) {
    r = this.shift();
    c = this.shift();
    while (r--) this.push(new Array(c).fill(0, 0));
    return this;
  }
};
