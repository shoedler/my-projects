import { ObservableArray, ObservableArrayStats } from "./observableArray";
import { ObservableBubbleSort, ObservableInserionSort } from "./sorters";

export const CONFIG = {
  arraySize: 50,
  barSpanFactor: 0.7, // Max: 1, represents the percentage of the available bar width that is filled
  delay: 100 // Delay in milliseconds between each step of the sort
}

const container = document.querySelector(".data-container");

// Setup
(() => {

  for (let i = 0; i < CONFIG.arraySize; i++) {
    const value = Math.floor(Math.random() * 100) + 1; 

    // Calculate bar width
    const width = (document.querySelector(".data-container") as HTMLElement).clientWidth;
    const availableBarWidth = width / CONFIG.arraySize;

    const bar = document.createElement("div");
    bar.style.width = `${availableBarWidth * CONFIG.barSpanFactor}px`;
    bar.style.transform = `translateX(${((i * availableBarWidth) + availableBarWidth * (1 - CONFIG.barSpanFactor))}px)`;
    bar.style.height = `${value * 3}px`;
    
    const barLabel = document.createElement("label");
    barLabel.innerHTML = value.toString();

    // Update the bar's label on resize
    new ResizeObserver(_ => { barLabel.innerHTML = (parseInt(bar.style.height, 10) / 3).toString() }).observe(bar);

    bar.appendChild(barLabel);
    container.appendChild(bar);
  }
})();

window.sort = async (): Promise<void> => {
  const divArray = Array.from(document.querySelectorAll(".data-container > div") as NodeListOf<HTMLDivElement>);
  const observableArray = new ObservableArray(divArray);
  const sorter = new ObservableInserionSort();
  const stats = await sorter.sort(observableArray);
  console.log(stats);
  enable();
}
  
window.generate = () => window.location.reload();
window.enable = () => {
  (document.getElementById("Button1") as HTMLButtonElement).disabled = false;
  (document.getElementById("Button2") as HTMLButtonElement).disabled = false;
}
window.disable = () => {
  (document.getElementById("Button1") as HTMLButtonElement).disabled = true;
  (document.getElementById("Button2") as HTMLButtonElement).disabled = true;
}
