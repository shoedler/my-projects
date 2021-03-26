class Shape {
  constructor(pos, name) {
    this.pos = pos
    this.name = name

    this.borderColor = color(wetAsphalt)
    this.backgroundColor = color(emerald)
    this.strokeWeight = 2;
  }

  setActive = () => this.borderColor = color(carrot)
  setInactive = () => this.borderColor = color(wetAsphalt)
  setIllegal = () => this.borderColor = color(alizarin)

  setLogicalTrue = () => this.borderColor = color(sunFlower)
  setLogicalFalse = () => this.borderColor = color(alizarin)
}

class Port extends Shape {
  constructor(pos, name) {
    super(pos, name)
    this.radius = 10
    this.parent = null

    // Override
    this.backgroundColor = color(silver)
  }

  drawPort = (textOfs) => {
    fill(color(this.backgroundColor))
    strokeWeight(this.strokeWeight)
    stroke(this.borderColor)
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius)

    fill(this.borderColor)
    noStroke()
    text(this.name, this.pos.x + textOfs, this.pos.y)
  }

  collides = (x, y) => {
    return (sqrt((sq(y - this.pos.y) + sq(x - this.pos.x)) <= this.radius + this.strokeWeight))
  }
}

class Node extends Shape {
  constructor(pos, name, w, h, inp, oup) {
    super(pos, name)
    this.width = w
    this.height = h

    this.inputs = inp.map(i => new Port(createVector(0, 0), i), null)
    this.outputs = oup.map(o => new Port(createVector(0, 0), o), null)

    this.init()
    this.setPorts()
  }

  init = () => {
    this.inputs.forEach(i => i.parent = this)
    this.outputs.forEach(o => o.parent = this)
  }

  setPorts = () => {
    let yPad = this.height * 0.2
    let yInpSpacing = (this.height - 2 * yPad) / (this.inputs.length - 1)
    let yOupSpacing = (this.height - 2 * yPad) / (this.outputs.length)

    this.inputs.forEach((inp, i) => {
      inp.pos.x = this.pos.x
      inp.pos.y = this.pos.y + yPad + (yInpSpacing * i)
    })

    this.outputs.forEach((oup, i) => {
      oup.pos.x = this.pos.x + this.width
      oup.pos.y = this.pos.y + yPad + (yOupSpacing * i)
    })
  }

  draw = () => {
    fill(this.backgroundColor)
    stroke(this.borderColor)
    strokeWeight(this.strokeWeight)
    rect(this.pos.x, this.pos.y, this.width, this.height)

    textSize(30)
    textAlign(CENTER, CENTER)
    fill(this.borderColor)
    noStroke()
    text(this.name, this.pos.x + this.width / 2, this.pos.y + this.height / 2)

    this.drawPorts()
  }

  drawPorts = () => {
    textSize(15)
    textAlign(LEFT, CENTER)
    this.inputs.forEach(inp => inp.drawPort(15))
    textAlign(RIGHT, CENTER)
    this.outputs.forEach(oup => oup.drawPort(-15))
  }

  collides = (x, y) => {
    let inInput = this.inputs.filter(i => i.collides(x,y))[0]
    if (inInput) return inInput
    let inOutput = this.outputs.filter(o => o.collides(x, y))[0]
    if (inOutput) return inOutput
    let inNode = ((x > this.pos.x && x < this.pos.x + this.width) && (y > this.pos.y && y < this.pos.y + this.height))
    if (inNode) return this
    return null
  }

  offsets = (x, y) => {
    return { x: x - this.pos.x, y: y - this.pos.y}
  }

  setPos = (x, y) => {
    this.pos.x = x
    this.pos.y = y
    this.setPorts()
  }
}

class Edge extends Shape {
  constructor(startPort) {
    super(createVector(0,0), 'Edge') // Ignore
    this.startPort = startPort
    this.endPort = new Port(startPort.pos, 'Edge')
  }

  draw = () => {
    stroke(this.borderColor)
    strokeWeight(this.strokeWeight)
    line(this.startPort.pos.x, this.startPort.pos.y, this.endPort.pos.x, this.endPort.pos.y)
  }

  trace = (x, y) => {
    this.endPort.pos = createVector(x, y)
  }

  setEndPos = (port) => {
    this.endPort = port
  }
}