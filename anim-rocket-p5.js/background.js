class Background
{
  constructor()
  {
    this.gradientColorBottom = color(41, 17, 57);
    this.gradientColorTop = color(5, 5, 15);

    this.starColor = color(236, 235, 158);
    this.maxStarSize = 30;
    this.starDensity = 20;
    this.stars = [];

    for (let i = 0; i < this.starDensity; i++)
    {
      this.stars.push(createVector(random() * width, random() * height, random() * this.maxStarSize));
    }
  }



  render = () =>
  {
    // Background
    setGradient(0, 0, width, height, this.gradientColorTop, this.gradientColorBottom, Y_AXIS);

    // Stars
    this.stars.forEach(s => 
    {
      // Update pos
      s.y += s.z / 2;
      s.y %= height;

      if (s.z > this.maxStarSize / 2) 
      { 
        noFill();
        stroke(this.starColor); 
        strokeWeight(s.z / 3);
        circle(s.x, s.y, s.z *0.75);
      }
      else
      {
        fill(this.starColor);
        circle(s.x, s.y, s.z);
      }
    });
  }
}



setGradient = (x, y, w, h, c1, c2, axis) =>
{
  noFill();

  if (axis === Y_AXIS) 
  {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) 
    {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } 
  else if (axis === X_AXIS) 
  {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) 
    {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}