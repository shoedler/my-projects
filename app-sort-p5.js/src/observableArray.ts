import { CONFIG } from "./index";

export type ObservableArrayContext = {
  read: (index: number) => number;
  write: (index: number, value: number) => void;
  setClassName: (index: number, className: string) => void;
  pause: () => Promise<void>;
}

export type ObservableArrayCommand<TReturns> = {
  name: string,
  action: (actions: ObservableArrayContext) => Promise<TReturns>
}

export class ObservableArrayStats {
  public reads: number = 0;
  public writes: number = 0;
  public comparisons: number = 0;
  public swaps: number = 0;
}

export interface IObservableArraySorter {
  sort(array: ObservableArray): Promise<ObservableArrayStats>;
}

export class ObservableArray {
  private _array: HTMLElement[] = [];
  private _stats: ObservableArrayStats = {} as ObservableArrayStats;

  public get stats(): ObservableArrayStats { return this._stats; }
  public get length(): number { return this._array.length; }

  constructor(domDivArray: HTMLDivElement[]) {
    this._array = domDivArray
    this._stats = new ObservableArrayStats();
  }

  private pause = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

  private read = (index: number): number => {
    this._stats.reads++;
    return parseInt(this._array[index].style.height);
  }

  private write = (index: number, value: number): void => {
    this._stats.writes++;
    this._array[index].style.height = `${value}px`;
  }
  
  public command = async <TRet>(name: string, fn: (actions: ObservableArrayContext) => Promise<TRet>): Promise<TRet> => {
    this._array.forEach(div => div.className = "");
    return fn({ 
      read: this.read, 
      write: this.write,
      setClassName: (index: number, className: string) => this._array[index].className = className,
      pause: () => this.pause(CONFIG.delay)
    });
  }

  public compare = async (index1: number, op: '>' | '>=' | '<' | '<=' | '==' | '!=', index2: number): Promise<boolean> => {
    this._stats.comparisons++;
    return await this.command(`Compare ${index1} ${op} ${index2} `, async (actions) => {
      const value1 = actions.read(index1);
      const value2 = actions.read(index2);

      this._array[index1].className = 'bar-red';
      this._array[index2].className = 'bar-blue';

      await this.pause(CONFIG.delay);
      
      switch (op) {
        case '>':  return Promise.resolve(value1 >  value2);
        case '>=': return Promise.resolve(value1 >= value2);
        case '<':  return Promise.resolve(value1 <  value2);
        case '<=': return Promise.resolve(value1 <= value2);
        case '==': return Promise.resolve(value1 == value2);
        case '!=': return Promise.resolve(value1 != value2);
        default: throw new Error(`Unknown operator ${op}`);
      }
    })
  }

  public swap = async (index1: number, index2: number): Promise<void> => {
    this._stats.swaps++;
    await this.command(`Swap ${index1} and ${index2}`, async (actions) => {

      this._array[index1].className = 'bar-yellow';
      this._array[index2].className = 'bar-green';
      
      await this.pause(CONFIG.delay);
      
      const tmp = actions.read(index1);
      actions.write(index1, actions.read(index2));
      actions.write(index2, tmp);

      this._array[index1].className = 'bar-green';
      this._array[index2].className = 'bar-yellow';
      
      await this.pause(CONFIG.delay);
    })
  }

  public set = async (index: number, value: number): Promise<void> => {
    await this.command(`Set ${index} to ${value}`, async (actions) => {
      this._array[index].className = 'bar-yellow';
      actions.write(index, value);
      await this.pause(CONFIG.delay);
    })
  }

  public get = async (index: number): Promise<number> => {
    return await this.command(`Get ${index}`, async (actions) => {
      this._array[index].className = 'bar-red';
      const value = actions.read(index);
      await this.pause(CONFIG.delay);
      return value;
    })
  }
}