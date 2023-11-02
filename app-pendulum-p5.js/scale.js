class Scale {
  constructor(sim) {
    this.sim = sim;
  }

  draw = () => {
    if (this.sim.scaleShow) this.drawUnitCircle();
    if (this.sim.scaleDrawSine) this.drawSine();
    if (this.sim.scaleDrawCosine) this.drawCosine();
  };

  drawUnitCircle = () => {
    let scaleAngle = this.sim.scaleAngle;

    push();

    let c = 200;

    translate(pendulumOrigin);
    stroke(c);
    strokeWeight(0.5);
    noFill();
    ellipse(
      0,
      0,
      this.sim.pendulumMaxLenght * 2 + this.sim.pendulumBallSize,
      this.sim.pendulumMaxLenght * 2 + this.sim.pendulumBallSize
    );

    let limbLength = this.sim.pendulumMaxLenght + this.sim.pendulumBallSize;
    let angle = scaleAngle;

    for (let i = 0; i < 4; i++) {
      line(0, 0, cos(angle) * limbLength, sin(angle) * limbLength);
      angle += HALF_PI;
    }

    fill(c);
    noStroke();
    textFont('consolas');
    textSize(15);
    let labels = ['0, 2ₖπ', 'π/2', 'π', '3π/2'];

    labels.forEach((l, i) => {
      let x = cos(scaleAngle + i * -HALF_PI) * limbLength;
      let y = sin(scaleAngle + i * -HALF_PI) * limbLength;

      let horizAlign = CENTER;
      horizAlign = x > limbLength / 2 ? LEFT : horizAlign;
      horizAlign = x < -limbLength / 2 ? RIGHT : horizAlign;

      let vertAlign = CENTER;
      vertAlign = y > limbLength / 2 ? TOP : vertAlign;
      vertAlign = y < -limbLength / 2 ? BOTTOM : vertAlign;

      textAlign(horizAlign, vertAlign);
      text(l, x, y);
    });

    pop();
  };

  drawSine = () => {
    push();

    translate(pendulumOrigin);
    noFill();
    stroke(255, 50, 50);
    strokeWeight(0.5);

    this.sim.pendulumPopulation.forEach((p) => {
      line(p.x, 0, p.x, p.y);
    });

    pop();
  };

  drawCosine = () => {
    push();

    translate(pendulumOrigin);
    noFill();
    stroke(50, 255, 50);
    strokeWeight(0.5);

    this.sim.pendulumPopulation.forEach((p) => {
      line(0, 0, p.x, 0);
    });

    pop();
  };
}
