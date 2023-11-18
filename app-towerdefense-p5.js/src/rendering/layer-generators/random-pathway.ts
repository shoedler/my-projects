import { Layer } from '../layer';

/* 

Propmt to ChatGPT3.5:
---------------------
I have a 2d pixel frame. 
I want to create a random pathway from the left side to the right side.

Write a TypeScript function "createRandomPathway" which takes the following argument:

- "complexity", number 0-1, where 1 is pretty much a straight line and 1 is a very complex pathway. 
- "layer", Layer class instance which has "width" and "height" properties and a "getTile(x,y)" as well as a "setTile(x,y,r,g,b,a)" function. A "Tile" has r,g,b,a properties, ranging from 0-255. The "layer" object is already initialized with an empty array of the correct size, meaning "getTile(0,0)" initially returns undefined, but you can set it without any problems.

The function should create a random pathway of a nice light dirt color from left to right in the "layer" object. Rules:
- The pathway must not cross itself.
- The pathway must not go out of bounds.
- The pathway must not be too close to the top or bottom edge.
- The pathway can go to the left aswell, so you might need backtracking (bfs maybe?)
- A valid next tile can only have at most 1 neighbor (diagonals don't count). Meaning when the pathway is done, each tile but the first and last has exactly 2 neighbors.

Constraints:
- Instead of using a 2D array to store visited tiles, use an object, and use `${x},${y}` as the key and a boolean as the value. Then you can lookup if a tile has been visited with `visited[`${x},${y}`]`.

Prefer "const x = y => z" over "function x(y) { return z; }" syntax.
The function should be exported.

*/

export const createRandomPathway = (complexity: number, layer: Layer) => {
  const { width, height } = layer;

  const visitedMap: { [key: string]: boolean } = {};
  const stack: [number, number][] = [];
  const dirs = [
    [1, 0], // Directly to the right
    [0, 1], // Down
    [0, -1], // Up
    [-1, 0], // Left
  ];

  const start = [0, Math.floor(height / 2)]; // Start from the middle row

  let currentX = start[0];
  let currentY = start[1];

  const visit = (x: number, y: number) => (visitedMap[`${x},${y}`] = true);
  const unvisit = (x: number, y: number) => (visitedMap[`${x},${y}`] = false);
  const visited = (x: number, y: number) => visitedMap[`${x},${y}`];

  const outOfBounds = (x: number, y: number) => x < 0 || x >= width || y < 0 || y >= height;
  const closeToBounds = (x: number, y: number, dist: number) =>
    x < dist || x >= width - dist || y < dist || y >= height - dist;

  const getDiagonalNeighbors = (x: number, y: number) => {
    return [
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x + 1, y + 1],
    ].filter(([x, y]) => visited(x, y));
  };

  const getNeighbors = (x: number, y: number) => {
    return [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ].filter(([x, y]) => visited(x, y));
  };

  const validMove = (x: number, y: number) => {
    if (visited(x, y) || outOfBounds(x, y)) {
      return false;
    }

    return getNeighbors(x, y).length <= 1;
  };

  while (currentX < width - 1) {
    if (!visited(currentX, currentY)) {
      visit(currentX, currentY);
    }

    let validMoves: [number, number][] = [];

    // Check all four possible directions
    for (const [dx, dy] of dirs) {
      const nextX = currentX + dx;
      const nextY = currentY + dy;

      if (validMove(nextX, nextY)) {
        validMoves.push([dx, dy]);
      }
    }

    // No valid moves, backtrack
    if (validMoves.length === 0) {
      // If the stack is empty, we can't backtrack anymore
      if (stack.length === 0) {
        break;
      }

      [currentX, currentY] = stack.pop()!;
      continue;
    }

    let dx, dy;

    if (Math.random() <= complexity) {
      // Introduce randomness in choosing the next move
      const randomIndex = Math.floor(Math.random() * validMoves.length);
      [dx, dy] = validMoves[randomIndex];

      stack.push([currentX, currentY]);
    } else {
      // Prefer the most direct route
      [dx, dy] = validMoves[0];
    }

    currentX += dx;
    currentY += dy;
  }

  // Print the visited map
  let furthestRightTile: [number, number] = [0, 0];
  let possibleDeadEnds: [number, number][] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (visited(x, y)) {
        // Color the pathway
        layer.setTile(x, y, 200, 180, 150, 255);

        // Keep track of the rightmost tile
        if (x > furthestRightTile[0]) {
          furthestRightTile = [x, y];
        }

        // Keep track of possible dead ends
        if (getNeighbors(x, y).length === 1) {
          possibleDeadEnds.push([x, y]);
        }
      }
    }
  }

  // Set the rightmost tile to be the end of the pathway
  const [endX, endY] = furthestRightTile;
  layer.setTile(endX + 1, endY, 200, 180, 150, 255);
  visit(endX + 1, endY);

  // Get actual dead ends
  const deadEnds = possibleDeadEnds.filter(([x, y]) =>
    [start, furthestRightTile].every(([x2, y2]) => x !== x2 || y !== y2)
  );

  // Remove dead ends
  for (let [x, y] of deadEnds) {
    while (getNeighbors(x, y).length === 1) {
      const neighbors = getNeighbors(x, y);

      layer.removeTile(x, y);
      unvisit(x, y);

      [x, y] = neighbors[0];
    }
  }
};
