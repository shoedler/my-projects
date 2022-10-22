import { ArraySorterColorConfig, ArraySorterReturn, IArraySorter } from "./array";
import { EColor } from "./colors";

export class BubbleSort implements IArraySorter {
  private bi: number = 0;
  private bj: number = 0;

  public step = (array: number[]): ArraySorterReturn => {
    const coloredIndices: ArraySorterColorConfig = {};

    coloredIndices[this.bj] = EColor.pomegranate;

    if (this.bi < array.length) {
      if (this.bj < array.length - this.bi - 1) {
        if (array[this.bj] > array[this.bj + 1]) {
          let temp = array[this.bj];
          array[this.bj] = array[this.bj + 1];
          array[this.bj + 1] = temp;

          coloredIndices[this.bj] = EColor.greenSea;
          coloredIndices[this.bj + 1] = EColor.greenSea;
        }
        this.bj++;
      }
      else {
        this.bi++;
        this.bj = 0;
      }
    }

    return { array, coloredIndices };
  };
}

// Merge Sort implementation, which is steppable (Even the merging part)
export class MergeSort implements IArraySorter {

  merge_Arrays = (left_sub_array: number[], right_sub_array: number[]): number[] => {
    let array = []
    while (left_sub_array.length && right_sub_array.length) {
       if (left_sub_array[0] < right_sub_array[0]) {
          array.push(left_sub_array.shift())
       } else {
          array.push(right_sub_array.shift())
       }
    }
    return [ ...array, ...left_sub_array, ...right_sub_array ]
 }

  merge_sort = (unsorted_Array: number[]): number[] => {
      const middle_index = unsorted_Array.length / 2
      if(unsorted_Array.length < 2) {
        return unsorted_Array
      }
      const left_sub_array = unsorted_Array.splice(0, middle_index)
      return this.merge_Arrays(this.merge_sort(left_sub_array),this.merge_sort(unsorted_Array))
  }

  public step = (array: number[]): ArraySorterReturn => {

    return { array: this.merge_sort(array), coloredIndices: {} };
  }
}

// export class MergeSort implements IArraySorter {
//   private _tempArr: number[] = [];
//   private _left: number = 0;
//   private _right: number = 0;
//   private _mid: number = 0;
//   private _subArrSize: number = 0;
//   private _isMerging: boolean = false;

//   public init = (array: number[]): void => {
//     this._tempArr = new Array(array.length);
//     this._left = 0;
//     this._right = 0;
//     this._mid = 0;
//     this._subArrSize = 1;
//   }

//   public step = (array: number[]): ArraySorterReturn => {    
//     const coloredIndices: ArraySorterColorConfig = {};

//     if (this._subArrSize < array.length) {
//       this._left = 0;
//       while (this._left < array.length) {
//         this._mid = Math.min(this._left + this._subArrSize - 1, array.length - 1);
//         this._right = Math.min(this._left + 2 * this._subArrSize - 1, array.length - 1);

//         this.merge(array, this._left, this._mid, this._right, coloredIndices);

//         this._left = this._right + 1;
//       }

//       this._subArrSize *= 2;
//     }

//     return { array, coloredIndices };
//   };

//   private merge = (array: number[], left: number, mid: number, right: number, coloredIndices: ArraySorterColorConfig): void => {
//     let i = left;
//     let j = mid + 1;
//     let k = left;

//     while (i <= mid && j <= right) {
//       if (array[i] < array[j]) {
//         this._tempArr[k++] = array[i++];
//         coloredIndices[k] = EColor.greenSea;
//       }
//       else {
//         this._tempArr[k++] = array[j++];
//         coloredIndices[k] = EColor.pomegranate;
//       }
//     }

//     while (i <= mid) {
//       this._tempArr[k++] = array[i++];
//       coloredIndices[k] = EColor.greenSea;
//     }

//     while (j <= right) {
//       this._tempArr[k++] = array[j++];
//       coloredIndices[k] = EColor.pomegranate;
//     }

//     for (i = left; i <= right; i++) {
//       array[i] = this._tempArr[i];
//     }
//   }
// }