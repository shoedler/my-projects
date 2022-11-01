// import p5 from "p5";
// import { EColor } from "./colors";

// export type ArrayEngineColorMap = { [key: number]: EColor}

// export interface IArraySorter {
//   init?: (array: number[]) => void;
//   compute: (array: number[]) => SorterFrame<number>[]
// }

// export class ArrayEngine {
//   private _p: p5 = null;
//   public get p() { return this._p; }

//   private _bgColor = EColor.midnightBlue;
//   private _fgColor = EColor.silver;
//   private _textWidthFactor = 0.63; 

//   public get usableWidth() {return this._p.width * 0.8; }
//   public get leftAndRightMargin() { return (this._p.width - this.usableWidth) / 2; }

//   public get usableHeight() { return this._p.height * 0.8; }
//   public get topAndBottomMargin() { return (this._p.height - this.usableHeight) / 2; }

//   public get cellWidth() { return this.usableWidth / this._size; }

//   private _computedSteps: SorterFrame<number>[] = [];
//   private _stepIndex = 0;
//   private _size: number;
//   public get size(): number { return this._size; }


//   constructor(size: number, p: p5) {
//     this._size = size;
//     this._p = p;
//   }

//   public initWith = (sorter: SorterBase<number>): void => {
//     this._computedSteps = []
    
//     // Initialize Array
//     let array = [];
//     for (let i = 0; i < this._size; i++) 
//       array.push(i);

//     array = array.sort(() => Math.random() - 0.5)
//     this._computedSteps = sorter.sort(array);

//     console.log(`Computed ${this._computedSteps.length} steps, ${sorter.comparisons} comparisons, ${sorter.swaps} swaps`);
//   }

//   public draw = () => {
//     this._p.background(this._bgColor);

//     if (!this._computedSteps.length) {
//       this._p.textAlign(this._p.CENTER, this._p.CENTER);
//       this._p.textSize(32);
//       this._p.fill(this._fgColor);
//       this._p.text("No Sorter Initialized", this._p.width / 2, this._p.height / 2);
//       return;
//     }

//     const array = this._computedSteps[this._stepIndex].array;
//     const coloredIndices = this._computedSteps[this._stepIndex].cmap;

//     this._p.textAlign(this._p.CENTER, this._p.CENTER);
//     this._p.textSize(this.cellWidth * this._textWidthFactor);
//     this._p.strokeWeight(2)

//     array.forEach((el, i) => {
//       const cellHeight = this.usableHeight / this._size * el;
      
//       this._p.stroke(this._bgColor)

//       // Use color config if available
//       if (coloredIndices[i] !== undefined)
//         this._p.fill(coloredIndices[i]);
//       else
//         this._p.fill(this._fgColor)

//       // Draw boxes
//       this._p.rect(
//         this.leftAndRightMargin + this.cellWidth * i, 
//         this.topAndBottomMargin + this.usableHeight,
//         this.cellWidth,
//         -cellHeight)
  
//       // Draw indices labels
//       this._p.text(i, 
//         this.leftAndRightMargin + this.cellWidth * i + (this.cellWidth / 2), 
//         this.topAndBottomMargin + this.usableHeight + (this.cellWidth / 2))

//       this._p.fill(this._bgColor)
//       this._p.stroke(this._fgColor)

//       // Draw value text
//       this._p.text(el, 
//         this.leftAndRightMargin + this.cellWidth * i + (this.cellWidth / 2), 
//         this.topAndBottomMargin + this.usableHeight - (cellHeight / 2))
//     })

//     if (this._stepIndex < this._computedSteps.length - 1)
//       this._stepIndex++;
//   }
// }