const lineThickness = 2;
const paddingLeft = 0.10;

class Graph {
  constructor(lines, states) {
    this.xMax = lines;
    this.yMax = states;
    this.margin = 0.1;
  }

  show() {
    stroke(255);
    strokeWeight(lineThickness);
    line(wWidth * paddingLeft, wHeight * this.margin, (wWidth * paddingLeft), wHeight - (wHeight * this.margin));
    line(wWidth * paddingLeft, wHeight - (wHeight * this.margin), wWidth - (wWidth * this.margin), wHeight - (wHeight * this.margin));
  }
}
