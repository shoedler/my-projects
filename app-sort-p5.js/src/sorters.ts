import { ArraySorterColorConfig, ArraySorterStep, IArraySorter } from "./array";
import { EColor } from "./colors";

export class BubbleSort implements IArraySorter {
  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];
    let sorted = false;

    while (!sorted) {
      sorted = true;
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
          sorted = false;
          const temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
        }
        steps.push({
          array: [...array],
          coloredIndices: { [i]: EColor.pomegranate, [i + 1]: EColor.pomegranate }
        });
      }
    }

    return steps;
  }
}

export class MergeSort implements IArraySorter {
  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];
    this.mergeSort(array, 0, array.length - 1, steps, [EColor.pomegranate, EColor.carrot, EColor.alizarin]);
    return steps;
  }

  private mergeSort = (
    array: number[], 
    left: number, 
    right: number, 
    steps: ArraySorterStep[],
    colors?: EColor[]): void => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      this.mergeSort(array, left, mid, steps, [EColor.amethyst, EColor.peterRiver, EColor.belizeHole]);
      this.mergeSort(array, mid + 1, right, steps, [EColor.greenSea, EColor.emerald, EColor.turquois]);
      this.merge(array, left, mid, right, steps, colors);
    }
  }

  private merge = (
    array: number[], 
    left: number, 
    mid: number, 
    right: number, 
    steps: ArraySorterStep[],
    colors: EColor[]): void => {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let arrayIndex = left;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      if (leftArray[leftIndex] < rightArray[rightIndex]) 
        array[arrayIndex++] = leftArray[leftIndex++];
      else 
        array[arrayIndex++] = rightArray[rightIndex++];
      
      steps.push({ array: [...array], coloredIndices: { [arrayIndex - 1]: colors[0] } });
    }

    while (leftIndex < leftArray.length) {
      array[arrayIndex++] = leftArray[leftIndex++];
      steps.push({ array: [...array], coloredIndices: { [arrayIndex - 1]: colors[1] } });
    }

    while (rightIndex < rightArray.length) {
      array[arrayIndex++] = rightArray[rightIndex++];
      steps.push({ array: [...array], coloredIndices: { [arrayIndex - 1]: colors[2] } });
    }
  }
}

export class HeapSort implements IArraySorter {
  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];
    this.heapSort(array, steps);
    return steps;
  }

  private heapSort = (array: number[], steps: ArraySorterStep[]): void => {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
      this.heapify(array, n, i, steps);
    
    for (let i = n - 1; i > 0; i--) {
      const temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      steps.push({ array: [...array], coloredIndices: { 0: EColor.pomegranate, [i]: EColor.pomegranate } });
      this.heapify(array, i, 0, steps);
    }
  }

  private heapify = (array: number[], n: number, i: number, steps: ArraySorterStep[]): void => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) 
      largest = left;
    
    if (right < n && array[right] > array[largest]) 
      largest = right;
    
    if (largest !== i) {
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;

      const coloredIndices: ArraySorterColorConfig = {};
      coloredIndices[i] = EColor.pomegranate;
      coloredIndices[largest] = EColor.carrot;

      steps.push({ array: [...array], coloredIndices });
      this.heapify(array, n, largest, steps);
    }
  }
}

export class QuickSort implements IArraySorter {
  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];
    this.quickSort(array, 0, array.length - 1, steps);
    return steps;
  }

  private quickSort = (array: number[], left: number, right: number, steps: ArraySorterStep[]): void => {
    if (left < right) {
      const pivot = this.partition(array, left, right, steps);
      this.quickSort(array, left, pivot - 1, steps);
      this.quickSort(array, pivot + 1, right, steps);
    }
  }

  private partition = (array: number[], left: number, right: number, steps: ArraySorterStep[]): number => {
    const pivot = array[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (array[j] < pivot) {
        const temp = array[++i];
        array[i] = array[j];
        array[j] = temp;
        steps.push({ array: [...array], coloredIndices: { [i]: EColor.pomegranate, [j]: EColor.pomegranate } });
      }
    }

    const temp = array[i + 1];
    array[i + 1] = array[right];
    array[right] = temp;
    steps.push({ array: [...array], coloredIndices: { [i + 1]: EColor.pomegranate, [right]: EColor.pomegranate } });

    return i + 1;
  }
}

