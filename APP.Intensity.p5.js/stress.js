class Diagram {
  constructor(x, y) {
    this.height = wHeight - (2*y);
    this.width = wWidth - (2*x);
    this.data_x = x;
    this.data_y = y;
    this.data_rows = 365;
    this.data_cols = 100;

    this.row_tags = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    this.col_tags = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

    this.lines = [];

    this.cell_width = this.width / this.data_rows;
    this.cell_height = this.height / this.data_cols;

  }

  addLine(name, r, g, b) {
    this.lines.push(new Line(name, r, g, b));
  }

  addLinePoints(name, x, y) {
    for (let line of this.lines) {
      if (line.name == name) {
        line.addPoints(x * this.cell_width, this.height - (y * this.cell_height));
      }
    }
  }

  showGrid() {
    translate(this.data_x, this.data_y);

    noFill();
    stroke(255, 255, 255, 15);
    strokeWeight(0.5);
    for (let i = 0; i < this.data_rows; i++) {
      for (let j = 0; j < this.data_cols; j++) {
        rect(this.cell_width * i, this.cell_height * j, this.cell_width, this.cell_height);
      }
    }
  }

  showTags() {
    textAlign(CENTER, TOP);
    fill(255);
    noStroke();
    let div = this.width / this.row_tags.length;
    for (let i = 0; i < this.row_tags.length; i++) {
      text(this.row_tags[i], i * div + (div / 2), this.height + this.cell_height);
    }
    textAlign(RIGHT, TOP);
    div = this.height / this.col_tags.length;
    for (let j = 0; j < this.col_tags.length; j++) {
      text(this.col_tags[this.col_tags.length - 1 - j], 0 - this.cell_width, j * div);
    }

  }

  showLines() {
    for(let line of this.lines) {
      noFill();
      stroke(line.color);
      strokeWeight(1);

      // draw lines
      // draw first an last vertex twice, otherwise the line won't work
      beginShape();
      curveVertex(line.points_x[0], line.points_y[0]);
      curveVertex(line.points_x[0], line.points_y[0]);
      for (let i = 1; i < line.points_x.length -1; i++) {
        curveVertex(line.points_x[i], line.points_y[i]);
      }
      let lastPoint = line.points_x.length -1
      curveVertex(line.points_x[lastPoint], line.points_y[lastPoint]);
      curveVertex(line.points_x[lastPoint], line.points_y[lastPoint]);
      endShape();

      // draw reference points
      strokeWeight(this.cell_width * 0.5);
      for (let i = 0; i < line.points_x.length; i++) {
        point(line.points_x[i], line.points_y[i]);
      }
    }
  }

  showLegend() {
    textAlign(LEFT, TOP);
    noStroke();
    for (let i = 0; i < this.lines.length; i++) {
      fill(this.lines[i].color);
      text(this.lines[i].name, this.width * 0.9, (2 * this.cell_height * i) + this.cell_height);
    }
  }
}


class Line {
  constructor(name, r, g, b) {
    this.name = name
    this.color = color(r, g, b);
    this.points_x = [];
    this.points_y = [];
  }

  addPoints(x, y) {
    this.points_x.push(x);
    this.points_y.push(y);
  }
}
