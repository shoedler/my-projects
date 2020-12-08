class Rocket
{
  constructor()
  {
    this.canopyWidth = 25;
    this.canopyLength = 25;

    this.bodyWidth = 60;
    this.bodyLength = 100;
    this.bodySideSize = this.bodyWidth / 3;

    this.wingSize = this.bodyWidth / 2;
    this.wingOffset = 1.1;

    this.pos = createVector(width / 2,  height / 3);

    this.canopyColor = color(30, 30, 40);
    this.bodyColor0 = color(29, 157, 138);
    this.bodyColor1 = color(3, 107, 109);
    this.bodyColor2 = color(0, 57, 67);

    this.exhaustStream = new ExhaustStream(this.pos.x, this.pos.y + this.bodyLength * 0.9);
  }

  render = () =>
  {
    this.exhaustStream.render();

    push();
      translate(this.pos);
      noStroke();

      // Body Sides
      fill(this.bodyColor2);
      circle(-this.bodyWidth/2, this.bodySideSize/2, this.bodySideSize);
      circle( this.bodyWidth/2, this.bodySideSize/2, this.bodySideSize);
      rect(-this.bodyWidth / 2 - this.bodySideSize / 2, this.bodySideSize / 2, this.bodySideSize, this.bodyLength - this.bodySideSize / 2);
      rect( this.bodyWidth / 2 - this.bodySideSize / 2, this.bodySideSize / 2, this.bodySideSize, this.bodyLength - this.bodySideSize / 2);

      // Body
      fill(this.bodyColor0);
      circle(0, 0, this.bodyWidth);
      rect(-this.bodyWidth/2, 0, this.bodyWidth, this.bodyLength);
      
      // Body Glare
      noFill();
      stroke(this.bodyColor1);
      arc(0, 0, 5, this.bodyWidth * 0.9, HALF_PI);

      // Canopy
      noStroke();
      fill(this.canopyColor);
      circle(0, 0, this.canopyWidth);
      circle(0, this.canopyLength, this.canopyWidth);
      rect(-this.canopyWidth/2, 0, this.canopyWidth, this.canopyLength);

    pop();
  }


}


class ExhaustStream
{
  constructor(x, y)
  {
    this.pos = createVector(x, y);
    this.streamWidth = 60;
    
    // Make a particle class: particle: life(fade to other color), range(dist from stream = color)
    this.particles = [];
    this.maxParticleSize = 60;
    this.particleAmount = 500;

    this.streamColors =       [color(196, 125,  72),
                               color(133, 164,  63)];
    this.particleColors =     [color(196, 125,  72), 
                               color(133,  64,  33), 
                               color( 80,  36,  19), 
                               color(153,  89,  51)];
    this.lerpParticleColors = [color( 20,  20,  20), 
                               color(100, 100, 100), 
                               color( 53,  53,  53), 
                               color(150, 150, 150)];

    for (let i = 0; i < this.particleAmount; i++)
    {
      this.particles.push(createVector(random(-this.streamWidth/2, this.streamWidth/2), random(0, height), random() * this.maxParticleSize));
    }
  }

  get randomStreamColor() { return this.streamColors[Math.floor(random(0, this.streamColors.length))]; }
  get randomParticleColor() { return this.particleColors[Math.floor(random(0, this.particleColors.length))]; }
  get randomParticleLerpColor() { return this.lerpParticleColors[Math.floor(random(0, this.lerpParticleColors.length))];}

  render = () =>
  {
    let h = height - this.pos.y;

    push();

      translate(this.pos);
      noStroke();

      fill(this.randomParticleColor);
      rect(-this.streamWidth / 2, 0, this.streamWidth, h);
      
      this.particles.forEach(p =>
      {
        p.y += random(0, 8);
        p.x += p.x < 0 ? random(0, -0.5) : random(0, 0.5);

        if (p.y > h)
        {
          p.y = 0;
          p.x = random(-this.streamWidth / 2, this.streamWidth / 2);
        }    

        let lerpAmount = p.y / h;
        let c = lerpColor(this.randomParticleColor, this.randomParticleLerpColor, lerpAmount);
        fill(c);
        circle(p.x, p.y, p.z);
      });

    pop();
  }
}
