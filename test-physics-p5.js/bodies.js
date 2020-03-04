let gravity = 0.2;
let airResistance = gravity / 2;

class Bodies
{
  constructor(vx, vy, x, y, w, h, mass, color, bounciness, mode)
  {
    this.vx = vx;
    this.vy = vy;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h
    this.bounciness = bounciness;
    this.mass = mass;
    this.color = color;
    this.mode = mode;
  }
}

function addBody(arr, vx, vy, x, y, w, h, mass, color, bounciness, mode)
{
  arr.push(new Bodies(vx, vy, x, y, w, h, mass, color, bounciness, mode));
}

function updateBodies(arr)
{
  for (let body of arr)
  {
    if (body.mode == "static")
    {
      // do nothing
    }
    else
    {
      // handle collisions if it's a dynamic body
      for (let colBody of arr)
      {
        // if body collides with colBody from the top (y+)
        if (body.y + body.h < colBody.y && body.y > colBody.y + colBody.h)
        {
          if (abs(body.bounciness) > abs(body.vy))
          {
            body.vy = 0;
          }
          else
          {
            body.vy = body.vy * -body.bounciness
          }
        }
        else
        { // if no collision happens
          body.vy += gravity + body.mass
        }

        body.y += body.vy;
        body.x += body.vx;
      }

      fill(body.color);
      rect(body.x, body.y, body.w, body.h);
    }
  }
}


    // old 💩y code
    // --------------------
    // for (let body of arr) {
    //   if (body.mode == "static") {
    //
    //   } else { // if body isn't static
    //     // if entity hits bottom
    //     if (body.y + body.vy + body.h > wHeight) {
    //
    //       // if the bounciness attr of body > than vy at impact, then vy = 0
    //       // this stops the endless bouncing around of the body on bottom
    //       if (abs(body.bounciness) > abs(body.vy)) {
    //         body.vy = 0;
    //       } else {
    //         body.vy = body.vy * -body.bounciness
    //       }
    //     } else {
    //
    //       // normal phyics
    //       body.vy += gravity + body.mass
    //     }
    //
    //     body.vx -= airResistance;
    //
    //
    //     body.y += body.vy;
    //     body.x += body.vx;
    //   }
    //
    //   fill(body.color);
    //   rect(body.x, body.y, body.w, body.h);
    // }
    //
