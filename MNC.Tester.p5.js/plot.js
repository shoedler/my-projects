const xPadding = 0.05;
const fontStyle = "consolas";
const fontColor = [255, 255, 255];
const fontSize = 10;

class Map {
  constructor(src) {
    this.s = src;
    this.nodes = [];
    this.make();
  }

  make() {
    /* generate node data */
    for (let op of this.s.bitReadOperations)     {this.nodes.push(new Node(op.inLine, 0, op));                 }
    for (let op of this.s.bitWriteOperations)    {this.nodes.push(new Node(op.inLine, 2, op));                 }
    for (let op of this.s.instructionOperations) {this.nodes.push(new Node(op.inLine, op.formatLength + 8, op))}
  }

  show() {
    /* scale nodes to fit screen */
    let xPaddingPixels = wWidth * xPadding;
    let screenDividor = (wWidth - (2 * xPaddingPixels)) / this.s.sourceLines.length;
    for (let node of this.nodes) {
      node.x = (node.x * screenDividor) + xPaddingPixels;
      node.y = wHeight / 2 - node.y;
    }

    /* draw nodes */
    loadStyle("node");
    beginShape();
    this.nodes.forEach(v => {point(v.x, v.y); });
    endShape(OPEN);

    /* draw axis */
    showAxis(1 * screenDividor + xPaddingPixels,
             wHeight / 2 + 20,
             this.s.sourceLines.length * screenDividor + xPaddingPixels,
             wHeight / 2 + 20,
             this.s.sourceLines.length);
  }
}

class Node {
  constructor(x, y, content) {
    this.x = x;
    this.y = y;
  }
}

function showAxis(x1, y1, x2, y2, maxTagValue) {
  loadStyle("axis");
  line(x1, y1, x2, y2);          /* main x axis */
  line(x1, y1 + 5, x1, y1 - 5);  /* end cap left */
  line(x2, y1 + 5, x2, y1 - 5);  /* end cap right */

  /* draw axis tags */
  let tagAmount = 10;
  let tagPosIncrement = (x2 - x1) / tagAmount;
  let tagValueIncrement = ceil(maxTagValue / tagAmount);
  loadStyle("font");
  for (let i = 0; i <= tagAmount; i++) {
    text(tagValueIncrement * i,x1 + (i * tagPosIncrement), y1 + 8);
  }
}

function loadStyle(str) {
  switch (str) {
    case "font":
      textAlign(CENTER, TOP);
      textFont(fontStyle);
      textSize(fontSize);
      noStroke();
      fill(fontColor);
      break;

    case "font-modal":
      textAlign(LEFT, CENTER);
      textFont(fontStyle);
      textSize(fontSize);
      noStroke();
      fill(fontColor);
      break;

    case "node":
      strokeWeight(1);
      noFill();
      stroke(random(100, 255), random(100, 255), random(100,255));
      break;

    case "axis":
      strokeWeight(1);
      stroke(255);
      break;

    default:
  }
}
