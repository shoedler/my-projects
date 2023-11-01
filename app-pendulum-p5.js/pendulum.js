class Pendulum
{
    constructor(sim, id, r, g, b)
    {
        this.sim = sim;
        this.id = id;
        
        this.a = this.sim.pendulumStartingAngle;    
        
        this.x;                     /* Ball X Position */
        this.y;                     /* Ball Y Position */
        this.av = 0;                /* Pendulum Angular Velocity */
        this.aa = 0;                /* Pendulum Angular Acceleration */
        
        /* Visual Properties */
        this.c = color(r, g, b);    /* Color */
        this.lineOpacity = 150;     /* Max = 255 */
        
        /* Graph Properties */
        this.points = [];
    }

    get l() { return this.sim.pendulumMaxLenght - (this.id * this.sim.pendulumLengthDifference); }

    update = () =>
    {
        /* Calculate Position */
        this.x = this.l * sin(this.a);
        this.y = this.l * cos(this.a);

        /* Calculate Acceleration */
        this.aa = this.sim.pendulumGravityConstant / -this.l * sin(this.a);
        
        /* Calculate Velocity */
        this.av += this.aa;
        this.av *= this.sim.pendulumAngularVelocityDampening;

        /* Calculate Angle */
        this.a += this.av;
        this.a -= this.a > PI ? TWO_PI : 0;
        this.a += this.a < -PI ? TWO_PI : 0;
    }

    draw = () =>
    {
        push();

        /* Draw Pendulum Line */
        translate(pendulumOrigin.x, pendulumOrigin.y);
        stroke(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.lineOpacity);
        strokeWeight(2)
        line(0, 0, this.x, this.y);

        /* Draw Pendulum Ball */
        fill(this.c);
        noStroke();
        ellipse(this.x, this.y, this.sim.pendulumBallSize, this.sim.pendulumBallSize);

        pop();
    }

    drawCircumference = () =>
    {
        push();

        translate(pendulumOrigin.x, pendulumOrigin.y);

        stroke(30);
        strokeWeight(1);
        noFill();
        ellipse(0, 0, this.l * 2, this.l * 2)

        pop();
    }
}