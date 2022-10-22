import p5 from "p5";
import { ArrayVisualisation } from "./array";
import { BubbleSort, MergeSort } from "./sorters";

const visualizer = new ArrayVisualisation(100);
const sorter = new MergeSort();

const sketch = (p: p5) => {
  p.setup = () => {
    console.log("🚀 - Setup initialized - P5 is running");
    p.createCanvas(window.innerWidth, window.innerHeight);

    visualizer.p = p;
    visualizer.init(sorter);
    visualizer.shuffle();
  
    p.frameRate(10);
  }

  p.draw = () => {
    visualizer.execSortOnce(sorter);
    visualizer.draw();
  }
}

export const app = new p5(sketch)

app.mousePressed  = () => { }
app.mouseDragged  = () => { }
app.mouseReleased = () => { }