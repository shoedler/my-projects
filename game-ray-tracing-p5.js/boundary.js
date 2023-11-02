class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = new p5.Vector(x1, y1);
    this.b = new p5.Vector(x2, y2);
    this.color = color(255, 255, 255);
  }

  get length() {
    const x = this.a.x - this.b.x;
    const y = this.a.y - this.b.y;
    return sqrt(x * x + y * y);
  }

  render = () => {
    stroke(this.color);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  };
}
