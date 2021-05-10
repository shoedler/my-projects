const bg = 32

let robot = {}
let mouse = {}

// TODO: Fix movement in the left side of the unit circle
// TODO: Fix movement for x|y values outside the reach of the arm

function setup() {
  robot = new RobotArm(createVector(300, 300), 80, 60)
  mouse = new CrossHair(createVector(300, 300), createVector(300, 300))

  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(bg);

  // Logger
  if (frameCount % 30 == 0) console.log(robot.q1, robot.q2);

  mouse.origin.x = mouseX
  mouse.origin.y = mouseY

  robot.update()
  robot.draw()
  mouse.draw()
}

class RobotArm {
  constructor(v, upperArmLength = 80, lowerArmLength = 60) {
    this.origin = v
    this.upperArm = new Arm(this.origin, upperArmLength)
    this.lowerArm = new Arm(this.upperArm.end, lowerArmLength)
    this.endEffector = new CrossHair(this.lowerArm.end, this.origin)

    this.position = createVector(upperArmLength, -lowerArmLength / 2)
    this.previousPosition = null
    this.targetPosition = this.position.copy()
    this.ticks = 0
  }

  // Inverse Kinematics
  set x(v) { this.position.x = v - this.origin.x }
  set y(v) { this.position.y = v - this.origin.y }
  get a1() { return this.upperArm.len }
  get a2() { return this.lowerArm.len }
  get q1() { return atan(this.position.y / this.position.x) - atan((this.a2*sin(this.q2)) / (this.a1 + this.a2*cos(this.q2))) }
  get q2() { return acos((this.position.x**2 + this.position.y**2 - this.a1**2 - this.a2**2) / (2*this.a1*this.a2)) }

  goto = (x, y) => {
    this.targetPosition = createVector(x, y)
  }

  update = () => {
    if (!this.targetPosition.equals(this.position)) {
      // Get previous position
      if (!this.previousPosition) this.previousPosition = this.position.copy()

      // Lerp incrementally, increment counter
      this.position = p5.Vector.lerp(this.previousPosition, this.targetPosition, this.ticks)
      this.ticks += 0.01

      // Position reached, clear
      if (this.ticks >= 1) {
        this.previousPosition = null
        this.targetPosition = this.position.copy()
        this.ticks = 0
      }
    }

    // Update angles using the inverse kinematic model
    this.upperArm.angle = -this.q1
    this.lowerArm.angle = -(this.q1 + this.q2)
    this.upperArm.update()
    this.lowerArm.update()
  }

  draw = () => {
    this.upperArm.draw()
    this.lowerArm.draw()
    this.endEffector.draw()
  }
}

class CrossHair  {
  constructor(v, offset = createVector(0, 0)) {
    this.origin = v
    this.offset = offset
  }

  draw() {
    push()
    translate(this.origin)
    strokeWeight(1)

    stroke(0,255,0)
    line(0, 0, 20, 0)
    stroke(255,0,0)
    line(0, 0, 0, 20)

    noStroke()
    fill(200)
    textAlign(CENTER, BOTTOM)
    text(`${(this.origin.x - this.offset.x).toFixed(0)} | ${(this.origin.y - this.offset.y).toFixed(0)}`, 0, 0)
    pop()
  }
}

class Arm  {
  constructor(v, len = 80) {
    this.origin = v
    this.end = createVector(this.origin.x + len, this.origin.y)
    this.angle = 0
    this.angleOfs = PI/2
    this.len = len
  }

  get pos() { return this.end }
  get θ() { return this.angleOfs + this.angle }

  get x() {
    this.end.x = this.len * sin(this.θ) + this.origin.x;
    return this.end.x
  }

  get y() {
    this.end.y = this.len * cos(this.θ) + this.origin.y;
    return this.end.y
  }

  update = () => {
    this.end.x = this.len * sin(this.θ) + this.origin.x;
    this.end.y = this.len * cos(this.θ) + this.origin.y;
  }

  draw = () => {
    push()
    translate(this.origin)
    rotate(-this.θ)
    strokeWeight(4)

    const lowerJointSize = this.len * 0.5 //0.7
    const upperJointSize = this.len * 0.4 //0.5
    const lowerArmWidth =  this.len * 0.2 //0.3
    const upperArmWidth =  this.len * 0.1 //0.2

    fill(255, 120, 0)
    stroke(200, 80, 0)

    quad(lowerArmWidth, 0,
        -lowerArmWidth, 0,
        -upperArmWidth, this.len,
         upperArmWidth, this.len)

    fill(50)
    stroke(70)

    ellipse(0, 0, lowerJointSize, lowerJointSize)
    ellipse(0, this.len, upperJointSize, upperJointSize)
    pop()
  }
}