export class RadixSort implements IArraySorter {
  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];
    this.radixSort(array, steps);
    return steps;
  }

  private radixSort = (array: number[], steps: ArraySorterStep[]): void => {
    const max = Math.max(...array);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
      this.countSort(array, exp, steps);
  }

  private countSort = (array: number[], exp: number, steps: ArraySorterStep[]): void => {
    const output = Array(array.length).fill(0);
    const count = Array(10).fill(0);

    for (let i = 0; i < array.length; i++)
      count[Math.floor(array[i] / exp) % 10]++;

    for (let i = 1; i < 10; i++)
      count[i] += count[i - 1];

    for (let i = array.length - 1; i >= 0; i--) {
      output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
      count[Math.floor(array[i] / exp) % 10]--;
    }

    for (let i = 0; i < array.length; i++) {
      array[i] = output[i];
      steps.push({ array: [...array], coloredIndices: { [i]: EColor.pomegranate } });
    }
  }
}

export class SelectionSort implements IArraySorter {
  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];
    this.selectionSort(array, steps);
    return steps;
  }

  private selectionSort = (array: number[], steps: ArraySorterStep[]): void => {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) 
          minIndex = j;
        
        steps.push({ array: [...array], coloredIndices: { [j]: EColor.pomegranate, [minIndex]: EColor.pomegranate } });
      }

      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      steps.push({ array: [...array], coloredIndices: { [i]: EColor.pomegranate, [minIndex]: EColor.pomegranate } });
    }
  }
}


export class ShellSort implements IArraySorter {
  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];
    this.shellSort(array, steps);
    return steps;
  }

  private shellSort = (array: number[], steps: ArraySorterStep[]): void => {
    const n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i += 1) {
        const temp = array[i];
        let j;
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          array[j] = array[j - gap];
          steps.push({ array: [...array], coloredIndices: { [j]: EColor.pomegranate, [j - gap]: EColor.pomegranate } });
        }
        array[j] = temp;
        steps.push({ array: [...array], coloredIndices: { [j]: EColor.pomegranate } });
      }
    }
  }
}

export class TimSort implements IArraySorter {
  private runSize: number = 32;

  public compute = (array: number[]): ArraySorterStep[] => {
    let steps: ArraySorterStep[] = [];

    if (array.length % 2 == 0)
      this.runSize = array.length / 4;
    else
      this.runSize = array.length / 5;

    this.timSort(array, steps);
    return steps;
  }

  private timSort = (array: number[], steps: ArraySorterStep[]): void => {
    const n = array.length;
    for (let i = 0; i < n; i += this.runSize) {
      this.insertionSort(array, i, Math.min((i + 31), (n - 1)), steps);
    }

    for (let size = this.runSize; size < n; size = 2 * size) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = left + size - 1;
        const right = Math.min((left + 2 * size - 1), (n - 1));
        this.merge(array, left, mid, right, steps);
      }
    }
  }

  private insertionSort = (array: number[], left: number, right: number, steps: ArraySorterStep[]): void => {
    for (let i = left + 1; i <= right; i++) {
      const temp = array[i];
      let j = i - 1;
      while (array[j] > temp && j >= left) {
        array[j + 1] = array[j];
        steps.push({ array: [...array], coloredIndices: { [j + 1]: EColor.pomegranate, [j]: EColor.pomegranate } });
        j--;
      }
      array[j + 1] = temp;
      steps.push({ array: [...array], coloredIndices: { [j + 1]: EColor.pomegranate } });
    }
  }

  private merge = (array: number[], left: number, mid: number, right: number, steps: ArraySorterStep[]): void => {
    const len1 = mid - left + 1;
    const len2 = right - mid;
    const leftArray = Array(len1);
    const rightArray = Array(len2);
    for (let x = 0; x < len1; x++) {
      leftArray[x] = array[left + x];
    }
    for (let x = 0; x < len2; x++) {
      rightArray[x] = array[mid + 1 + x];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < len1 && j < len2) {
      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        steps.push({ array: [...array], coloredIndices: { [k]: EColor.pomegranate, [left + i]: EColor.pomegranate } });
        i++;
      } else {
        array[k] = rightArray[j];
        steps.push({ array: [...array], coloredIndices: { [k]: EColor.pomegranate, [mid + 1 + j]: EColor.pomegranate } });
        j++;
      }
      k++;
    }

    while (i < len1) {
      array[k] = leftArray[i];
      steps.push({ array: [...array], coloredIndices: { [k]: EColor.pomegranate, [left + i]: EColor.pomegranate } });
      k++;
      i++;
    }

    while (j < len2) {
      array[k] = rightArray[j];
      steps.push({ array: [...array], coloredIndices: { [k]: EColor.pomegranate, [mid + 1 + j]: EColor.pomegranate } });
      k++;
      j++;
    }
  }
}

