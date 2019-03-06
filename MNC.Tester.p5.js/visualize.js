const lineThickness = 2;
const paddingLeft = 0.10;
const paddingTop = 0.35;
const yLegendOffset = 1.1;
const xLegendOffset = 0.9;
const legendIncrement = 30;


class Graph {
  constructor(lines, states) {
    this.xMax = lines;
    this.yMax = states;
    this.margin = 0.1;
  }

  show() {
    let xLineBegin = wWidth  * paddingLeft
    let xLineEnd = wWidth  - (wWidth * this.margin);
    let yLineBegin = wHeight * paddingTop;
    let yLineEnd = yLineBegin;

    /* horizontal line */
    stroke(255);
    strokeWeight(lineThickness);
    line(xLineBegin, yLineBegin, xLineEnd, yLineEnd);

    /* draw legend */
    textAlign(RIGHT, TOP);
    noStroke();
    textSize(12);
    textFont("consolas");
    fill(255);
    text("STEP", xLineBegin * xLegendOffset, yLineBegin * yLegendOffset);
    let tagStep = ceil(this.xMax / legendIncrement);
    let visualStep = (xLineEnd - xLineBegin) / legendIncrement;
    textSize(10);
    for (let i = 0; i <= legendIncrement; i++) {
      text((tagStep * i), xLineBegin + (visualStep * i), yLineBegin * yLegendOffset);
    }
  }

}
