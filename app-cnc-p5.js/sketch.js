const PRG = ['G53X100F20', 'G53Y100F20', 'G53X0F40', 'G53Y0F40'];
let mc;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textFont('Consolas');

  mc = new Machine();
}

function draw() {
  background(63);
  mc.render();
  mc.run();
}

class Machine {
  constructor(slotSize = 95, slotPadding = 5, slots = 5 * 5) {
    this.slotSize = slotSize;
    this.slotPadding = slotPadding;
    this.slots = slots;

    this.cells = [];

    /* Initialize Cells-Array */
    for (let j = 0; j < sqrt(this.slots); j++) {
      this.cells.push([]);
      for (let i = 0; i < sqrt(this.slots); i++) {
        this.cells[j].push({
          X: (this.slotSize + this.slotPadding) * i + this.slotSize / 2 + this.slotPadding,
          Y: (this.slotSize + this.slotPadding) * j + this.slotSize / 2 + this.slotPadding,
        });
      }
    }

    this.commandStack = [];
    this.state = false;

    this.toolPos = 0;
    this.doInterpolate = false;

    this.axes = ['X', 'Y'];

    /* Programmatically add Properties for each Axis */
    this.axes.forEach((axis) => {
      this[axis] = 0; /* Current Pos [mm] */
      this[`${axis}T`] = 0; /* Target Pos  [mm] */
      this[`${axis}R`] = 0; /* Rest Travel [mm] */
      this[`${axis}F`] = 0; /* Feedrate    [mm / minute] */
      this[`${axis}BUSY`] = false;
    });
  }

  pushCommand = (command) => {
    const checkIfG53 = /G53\s*(X|Y)\s*(-?\d*\.\d*|-?\d*)\s*F\s*(\d*\.\d*|\d*)/;

    let match = checkIfG53.exec(command);

    if (!match) {
      console.error('Command is illegal');
      return false;
    } else {
      let c = {};
      /* Command format: [axisLetter]T: Float, [axisLetter]F: Float
            T -> Target position, F -> Feedrate */
      c[`${match[1]}T`] = parseFloat(match[2], 100);
      c[`${match[1]}F`] = parseFloat(match[3], 100);
      this.commandStack.push(c);
      return true;
    }
  };

  popCommand = () => {
    if (this.commandStack.length > 0) {
      let c = this.commandStack[0];

      /* Retrieve axisLetter from current stackHead command and
            check this axis's Busy signal */
      let thisAxisIsBusy = this[`${Object.keys(c)[0][0]}BUSY`];

      if (!thisAxisIsBusy) {
        this[Object.keys(c)[0]] = c[Object.keys(c)[0]]; /* Set Target Position */
        this[Object.keys(c)[1]] = c[Object.keys(c)[1]]; /* Set Feedrate */
        this.commandStack.splice(0, 1);
      }
    }
  };

  run = () => {
    /* Update axis-busy signal */
    this.axes.forEach((axis) => (this[`${axis}BUSY`] = this[`${axis}R`] != 0));

    /* Update machine state */
    this.state = false;
    this.axes.forEach((axis) => {
      if (this[`${axis}BUSY`]) this.state = true;
    });

    /* If ideling or if doInterpolate, run the next Command. */
    if (!this.state || this.doInterpolate) this.popCommand();
    this.move();
  };

  move = () => {
    /* Attempt to sync the movement to the framerate */
    let sec = frameRate() / 60;

    /* Move each axis */
    this.axes.forEach((axis) => {
      /* Get step size depending on the axis' feedrate and current frameRate */
      let axisStep = this[`${axis}F`] / (sec * 60);

      /* Update rest travel-value */
      this[`${axis}R`] = this[`${axis}T`] - this[axis];

      let axisDir = this[`${axis}R`] > 0 ? 1 : -1;

      /* Move the axis. If the axis-rest value is smaller than axisStep, move the axis-rest value.
            This ensures that we end up on the correct position and won't overshoot */
      this[axis] += abs(this[`${axis}R`]) > abs(axisStep) ? axisStep * axisDir : this[`${axis}R`];
    });
  };

  moveToCell = (x, y, fr) => {
    this.pushCommand(`G53X${this.cells[x][y].X}F${fr}`);
    this.pushCommand(`G53Y${this.cells[x][y].Y}F${fr}`);
  };

  loadProgram = (commandArray) => {
    this.commandStack = [];

    commandArray.forEach((cmd, i) => {
      if (!this.pushCommand(cmd)) {
        console.error(`cmd#${i + 1}: Failed to load Programm at command #${i + 1}: ${cmd}`);
        this.commandStack = [];
        return;
      } else {
        console.log(`cmd#${i + 1}: Loaded ${cmd}...`);
      }
    });
  };

