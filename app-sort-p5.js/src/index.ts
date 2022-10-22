import p5 from "p5";
import { ArrayVisualisation } from "./array";
import { BubbleSort, HeapSort, MergeSort, QuickSort, RadixSort, SelectionSort, ShellSort, TimSort } from "./sorters";

const visualizer = new ArrayVisualisation(100);

const sketch = (p: p5) => {
  p.setup = () => {
    console.log("🚀 - Setup initialized - P5 is running");
    p.createCanvas(window.innerWidth, window.innerHeight);

    const buttons = [
      p.createButton("Bubble Sort").mousePressed(() =>    visualizer.init(new BubbleSort())),
      p.createButton("Heap Sort").mousePressed(() =>      visualizer.init(new HeapSort())),
      p.createButton("Merge Sort").mousePressed(() =>     visualizer.init(new MergeSort())),
      p.createButton("Quick Sort").mousePressed(() =>     visualizer.init(new QuickSort())),
      p.createButton("Radix Sort").mousePressed(() =>     visualizer.init(new RadixSort())),
      p.createButton("Selection Sort").mousePressed(() => visualizer.init(new SelectionSort())),
      p.createButton("Shell Sort").mousePressed(() =>     visualizer.init(new ShellSort())),
      p.createButton("Tim Sort").mousePressed(() =>       visualizer.init(new TimSort()))
    ]

    buttons.forEach((button, index) => {
      button.position(10, 10 + (index * 30));
    });

    visualizer.p = p;
  
    p.frameRate(60);
  }

  p.draw = () => visualizer.draw();
}

export const app = new p5(sketch)

app.mousePressed  = () => { }
app.mouseDragged  = () => { }
app.mouseReleased = () => { }