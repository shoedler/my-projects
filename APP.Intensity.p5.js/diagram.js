class Diagram {
  constructor() {
    this.padding = 5 //%
    this.color = 240;

    this.axisTags = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    this.gridRows = 365;
    this.gridCols = 100;
  }

  updateMeasurements() {
    this.blx = this.padding / 100 * wWidth;
    this.bly = wHeight - (this.padding / 100 * wHeight);
    this.brx = wWidth - (this.padding / 100 * wWidth);
    this.bry = wHeight - (this.padding / 100 * wHeight);
    this.tlx = this.padding / 100 * wWidth;
    this.tly = (wHeight / 2) + (this.padding / 100 * wHeight);
    this.trx = wWidth - (this.padding / 100 * wWidth);
    this.try = (wHeight / 2) + (this.padding / 100 * wHeight);
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
    let wCell = (this.brx - this.blx) / this.gridRows;
    let hCell = ((95 / 100 * this.bly)-(102 / 100 * this.tly)) / this.gridCols;
    for (let i = 0; i < this.gridCols; i++) {
      for (let j = 0; j < this.gridRows; j++) {
        stroke(240, 240, 240, 20);
        strokeWeight(.3);
        noFill();
        rect(this.blx + (wCell * j), (102 / 100 * this.tly) + (hCell * i), wCell, hCell);
      }
    }

    // line test
    stroke(240, 40, 40);
    strokeWeight(2);
    noFill();

    bezier()
    beginShape();
    vertex(this.blx + (wCell * 0) + (wCell / 2), (102 / 100 * this.tly) + (hCell * 100) + (hCell / 2));
    curveVertex(this.blx + (wCell * 91) + (wCell / 2), (102 / 100 * this.tly) + (hCell * 20) + (hCell / 2));
    curveVertex(this.blx + (wCell * 120) + (wCell / 2), (102 / 100 * this.tly) + (hCell * 70) + (hCell / 2));
    curveVertex(this.blx + (wCell * 182) + (wCell / 2), (102 / 100 * this.tly) + (hCell * 50) + (hCell / 2));
    vertex(this.blx + (wCell * 364) + (wCell / 2), (102 / 100 * this.tly) + (hCell * 100) + (hCell / 2));
    endShape();
  }


}
