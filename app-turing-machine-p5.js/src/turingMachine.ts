export type char =
  | ' '
  | '+'
  | '-'
  | '*'
  | '/'
  | '|'
  | '.'
  | ';'
  | ':'
  | '#'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type Dir = 'l' | 'r' | 'n';

export type Cmd = { current: string; read: char; next: string; write: char; move: Dir };

export type RuleSet = { [key: string]: Cmd[] };

export type Tape = { [key: number]: char };

export type Program = { initialState: string; acceptStates: string[]; commands: Cmd[] };

export class TuringMachine {
  static DEFAULT_CHAR: char = '#';
  static MAX_STEPS: number = 1e3;

  public tapePtr = 0;
  public stepsCounter = 0;
  public currentState: string = '';
  public acceptStates: string[] = [];

  public tape: Tape = {};

  private _commands: Cmd[];
  public get commands(): Cmd[] {
    return this._commands;
  }

  private _rules: RuleSet = {};
  public get rules(): RuleSet {
    return this._rules;
  }

  private readCell = (): char => {
    if (this.tape[this.tapePtr] == undefined) {
      this.tape[this.tapePtr] = TuringMachine.DEFAULT_CHAR;
    }
    return this.tape[this.tapePtr];
  };

  private writeCell = (c: char) => {
    this.tape[this.tapePtr] = c;
  };

  private moveHead = (d: Dir) => (this.tapePtr += d == 'l' ? -1 : d == 'r' ? 1 : 0);

  public exec = () => {
    const read = this.readCell();
    const stateRules = this._rules[this.currentState];
    const possibleTransitions = stateRules.filter((cmd) => cmd.read == read);

    if (possibleTransitions.length > 1)
      throw new Error(
        `[State=${this.currentState}/Read=${read}] More than one legal transition available:\n ${possibleTransitions
          .map((m) => m.next + ' ' + m.write)
          .join('\n')}`
      );
    if (possibleTransitions.length <= 0)
      throw new Error(`[State=${this.currentState}/Read=${read}] No transitions available`);

    const transition = possibleTransitions[0];

    this.writeCell(transition.write);
    this.moveHead(transition.move);
    this.currentState = transition.next;

    this.stepsCounter++;

    if (this.acceptStates.includes(this.currentState)) return `Accept (${this.currentState})`;

    if (this.stepsCounter >= TuringMachine.MAX_STEPS)
      throw new Error(`[State=${this.currentState}/Read=${read}] Max Steps reached`);

    return 'Running...';
  };

  public static stringToTape = (word: string): Tape => {
    const tape: Tape = {};
    word.split('').forEach((c, i) => (tape[i] = c as char));
    return tape;
  };

  public print = (): string => {
    const tapeIndices = Object.keys(this.tape).map((key) => parseInt(key, 10));
    const tapeMax = Math.max(...tapeIndices);
    const tapeMin = Math.min(...tapeIndices);

    let result: char[] = [];

    for (let i = tapeMin; i < tapeMax; i++) {
      if (this.tape[i] == undefined) throw new Error('Cannot be undefined - error in Turing Machine class logic');

      result.push(this.tape[i]);
    }

    return result.join('');
  };

  constructor(input: Tape, prog: Program) {
    this.tape = input;
    this.currentState = prog.initialState;
    this.acceptStates = prog.acceptStates;

    this._commands = prog.commands;

    this._commands.forEach((cmd) =>
      this._rules[cmd.current] == undefined ? (this._rules[cmd.current] = [cmd]) : this._rules[cmd.current].push(cmd)
    );
  }
}
