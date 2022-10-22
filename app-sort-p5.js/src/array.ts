import p5 from "p5";
import { EColor } from "./colors";

export type ArraySorterColorConfig = { [key: number]: EColor}
export type ArraySorterReturn = { array: number[], coloredIndices: ArraySorterColorConfig }
export interface IArraySorter {
  init?: (array: number[]) => void;
  step: (array: number[]) => ArraySorterReturn
}

export class ArrayVisualisation {
  private _p: p5 = null;
  public set p(value: p5) { this._p = value; }
  public get p() { return this._p; }

  // Config
  private _bgColor = EColor.midnightBlue;
  private _fgColor = EColor.silver;
  private _textWidthFactor = 0.63; 
  // EOConfig

  public get usableWidth() {return this._p.width * 0.8; }
  public get leftAndRightMargin() { return (this._p.width - this.usableWidth) / 2; }

  public get usableHeight() { return this._p.height * 0.8; }
  public get topAndBottomMargin() { return (this._p.height - this.usableHeight) / 2; }

  public get cellWidth() { return this.usableWidth / this._size; }

  private _arr: number[] = []
  private _currentColorConfig: ArraySorterColorConfig = {};
  private _size: number;
  public get size(): number { return this._size; }

  constructor(size: number) {
    this._size = size;
  }

  public execSortOnce = (sorter: IArraySorter): void => {
    const r = sorter.step(this._arr);
    this._arr = r.array;
    this._currentColorConfig = r.coloredIndices;
  }

  public init = (sorter: IArraySorter): void => {
    // Initialize Array
    this._arr = [];
    for (let i = 0; i < this._size; i++) 
      this._arr.push(i);

    // Initialize Sorter, if it has an init method
    if (sorter.init) 
      sorter.init(this._arr);
  }
    
  public shuffle = (): void => {
    this._arr = this._arr.sort(() => Math.random() - 0.5)
  }

  public draw = () => {
    this._p.background(this._bgColor);

    this._p.textAlign(this._p.CENTER, this._p.CENTER);
    this._p.textSize(this.cellWidth * this._textWidthFactor);
    this._p.strokeWeight(2)

    this._arr.forEach((el, i) => {
      const cellHeight = this.usableHeight / this._size * el;
      
      this._p.stroke(this._bgColor)

      // Use color config if available
      if (this._currentColorConfig[i] !== undefined)
        this._p.fill(this._currentColorConfig[i]);
      else
        this._p.fill(this._fgColor)

      // Draw boxes
      this._p.rect(
        this.leftAndRightMargin + this.cellWidth * i, 
        this.topAndBottomMargin + this.usableHeight,
        this.cellWidth,
        -cellHeight)
  
      // Draw indices labels
      this._p.text(i, 
        this.leftAndRightMargin + this.cellWidth * i + (this.cellWidth / 2), 
        this.topAndBottomMargin + this.usableHeight + (this.cellWidth / 2))

      this._p.fill(this._bgColor)
      this._p.stroke(this._fgColor)

      // Draw value text
      this._p.text(el, 
        this.leftAndRightMargin + this.cellWidth * i + (this.cellWidth / 2), 
        this.topAndBottomMargin + this.usableHeight - (cellHeight / 2))
    })
  }
}