class Player 
{
  constructor() 
  {
    this.pos = new p5.Vector(width / 2, height / 2);
    this.dir = new p5.Vector(mouseX, mouseY);
    this.color = color(255, 255, 255);
    this.size = 10;

    this.rays = [];
    this.rayColor = color(200, 200, 200);

    for (let i = 0; i < 360; i++)
      this.rays[i] = new Ray(this.pos, radians(i));

  }

  run = (slow, hold, bounds) => 
  {
    let dist = slow ? 0.005 : 0.05;
    dist = hold ? 0 : dist;
    this.pos.x = lerp(this.pos.x, mouseX, dist);
    this.pos.y = lerp(this.pos.y, mouseY, dist);
    
    this.dir.x = mouseX;
    this.dir.y = mouseY;

    if (bounds.some(bound => this.checkCollision(bound))) this.color = color(0, 0, 0);
    else this.color = color(255, 255, 255);

    this.traceRays(bounds);
    this.renderPlayer();
  };

  checkCollision = (bound) =>
  {
    if (circlePointCollision(this.pos, this.size / 2, bound.a)) return true;
    if (circlePointCollision(this.pos, this.size / 2, bound.b)) return true;
    
    const dot = ( (this.pos.x - bound.a.x) * (bound.b.x - bound.a.x) + 
                  (this.pos.y - bound.a.y) * (bound.b.y - bound.a.y) ) / sq(bound.length);
    const closestx = bound.a.x + (dot * (bound.b.x - bound.a.x));
    const closesty = bound.a.y + (dot * (bound.b.y - bound.a.y));

    if (!linePointCollision(bound.a, bound.b, closestx, closesty)) return false;
    // if (closestX > 0 && closestY > 0) ellipse(closestX, closestY, 20, 20);

    const distx = closestx - this.pos.x;
    const disty = closesty - this.pos.y;
    const dist = sqrt( sq(distx) + sq(disty) );
    if (dist <= this.size / 2) return true;

    return false;
  }

  traceRays = (bounds) =>
  {
    stroke(255, 241, 224)
    
    this.rays.forEach(ray => 
    {
      let intersect = null;

      /* Get Intersects */
      bounds.forEach(bound => 
      {
        let n = ray.trace(bound);
        if (n)
        {
          if (intersect)
          {
            if (abs(p5.Vector.dist(ray.pos, n)) < abs(p5.Vector.dist(ray.pos, intersect))) intersect = n;
          }
          else intersect = n;
        }
      });

      if (intersect) line(ray.pos.x, ray.pos.y, intersect.x, intersect.y);
    });
  }

  renderPlayer = () => 
  {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    stroke(150, 150, 150);
    noFill();
    ellipse(this.dir.x, this.dir.y, this.size + 1, this.size + 1);
  };

  renderRays = () =>
  {
      fill(this.rayColor);
      this.rays.forEach(ray => ray.render());
  }
}


circlePointCollision = (cv, cr, pv) =>
{
  const x = pv.x - cv.x;
  const y = pv.y - cv.y;
  const dist = sqrt( sq(x) + sq(y) );
  return dist <= cr;
}

linePointCollision = (lva, lvb, x, y) =>
{
  const dista = dist(x, y, lva.x, lva.y);
  const distb = dist(x, y, lvb.x, lvb.y);
  const len = dist(lva.x, lva.y, lvb.x, lvb.y);
  const buf = 0.01;
  return (dista + distb >= len-buf && dista + distb <= len+buf);
}