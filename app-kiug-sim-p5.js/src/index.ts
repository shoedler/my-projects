import p5 from "p5";
import { simulation } from "./sketch";

(() => {
  document.addEventListener("DOMContentLoaded", _ => {
    const sketch = document.querySelector(".sketch") as HTMLDivElement;
    new p5(simulation, sketch);
  });
})();
