function setup() {
  window.S = new Sudoku();

  createCanvas(window.innerWidth, window.innerHeight);
  noLoop();
}

function draw() {
  background(53);
  S.findSolutions();
  console.log(S);
}

/*  [ ] Fix 'fill' method
    [ ] Prepare filled grid by removing number until unsolvable */

class Sudoku {
  constructor() {
    this.size = 9;
    this.cellSize = 50;

    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.initial = [];
    this.solutions = [];

    this.generate();
  }

  generate = () => {
    this.initial = [];
    for (let i = 0; i < this.size; i++) this.initial.push(new Array(this.size).fill(0));
    this.initial = this.fill(this.initial);
  };

  possible = (grid, x, y, n) => {
    for (let i = 0; i < this.size; i++) if (grid[y][i] == n) return false;
    for (let i = 0; i < this.size; i++) if (grid[i][x] == n) return false;

    let x0 = Math.floor(x / 3) * 3;
    let y0 = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (grid[y0 + i][x0 + j] == n) return false;

    return true;
  };

  findSolutions = () => {
    let grid = deepCopy(this.initial);
    this.solve(grid);
    this.show();
  };

  solve = (grid) => {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (grid[y][x] == 0) {
          this.values.forEach((v) => {
            if (this.possible(grid, x, y, v)) {
              grid[y][x] = v;
              this.solve(grid);
              grid[y][x] = 0;
            }
          });
          return;
        }
      }
    }
    this.solutions.push(deepCopy(grid));
  };

  isFilled = (grid) => {
    let filled = true;
    grid.forEach((col) => {
      col.forEach((cell) => {
        if (cell == 0) filled = false;
      });
    });
    return filled;
  };

  fill = (grid) => {
    return [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
  };

  show = () => {
    this.solutions.forEach((s, index) => {
      push();
      translate(this.cellSize, this.cellSize + index * this.size * this.cellSize + index * this.cellSize);
      textSize(this.cellSize * 0.8);
      textAlign(LEFT, TOP);

      // Draw grid
      stroke(255);
      for (let i = 0; i < 10; i++) {
        strokeWeight(1);
        if (i % 3 == 0) strokeWeight(5);
        line(i * this.cellSize, 0, i * this.cellSize, this.cellSize * 9);
        line(0, i * this.cellSize, this.cellSize * 9, i * this.cellSize);
      }

      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          noStroke();
          fill(255);

          if (this.initial[y][x] == 0) fill(100, 200, 100);

          text(s[y][x], x * this.cellSize + textSize() / 3, y * this.cellSize + textSize() / 5);
        }
      }
      pop();
    });
  };
}

const deepCopy = (ar) => {
  return JSON.parse(JSON.stringify(ar));
};

Object.defineProperty(Array.prototype, 'shuffle', {
  value: function () {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  },
});
