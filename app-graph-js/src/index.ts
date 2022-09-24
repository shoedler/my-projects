import p5 from "p5";
import { EColor } from "./colors";
import { Graph } from "./graph";

const graph = new Graph();

const sketch = (p: p5) => {
  p.setup = () => {
    console.log("🚀 - Setup initialized - P5 is running");
    // p.createCanvas(window.innerWidth, window.innerHeight);
    p.createCanvas(window.innerWidth, window.innerHeight * 0.5);

    const a = graph.createNode("A");
    const b = graph.createNode("B");
    const c = graph.createNode("C");
    const d = graph.createNode("D");
    const e = graph.createNode("E");
    const f = graph.createNode("F");

    a.undirected(b);
    b.undirected(c);
    c.directed(a);
    d.undirected(e);
    e.undirected(f);
    f.directed(d);
    f.directed(a);

    graph.distributeNodes(p);

    document.body.appendChild(graph.adjacencyMatrix().table);
    document.body.appendChild(graph.lookup['A'].edgeList().table);
  }

  p.draw = () => {
    p.background(p.color(EColor.midnightBlue))
    graph.render(p);
  }
}

export const app = new p5(sketch)

app.mousePressed  = () => { }
app.mouseDragged  = () => { }
app.mouseReleased = () => { }