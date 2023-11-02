let n;
let nodes = [];
let edges = [];

let selectedElement;
let activeEdge;
let hoverElement;

let simulate = false;

let offset = { x: 0, y: 0 };

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  nodes = [
    new LogicalTrueNode(createVector(width * 0.1, height * 0.5)),
    new ANDNode(createVector(width * 0.2, height * 0.5)),
    new ORNode(createVector(width * 0.6, height * 0.5)),
    new ANDNode(createVector(width * 0.8, height * 0.5)),
  ];

  // Simulation Button
  button = createButton('Simulate');
  button.position(10, 10);
  button.mouseClicked(() => (simulate = !simulate));
}

function draw() {
  background(color(midnightBlue));
  if (activeEdge) activeEdge.draw(); // For the 'trace' functionality
  edges.forEach((e) => e.draw());
  nodes.forEach((n) => n.draw());

  if (simulate) {
    nodes.forEach((n) => n.simulate());
    edges.forEach((e) => e.simulate());
  }

  let statusColor = simulate ? color(emerald) : color(alizarin);
  fill(statusColor);
  noStroke();
  ellipse(100, 20, 15, 15);
}

const getSelectedElement = () => {
  let element = null;
  for (let i = 0; i < nodes.length; i++) {
    element = nodes[i].collides(mouseX, mouseY);
    if (element) break;
  }
  return element;
};

const getHoveredPort = () => {
  // 'selectedElement' is instance of Port
  let element = getSelectedElement();
  if (element instanceof Port) {
    if (selectedElement.parent === element.parent) return null;
    if (element === selectedElement) return null;
    return element;
  }
  return null;
};

function mousePressed() {
  selectedElement = getSelectedElement();
  if (!selectedElement) return;
  selectedElement.setActive();

  if (selectedElement instanceof Node) {
    offset = selectedElement.offsets(mouseX, mouseY);
  } else if (selectedElement instanceof Port) {
    activeEdge = new SimulatedEdge(selectedElement);
  }
}

function mouseDragged() {
  if (!selectedElement) return;

  if (selectedElement instanceof Node) {
    selectedElement.setPos(mouseX - offset.x, mouseY - offset.y);
  } else if (selectedElement instanceof Port) {
    if (hoverElement) hoverElement.setInactive();
    hoverElement = getHoveredPort();
    if (hoverElement) {
      hoverElement.setActive();
    }

    activeEdge.trace(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (!selectedElement) return;
  if (selectedElement instanceof Node) {
    /* Do nothing */
  } else if (selectedElement instanceof Port) {
    let targetElement = getHoveredPort();
    if (targetElement) {
      activeEdge.setEndPos(targetElement);
      edges.push(activeEdge);
    }

    activeEdge = null;
  }

  selectedElement.setInactive();
  if (hoverElement) hoverElement.setInactive();
}
