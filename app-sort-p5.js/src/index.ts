import { ObservableArray, ObservableBubbleSort } from "./observableArray";

export const CONFIG = {
  arraySize: 10,
  barSpanFactor: 0.7 // Max: 1, represents the percentage of the available bar width that is filled
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
      
    bar.appendChild(barLabel);
    container.appendChild(bar);
  }
})();


window.SelectionSort = async (delay = 300) => {
  const divArray = Array.from(document.querySelectorAll(".data-container > div") as NodeListOf<HTMLDivElement>);
  const observableArray = new ObservableArray<number>(divArray);
  const sorter = new ObservableBubbleSort();
  sorter.sort(observableArray);


  // let bars = Array.from(document.querySelectorAll(".data-container > div") as NodeListOf<HTMLElement>);

  // var min_idx = 0;

  // for (var i = 0; i < bars.length; i++) {
  //   min_idx = i;

  //   bars[i].className = "bar-darkblue";

  //   for (var j = i + 1; j < bars.length; j++) {
  //     bars[j].className = "bar-red";
      
  //     // Pause the execution of code for 300 milliseconds
  //     await new Promise<void>((resolve) => setTimeout(() => { resolve(); }, 300) );
  
  //     // To store the integer value of jth bar to var1 
  //     var val1 = parseInt((bars[j].childNodes[0] as HTMLElement).innerHTML);
  //     var val2 = parseInt((bars[min_idx].childNodes[0] as HTMLElement).innerHTML);
        
  //     // Compare val1 & val2
  //     if (val1 < val2) {
  //       min_idx = j;
  //       for (var k = i + 1; k < j; k++)
  //         if (bars[k].classList.contains("bar-yellow"))
  //           bars[k].className = "";
  //       bars[min_idx].className = "bar-yellow";
  //     } else {
  //       bars[j].className = ""
  //     }
  //   }
  
  //   // To swap ith and (min_idx)th bar
  //   var temp1 = bars[min_idx].style.height;
  //   var temp2 = (bars[min_idx].childNodes[0] as HTMLElement).innerText;
  //   bars[min_idx].style.height = bars[i].style.height;
  //   bars[i].style.height = temp1;
  //   (bars[min_idx].childNodes[0] as HTMLElement).innerText = (bars[i].childNodes[0] as HTMLElement).innerText;
  //   (bars[i].childNodes[0] as HTMLElement).innerText = temp2;
      
  //   // Pause the execution of code for 300 milliseconds
  //   await new Promise<void>((resolve) => setTimeout(() => { resolve(); }, 300) );
  
  //   bars[min_idx].className = "";
  //   bars[i].className = "bar-green";
  // }
  
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
