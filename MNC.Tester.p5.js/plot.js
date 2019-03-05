const xPadding = 0.05;

class Map {
  constructor(src) {
    this.s = src;
    this.nodes = [];
    this.make();
  }

  make() {
    /* generate all nodes */
    for (let op of this.s.bitReadOperations) {
      this.nodes.push(new Node(op.inLine, 0, op));
    }
    for (let op of this.s.bitWriteOperations) {
      this.nodes.push(new Node(op.inLine, 1, op));
    }
    for (let op of this.s.instructionOperations) {
      this.nodes.push(new Node(op.inLine, op.formatLength + 8, op))
    }

    /* scale nodes to fit screen */
    let xPaddingPixels = wWidth * xPadding;
    let screenDividor = (wWidth - (2 * xPaddingPixels)) / this.s.sourceLines.length;
    for (let node of this.nodes) {
      node.x = (node.x * screenDividor) + xPaddingPixels;
      node.y = wHeight / 2 - node.y;
    }

  }

  show() {
    strokeWeight(3);
    noFill();
    stroke(random(100, 255), random(100, 255), random(100,255));
    beginShape();
    this.nodes.forEach(v => {
      vertex(v.x, v.y);
    });
    endShape(OPEN);
  }

}

class Node {
  constructor(x, y, content) {
    this.x = x;
    this.y = y;
    this.content = content;
  }
}
