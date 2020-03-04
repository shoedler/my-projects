class Entity
{
  constructor(x, y, r, player, mass, color_r, color_g, color_b)
  {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color_r = color_r;
    this.color_g = color_g;
    this.color_b = color_b;
    this.player = player;
    this.mass = mass;

    if (x < wWidth / 2)
    {
      this.vx = random(-0.1, -1);
    }
    else
    {
      this.vx = random(0.1, 1);
    }

    if (y < wHeight / 2)
    {
      this.vy = random(-0.1, -1);
    }
    else
    {
      this.vy = random(0.1, 1);
    }
  }

  show()
  {
    noStroke();
    if (this.player)
    {
      fill(random(255), random(255), random(255));
      ellipse(this.x, this.y, this.r, this.r);
    }
    else
    {
      fill(this.color_r, this.color_g, this.color_b);
      ellipse(this.x, this.y, this.r, this.r);
    }
  }

  update()
  {
    // y physics
    if (this.y < wHeight / 2)
    {
      this.vy += (this.mass * gravity_y);
    } else
    {
      this.vy -= (this.mass * gravity_y);
    }
    this.y += this.vy;

    if (this.x < wWidth / 2)
    {
      this.vx += (this.mass * gravity_x);
    }
    else
    {
      this.vx -= (this.mass * gravity_x);
    }

    this.x += this.vx

  }

  move(vx, vy)
  {
    this.vx += vx;
    this.vy += vy;
  }

  life(entity)
  {
    // detect collision with another entity
    let x = entity.x - this.x;
    let y = entity.y - this.y;

    // detect collision using the phytagorean theorem
    let distance = sqrt(x*x + y*y)-(entity.r / 2 + this.r / 2);

    if (distance <= 0)
    {
      if (this.r < entity.r)
      {
        entity.r = entity.r - (distance / 6);
        this.r = this.r + (distance / 1);
      }
      else
      {
        this.r = this.r - (distance / 6);
        entity.r = entity.r + (distance / 1);
      }
    }

    // true if dead
    if (this.r <= 0)
    {
      return true;
    }

  }
}

class BlackHole
{
  constructor(r)
  {
    this.r = r;
    this.x = wWidth / 2;
    this.y = wHeight / 2;
    this.endGradient = bgColor; // bgColor is a global var
    this.startGradient = 20;
  }

  show()
  {
    let reverse_i;
    for (let i = this.r; i > 0; i--)
    {
      reverse_i = this.r - i;
      if ((this.startGradient + reverse_i) > this.endGradient)
      {
        fill(this.endGradient);
      }
      else
      {
        fill(this.startGradient + reverse_i);
      }

      ellipse(this.x, this.y, i, i);
    }
  }
}
