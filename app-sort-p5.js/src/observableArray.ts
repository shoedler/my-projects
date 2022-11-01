export type ObservableArrayActions<T> = {
  read: (index: number) => T;
  write: (index: number, value: T) => void;
}

export type ObservableArrayCommand<TReturns, TArray> = {
  name: string,
  action: (actions: ObservableArrayActions<TArray>) => Promise<TReturns>
}

export type ObservableArrayStats = {
  reads: number,
  writes: number,
  comparisons: number,
  swaps: number
}

export class ObservableArray<T> {
  private _array: HTMLElement[] = [];
  private _propertySelector: { name: string, converter: (rawType: string) => T};
  private _stats: ObservableArrayStats = {} as ObservableArrayStats;

  public get length(): number { return this._array.length; }

  constructor(
    domDivArray: HTMLDivElement[], 
    propertySelector: { name: string, converter: (rawType: string) => T}) {
    this._propertySelector = propertySelector;
    this._array = domDivArray
    this._stats = {} as ObservableArrayStats;
  }

  private read = (index: number): T => {
    this._stats.reads++;
    return this._propertySelector.converter((this._array[index] as any)[this._propertySelector.name] );
  }

  private write = (index: number, value: T): void => {
    this._stats.writes++;
    (this._array[index] as any)[this._propertySelector.name] = value.toString();
  }
  
  public command = async <TRet>(name: string, fn: (actions: ObservableArrayActions<T>) => Promise<TRet>): Promise<TRet> => {
    return fn({ read: this.read, write: this.write });
  }

  public compare = async (index1: number, op: '>' | '>=' | '<' | '<=' | '==' | '!=', index2: number): Promise<boolean> => {
    this._stats.comparisons++;
    return await this.command(`Compare ${index1} ${op} ${index2} `, async (actions) => {
      const value1 = actions.read(index1);
      const value2 = actions.read(index2);

      this._array[index1].className = 'bar-red';
      this._array[index2].className = 'bar-blue';
      await new Promise<void>((resolve) => setTimeout(() => { resolve(); }, 100) );
      this._array[index1].className = '';
      this._array[index2].className = '';
      await new Promise<void>((resolve) => setTimeout(() => { resolve(); }, 100) );
      
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
      await new Promise<void>((resolve) => setTimeout(() => { resolve(); }, 100) );
      
      const tmp = actions.read(index1);
      actions.write(index1, actions.read(index2));
      actions.write(index2, tmp);

      this._array[index1].className = 'bar-green';
      this._array[index2].className = 'bar-yellow';
      await new Promise<void>((resolve) => setTimeout(() => { resolve(); }, 100) );

      this._array[index1].className = '';
      this._array[index2].className = '';
      await new Promise<void>((resolve) => setTimeout(() => { resolve(); }, 100) );
    })
  }

}

export class ObservableBubbleSort<T> {
  public sort = async (array: ObservableArray<T>): Promise<void> => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (await array.compare(j, '>', j + 1)) {
          await array.swap(j, j + 1);
        }
      }
    }
  }
}