class Diagram {
  constructor() {
    this.padding = 5 //%
    this.color = 240;

    this.axisTags = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    this.gridRows = 365;
    this.gridCols = 100;

    this.lines = [];

    this.blx = this.padding / 100 * wWidth;
    this.bly = wHeight - (this.padding / 100 * wHeight);
    this.brx = wWidth - (this.padding / 100 * wWidth);
    this.bry = wHeight - (this.padding / 100 * wHeight);
    this.tlx = this.padding / 100 * wWidth;
    this.tly = (wHeight / 2) + (this.padding / 100 * wHeight);
    this.trx = wWidth - (this.padding / 100 * wWidth);
    this.try = (wHeight / 2) + (this.padding / 100 * wHeight);

    this.wCell = (this.brx - this.blx) / this.gridRows;
    this.hCell = ((95 / 100 * this.bly)-(102 / 100 * this.tly)) / this.gridCols;
  }


  show() {
    stroke(this.color);
    strokeWeight(1);
    noFill();

    // border
    beginShape();
      vertex(this.tlx, this.tly);
      vertex(this.trx, this.try);
      vertex(this.brx, this.bry);
      vertex(this.blx, this.bly);
      vertex(this.tlx, this.tly);
    endShape();

    // axis tags
    textAlign(CENTER, CENTER);
    noStroke();
    fill(this.color);
    let div = (this.brx - this.blx) / this.axisTags.length;
    for (let i = 0; i < this.axisTags.length; i++) {
        text(this.axisTags[i], (this.blx + (div / 2) + (i * div)), (98 / 100 * this.bly));
    }

    // grid
    for (let i = 0; i < this.gridCols; i++) {
      for (let j = 0; j < this.gridRows; j++) {
        stroke(240, 240, 240, 20);
        strokeWeight(.3);
        noFill();
        rect(this.blx + (this.wCell * j), (102 / 100 * this.tly) + (this.hCell * i), this.wCell, this.hCell);
      }
    }
  }

  addLine(name, r, g, b) {
    this.lines.push(new StressLine(name, this.blx, (102 / 100 * this.tly), r, g, b));
    console.log("New StressLine Object created: " + "'" + name + "' " + "at index " + this.lines.length);
    return this.lines.length - 1;
  }
  addCoordinates(arrIndex, x, y) {
    let tempX = this.wCell * x;
    let tempY = (this.gridCols * this.hCell) - (this.hCell * y); // inverse, to draw from grid's bottom left
    this.lines[arrIndex].vertX.push(tempX);
    this.lines[arrIndex].vertY.push(tempY);
  }
  showLine(arrIndex) {
    stroke(this.lines[arrIndex].r, this.lines[arrIndex].g, this.lines[arrIndex].b);
    strokeWeight(2);
    noFill();
    translate(this.lines[arrIndex].zeroX, this.lines[arrIndex].zeroY);

    beginShape();
    // draw first vertex twice
    curveVertex(this.lines[arrIndex].vertX[0], this.lines[arrIndex].vertY[0]);
    curveVertex(this.lines[arrIndex].vertX[0], this.lines[arrIndex].vertY[0]);
    for (let i = 1; i < this.lines[arrIndex].vertX.length - 1; i++) {
      curveVertex(this.lines[arrIndex].vertX[i], this.lines[arrIndex].vertY[i]);
    }
    // draw last vertex twice
    let lastX = this.lines[arrIndex].vertX.length - 1;
    let lastY = this.lines[arrIndex].vertY.length - 1;
    curveVertex(this.lines[arrIndex].vertX[lastX], this.lines[arrIndex].vertY[lastY]);
    curveVertex(this.lines[arrIndex].vertX[lastX], this.lines[arrIndex].vertY[lastY]);
    endShape();
  }
}

class StressLine {
  constructor(name, zeroX, zeroY, r, g, b) {
    this.name = name;
    this.zeroX = zeroX;
    this.zeroY = zeroY;
    this.r = r;
    this.g = g;
    this.b = b;
    this.vertX = [];
    this.vertY = [];
  }
}