  render = () => {
    let slotAmount = sqrt(this.slots);
    let edgeLength = slotAmount * (this.slotSize + this.slotPadding) + this.slotPadding;

    push();
    translate(this.slotSize * 2, this.slotSize * 2);

    this.renderDRO();
    this.renderSlots(slotAmount, edgeLength);
    this.renderGantry(edgeLength);
    this.renderToolhead(this.toolPos);
    this.renderSecondaryGuides(edgeLength);
    this.renderPrimaryGuides(edgeLength);
    pop();
  };

  renderDRO = () => {
    const size = 18;
    let state = this.state ? 'processing...' : 'idle';

    fill(255);
    noStroke();
    textSize(size);
    text(`X:  ${toDRO(this.X, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5);
    text(`Y:  ${toDRO(this.Y, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size);
    fill(150);
    text(`XR: ${toDRO(this.XR, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 2);
    text(`YR: ${toDRO(this.YR, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 3);

    text(state, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 5);
  };

  renderToolhead = (tool = 0) => {
    const barWidth = 15;

    stroke(30);
    strokeWeight(1);

    fill(200);
    rect(this.X, this.Y, 20, -20);

    fill(150, 30, 30);
    ellipse(this.X - 2.0 * barWidth - tool, this.Y + barWidth * 1.3, barWidth);
    ellipse(this.X + 2.0 * barWidth + tool, this.Y + barWidth * 1.3, barWidth);

    fill(150);
    rect(this.X - 2.5 * barWidth - tool, this.Y + barWidth / 4.0, barWidth * 2, -barWidth / 2);
    rect(this.X + 2.5 * barWidth + tool, this.Y + barWidth / 4.0, -barWidth * 2, -barWidth / 2);

    rect(this.X - 2.5 * barWidth - tool, this.Y + barWidth * 1.5, barWidth / 4, -barWidth * 2);
    rect(this.X + 2.5 * barWidth + tool, this.Y + barWidth * 1.5, -barWidth / 4, -barWidth * 2);

    fill(150, 100, 30);
    rect(this.X - barWidth * 2, this.Y + barWidth / 2, barWidth * 4, -barWidth);

    beginShape();
    endShape(CLOSE);

    /* Center Point */
    fill(255, 255, 0);
    ellipse(this.X, this.Y, 2, 2);
  };

  renderGantry = (edgeLength) => {
    const width = 10;

    fill(100, 100, 100, 50);
    stroke(30);
    strokeWeight(1);
    /* Static parts (Framing) */
    rect(0, 0 - width * 2, edgeLength, -width * 2);
    rect(0, -width * 4, -width * 2, edgeLength + 4 * width);

    /* Gantry */
    rect(0, this.Y - width * 2, edgeLength, width);
    rect(this.X + width, -width * 2, width, edgeLength + 2 * width);
  };

  renderPrimaryGuides = (edgeLength) => {
    const spacing = 100;
    let amount = Math.floor(edgeLength / spacing);

    stroke(255, 50, 50, 100);
    for (let i = 0; i <= amount; i++) {
      line(i * spacing, -spacing, i * spacing, edgeLength + spacing);
      line(-spacing, i * spacing, edgeLength + spacing, i * spacing);
    }

    textSize(12);
    noStroke();
    fill(255, 50, 50, 100);
    textAlign(CENTER, BOTTOM);
    for (let i = 0; i <= amount; i++) {
      text(`X ${i * spacing}`, i * spacing, -spacing);
    }
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= amount; i++) {
      text(`Y ${i * spacing} `, -spacing, i * spacing);
    }
  };

  renderSecondaryGuides = (edgeLength) => {
    const spacing2 = 5;
    let amount = Math.ceil(edgeLength / spacing2);

    stroke(100, 100, 100, 70);
    for (let i = 0; i <= amount; i++) {
      line(i * spacing2, -spacing2, i * spacing2, edgeLength + spacing2);
      line(-spacing2, i * spacing2, edgeLength + spacing2, i * spacing2);
    }
  };

  renderSlots = (slotAmount, edgeLength) => {
    noStroke();
    fill(40);
    for (let i = 0; i <= slotAmount; i++) {
      rect(i * (this.slotSize + this.slotPadding), 0, this.slotPadding, edgeLength);
      rect(0, i * (this.slotSize + this.slotPadding), edgeLength, this.slotPadding);
    }
  };
}

const toDRO = (number, leadingZeros, decimalPlaces) => {
  const delimiter = '.';
  const zero = '0';

  const str = number.toFixed(decimalPlaces);
  const pre = str.indexOf(delimiter);

  if (pre >= leadingZeros) return str;

  return zero.repeat(leadingZeros - pre) + str;
};
