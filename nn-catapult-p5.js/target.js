class Target
{
  constructor()
  {
    this.w = wWidth / 40;
    // this.x = random(wWidth / 2, wWidth - this.w);
    this.x = wWidth / 2;
    this.middle = this.x + (this.w / 2);
    this.lowerBoundary = this.middle - (this.w / 2);
    this.upperBoundary = this.middle + (this.w / 2);
    this.color = color(200, 0, 0, 100);
  }


  draw = () =>
  {
    fill(this.color);
    noStroke();
    rect(this.x, wHeight - groundLevel, this.w, groundLevel);
  }
}
