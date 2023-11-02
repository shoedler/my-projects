const DIMENSTIONS = 5;
const SCALE = 190;

let angle = 0.01;
let points;
let rotsLabels;

function setup() {
  frameRate(30);
  createCanvas(window.innerWidth, window.innerHeight);
  createPointsAndRotationsLabels();
}

function draw() {
  const newDimensions = 5;

  if (DIMENSTIONS !== newDimensions) {
    DIMENSTIONS = 5;
    createPointsAndRotationsLabels();
  }

  background(53, 53, 53);
  fill(0);

  const points2d = [];

  for (let i = 0; i < points.length; i++) {
    // Rotate
    let rotated = points[i];

    for (let j = 0; j < rotsLabels.length; j++) {
      rotated = math.multiply(rotationMatrix(rotsLabels[j], angle), rotated);
    }

    // Projection
    const distance = 3;
    const f = 1 / (distance - rotated[DIMENSTIONS - 1]);
    const projection = [[], []];

    for (let j = 0; j < DIMENSTIONS; j++) {
      projection[0].push(0);
      projection[1].push(0);
    }

    projection[0][0] = f;
    projection[1][1] = f;
    points2d[i] = [math.multiply(projection, rotated), f];
  }

  setPoints(points2d);

  angle += 0.03 / DIMENSTIONS;
}

const setPoints = (points2d) => {
  push();
  translate(-width / 2, -height / 2);

  // Edge
  for (let j = 0; j < points.length; j++) {
    for (let i = 0; i < points.length; i++) {
      if (i === j) continue;

      let squareSum = 0;
      for (let k = 0; k < DIMENSTIONS; k++) {
        squareSum += Math.pow(points[j][k] - points[i][k], 2);
      }

      const d = Math.sqrt(squareSum);
      stroke(233, 30, 99);
      if (d === 2)
        line(
          points2d[i][0][0] * SCALE + canvas.width / 2,
          points2d[i][0][1] * SCALE + canvas.height / 2,
          points2d[j][0][0] * SCALE + canvas.width / 2,
          points2d[j][0][1] * SCALE + canvas.height / 2
        );
    }
  }

  // Points
  for (let i = 0; i < points2d.length; i++) {
    const x = points2d[i][0][0];
    const y = points2d[i][0][1];
    const size = Math.pow(points2d[i][1] * 6, 2) - 10;

    fill(233, 30, 99);
    stroke(233, 30, 99);
    ellipse(x * SCALE + canvas.width / 2, y * SCALE + canvas.height / 2, size, size);
  }
  pop();
};

const combineUnique = (n, k) => {
  const result = [];
  const values = [];
  let perm = [];

  for (let i = 1; i <= n; i++) values[i - 1] = i;
  for (let i = 0; i < n; i++) perm[i] = i < k ? 1 : 0;

  perm.sort();

  whileloop: while (true) {
    // Yieks
    const subresult = [];
    for (let i = 0; i < n; i++) if (perm[i] === 1) subresult.push(values[i]);

    result.push(subresult);

    for (let i = n - 1; i > 0; i--) {
      if (perm[i - 1] === 1) continue;
      if (perm[i] === 1) {
        perm[i - 1] = 1;
        perm[i] = 0;
        perm = perm.slice(0, i).concat(perm.slice(i).sort());
        continue whileloop;
      }
    }
    break;
  }
  return result;
};

const pad = (n, length) => {
  let len = length - ('' + n).length;
  return (len > 0 ? new Array(++len).join('0') : '') + n;
};

const createPointsAndRotationsLabels = () => {
  // Points
  const p = Math.pow(2, DIMENSTIONS);
  points = [];

  for (let j = p - 1; j >= 0; j--) {
    const n = parseInt(j, 10).toString(2);
    const col = pad(n, DIMENSTIONS);
    const row = [];

    for (let i = 0; i < DIMENSTIONS; i++) row.push(col[i] * 2 - 1);

    points.push(row);
  }

  rotsLabels = combineUnique(DIMENSTIONS, 2);
};

const rotationMatrix = (rotIndex, a) => {
  let rotationArray = [];

  for (let row = 1; row <= DIMENSTIONS; row++) {
    let rotationArrayX = [];

    for (let col = 1; col <= DIMENSTIONS; col++) {
      if (col === rotIndex[0] && row === rotIndex[0]) rotationArrayX.push(Math.cos(a));
      else if (col === rotIndex[1] && row === rotIndex[0]) rotationArrayX.push(-Math.sin(a));
      else if (col === rotIndex[0] && row === rotIndex[1]) rotationArrayX.push(Math.sin(a));
      else if (col === rotIndex[1] && row === rotIndex[1]) rotationArrayX.push(Math.cos(a));
      else if (col === row) rotationArrayX.push(1);
      else rotationArrayX.push(0);
    }
    rotationArray.push(rotationArrayX);
  }

  return rotationArray;
};
