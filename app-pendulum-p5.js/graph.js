class Graph {
  constructor(sim) {
    this.sim = sim;

    this.backdropColor = 220;
    this.gridColor = 180;
    this.fontColor = 53;

    this.verticalGrid = []; /* This is the scrolling array */

    /* Initialize positions for vertical Grid lines */
    let accumulator = 0;
    let s = '';
    while (accumulator > -width / 2 - this.timeSpacing) {
      accumulator -= this.timeSpacing;
    }
    while (accumulator < width / 2 + this.timeSpacing) {
      if (accumulator > 0) s++;
      if (accumulator == 0) s = 0;
      this.verticalGrid.push({ s: s, x: accumulator });
      accumulator += this.timeSpacing;
    }
  }

  get timeSpacing() {
    return this.sim.graphScrollSpeed * this.sim.frameRate;
  }
  get verticalSpacing() {
    return map(PI / this.sim.graphDivisions, 0, PI, height / 2, height) - height / 2;
  }

  draw = () => {
    push();

    this.drawBackdrop();
    this.drawHorizontalGridLines();
    this.drawVerticalGridLines();

    pop();

    this.drawGraphs();
  };

  drawBackdrop = () => {
    /* Draw Backdrop */
    fill(this.backdropColor);
    noStroke();
    rect(0, height / 2, width, height);
  };

  drawHorizontalGridLines = () => {
    let div = this.sim.graphDivisions;

    /* Generate Labels */
    let labels = [];

    for (let i = div / 2; i > 0; i--) {
      let pM = i;
      let pD = div / 2;

      if (pD == pM) {
        pD = '';
        pM = '';
      } else if (pD % 2 == 0 && pM % 2 == 0) {
        while (Number.isInteger(pD / 2) && Number.isInteger(pM / 2)) {
          pD /= 2;
          pM /= 2;
        }
      } else if (Number.isInteger(pD / pM) && pM > 1) {
        pD = pD / pM;
        pM = 1; /* Gonna get erased in the next line. Just for logic's sake */
      }

      pM = pM == 1 ? '' : pM;
      pD = pD == '' ? '' : `/${pD}`;

      labels.push(`${pM}π${pD}`);
    }

    /* Assemble labels */
    labels = [...labels, '0', ...labels.reverse().map((l) => `-${l}`)];

    /* Draw horizontal guides and labels  */
    for (let i = 0; i <= div; i++) {
      strokeWeight(0.5);
      stroke(this.gridColor);
      textAlign(LEFT, TOP);
      textFont('consolas');

      let yOffset = map((i * TWO_PI) / div, 0, TWO_PI, height / 2, height);

      let textOffset = textSize() / 2;

      if (i == div / 2) {
        strokeWeight(1);
        textAlign(LEFT, CENTER);
        textOffset = 0;
      }

      if (i > div / 2) {
        textAlign(LEFT, BOTTOM);
        textOffset *= -1;
      }

      if (i != 0 && i != div) line(0, yOffset, width, yOffset);

      noStroke();
      fill(this.fontColor);

      let label = labels[i];
      label += this.sim.graphLabelSine ? `| sin(a) = ${nfc(sin((i * TWO_PI) / div), 2)} ` : '';
      label += this.sim.graphLabelAngle ? `| ${nfc((((i * TWO_PI) / div) * 180) / PI, 1)}°` : '';

      text(label, 5, yOffset + textOffset);
    }
  };

  drawVerticalGridLines = () => {
    const scrSpeed = this.sim.graphScrollSpeed;

    push();

    translate(graphOrigin);

    strokeWeight(0.5);
    stroke(this.gridColor);

    /* Add scroll offset to vertical Guides, splice on Window overlap */
    for (let i = this.verticalGrid.length - 1; i >= 0; i--) {
      this.verticalGrid[i].x -= scrSpeed;
      if (this.verticalGrid[i] < 0) {
        this.verticalGrid.splice(0, i);
        break;
      }
    }

    /* Add new vertical guide */
    if (this.verticalGrid[this.verticalGrid.length - 1].x < width) {
      this.verticalGrid.push({
        s: this.verticalGrid[this.verticalGrid.length - 1].s + 1,
        x: this.verticalGrid[this.verticalGrid.length - 1].x + this.timeSpacing,
      });
    }

    /* Draw vertical grid guides */
    this.verticalGrid.forEach((l) => {
      text(l.s, l.x, 0);
      line(l.x, -height * 0.25, l.x, height * 0.25);
    });

    pop();
  };

  drawGraphs = () => {
    const scrSpeed = this.sim.graphScrollSpeed;

    this.sim.pendulumPopulation.forEach((p) => {
      /* Add scroll offset to Points, splice when out of bounds (window) */
      for (let i = p.points.length - 1; i >= 0; i--) {
        p.points[i].x -= scrSpeed;

        if (abs(p.points[i].x) > width / 2.01) {
          p.points.splice(0, i);
          break;
        }
      }

      push();

      translate(graphOrigin);
      stroke(p.c);
      noFill();

      /* The Graph needs an offset of HALF_PI. We also add the
            current scale (Unit circle) angle. This allows changes in the scale to
            apply on the graphs */
      let current = p.a - HALF_PI + this.sim.scaleAngle;

      /* Add new (Current) Value as a point */
      if (frameCount % this.sim.graphCaptureRate == 0) p.points.push({ x: 0, y: current });

      /* Draw graph (Draw each point as a vertex) */
      strokeWeight(1);
      beginShape();

      let halfGraph = height - height * 0.75;

      for (let i = 0; i < p.points.length; i++) {
        let v = p.points[i];

        /* Add Vertex, map y value to the graph size */
        if (this.sim.graphSmoothing) {
          curveVertex(v.x, map(v.y, -PI, PI, -halfGraph, halfGraph));
        } else {
          vertex(v.x, map(v.y, -PI, PI, -halfGraph, halfGraph));
        }
      }

      endShape();

      pop();
    });
  };
}
