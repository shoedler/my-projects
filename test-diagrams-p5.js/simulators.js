Port.prototype.state = false;

class SimulatedEdge extends Edge {
  constructor(startPort) {
    super(startPort);
  }

  simulate = () => {
    let state = this.startPort.state;
    this.endPort.state = state;

    if (state) this.setLogicalTrue();
    else this.setLogicalFalse();
  };
}

class ANDNode extends Node {
  constructor(pos) {
    super(pos, 'AND', 100, 150, ['a', 'b'], ['x']);
  }

  simulate = () => {
    let state = this.inputs[0].state && this.inputs[1].state;
    this.outputs[0].state = state;

    if (state) this.setLogicalTrue();
    else this.setLogicalFalse();
  };
}

class ORNode extends Node {
  constructor(pos) {
    super(pos, 'OR', 100, 150, ['a', 'b'], ['x']);
  }

  simulate = () => {
    let state = this.inputs[0].state || this.inputs[1].state;
    this.outputs[0].state = state;

    if (state) this.setLogicalTrue();
    else this.setLogicalFalse();
  };
}
class LogicalTrueNode extends Node {
  constructor(pos) {
    super(pos, '1', 50, 100, [], ['x']);
  }

  simulate = () => {
    this.outputs[0].state = true;
    this.setLogicalTrue();
  };
}
