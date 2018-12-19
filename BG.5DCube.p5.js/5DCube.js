/* 5DCube
Simon Schödler
Source by David faive-macon & daniel shiffman
19.12.2018
*/

let dimensions;
const scale = 190;
const pgHeightDiv = 3; // 3 = a third
let angle = 0.01;
let thePoints, rotsLabels;

// the coordinates of the points
const createPointsAndRotationsLabels = function() {

  // points
  const p = Math.pow(2, dimensions);
  thePoints = [];
  for(let j = p - 1; j >= 0; j--) {
    const n = parseInt(j, 10).toString(2);
    const col = (pad(n, dimensions));
    const row = [];
    for(let i = 0; i < dimensions; i++) {
      row.push(col[i] * 2 - 1);
    }
    thePoints.push(row);
  }
  rotsLabels = combineUnique(dimensions, 2);
};

const rotationMatrix = function(rotIndex, a) {
  let rotationArray = [];
  for(let row = 1; row <= dimensions; row++) {
    let rotationArrayX = [];
    for(let col = 1; col <= dimensions; col++) {
      if(col === rotIndex[0] && row === rotIndex[0]) rotationArrayX.push(Math.cos(a));
      else if(col === rotIndex[1] && row === rotIndex[0]) rotationArrayX.push(-Math.sin(a));
      else if(col === rotIndex[0] && row === rotIndex[1]) rotationArrayX.push(Math.sin(a));
      else if(col === rotIndex[1] && row === rotIndex[1]) rotationArrayX.push(Math.cos(a));
      else if(col === row) rotationArrayX.push(1);
      else rotationArrayX.push(0);
    }
    rotationArray.push(rotationArrayX);
  }
  return rotationArray;
};


// Main function
const sketch = function(p) {
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight / pgHeightDiv);
    dimensions = 5;
    createPointsAndRotationsLabels();
  };

  // Update canvas size in case the user resizes his browser window
  window.addEventListener('resize', function(event){
    p.resizeCanvas(window.innerWidth, window.innerHeight / pgHeightDiv);
  });

  p.draw = function() {
    const newDimensions = 5;
    if(dimensions !== newDimensions) {
      dimensions = 5;
      createPointsAndRotationsLabels();
    }

    p.background(53,53,53);
    p.fill(0);

    const points2d = [];
    for(let i = 0; i < thePoints.length; i++) {
      //rotate
      let rotated = thePoints[i];
      for(let j = 0; j < rotsLabels.length; j++) {
        rotated = math.multiply(rotationMatrix(rotsLabels[j], angle), rotated);
      }

      //projection
      const distance = 3;
      const f = 1 / (distance - rotated[dimensions - 1]);
      const projection = [[], []];
      for(let j = 0; j < dimensions; j++) {
        projection[0].push(0);
        projection[1].push(0);
      }
      projection[0][0] = f;
      projection[1][1] = f;
      points2d[i] = [math.multiply(projection, rotated), f];
    }

    psets(points2d);
    angle += 0.03 / dimensions;
  };

  function psets(points2d) {
    // edge
    for(let j = 0; j < thePoints.length; j++) {
      for(let i = 0; i < thePoints.length; i++) {
        if(i === j) continue;
        let squareSum = 0;
        for(let k = 0; k < dimensions; k++) {
          squareSum += Math.pow(thePoints[j][k] - thePoints[i][k], 2);
        }
        const d = Math.sqrt(squareSum);
        if(d === 2) p.line(points2d[i][0][0] * scale + p.canvas.width / 2, points2d[i][0][1] * scale + p.canvas.height / 2, points2d[j][0][0] * scale + p.canvas.width / 2, points2d[j][0][1] * scale + p.canvas.height / 2);
      }
    }

    // points
    for(let i = 0; i < points2d.length; i++) {
      const x = points2d[i][0][0];
      const y = points2d[i][0][1];
      const size = Math.pow((points2d[i][1])*6,2) - 10;
      p.fill(233, 30, 99);
      p.stroke(233, 30, 99);
      p.ellipse(x * scale + p.canvas.width / 2, y * scale + p.canvas.height / 2, size, size);
    }
  }
};

new p5(sketch, 'anim_5dcube');

function combineUnique(n, k) {
  const result = [];
  const values = [];
  for(let i = 1; i <= n; i++) {
    values[i - 1] = i;
  }
  let perm = [];
  for(let i = 0; i < n; i++) {
    if(i < k) perm[i] = 1;
    else perm[i] = 0;
  }
  perm.sort();

  whileloop: while(true) {
    const subresult = [];
    for(let i = 0; i < n; i++) {
      if(perm[i] === 1) subresult.push(values[i]);
    }
    result.push(subresult);
    for(let i = n - 1; i > 0; i--) {
      if(perm[i - 1] === 1) continue;
      if(perm[i] === 1) {
        perm[i - 1] = 1;
        perm[i] = 0;
        perm = perm.slice(0, i).concat(perm.slice(i).sort());
        continue whileloop;
      }
    }
    break;
  }
  return result;
}

// pad(1, 6) // '000001'
function pad(n, length) {
  let len = length - ('' + n).length;
  return (len > 0 ? new Array(++len).join('0') : '') + n
}
