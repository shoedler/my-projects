import p5 from 'p5';
import { Cmd, Program, TuringMachine } from './turingMachine';

let tm: TuringMachine = null;

const cmds: Cmd[] = [
  { current: 'qi', read: '#', next: 'q0', write: '3', move: 'r' },
  { current: 'q0', read: '#', next: 'q1', write: 'I', move: 'r' },

  { current: 'q1', read: '#', next: 'q2', write: 'I', move: 'r' },
  { current: 'q2', read: '#', next: 'q3', write: 'I', move: 'r' },
  { current: 'q3', read: '#', next: 'q4', write: 'I', move: 'r' },
  { current: 'q4', read: '#', next: 'q5', write: 'I', move: 'r' },
  { current: 'q5', read: '#', next: 'r0', write: '-', move: 'l' },

  { current: 'r0', read: 'I', next: 'r0', write: 'I', move: 'l' },
  { current: 'r0', read: '-', next: 'r0', write: '-', move: 'l' },
  { current: 'r0', read: '9', next: 'r1', write: '8', move: 'r' },
  { current: 'r0', read: '8', next: 'r1', write: '7', move: 'r' },
  { current: 'r0', read: '7', next: 'r1', write: '6', move: 'r' },
  { current: 'r0', read: '6', next: 'r1', write: '5', move: 'r' },
  { current: 'r0', read: '5', next: 'r1', write: '4', move: 'r' },
  { current: 'r0', read: '4', next: 'r1', write: '3', move: 'r' },
  { current: 'r0', read: '3', next: 'r1', write: '2', move: 'r' },
  { current: 'r0', read: '2', next: 'r1', write: '1', move: 'r' },
  { current: 'r0', read: '1', next: 'f0', write: '#', move: 'r' },

  { current: 'f0', read: 'I', next: 'f0', write: 'I', move: 'r' },
  { current: 'f0', read: '-', next: 'f0', write: '-', move: 'r' },
  { current: 'f0', read: '#', next: 'f1', write: '#', move: 'l' },
  { current: 'f1', read: '-', next: 'f', write: '#', move: 'r' },

  { current: 'r1', read: 'I', next: 'r1', write: 'I', move: 'r' },
  { current: 'r1', read: '-', next: 'r1', write: '-', move: 'r' },
  { current: 'r1', read: '#', next: 'q1', write: 'I', move: 'r' },
];

const sketch = (p: p5) => {
  p.setup = () => {
    console.log('🚀 - Setup initialized - P5 is running');
    //p.createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9);

    const prog: Program = {
      commands: cmds,
      acceptStates: ['f'],
      initialState: 'qi',
    };

    const word = TuringMachine.stringToTape('#');

    tm = new TuringMachine(word, prog);

    while (tm.exec() == 'Running...') {
      console.log(tm.print());
    }
    console.log(tm.print());
    console.log(tm.stepsCounter);

    const automaDiv = document.getElementById('automa-div');

    Object.entries(tm.rules).forEach((entry) => {
      entry[1].forEach((cmd) => {
        const spanFrom = document.createElement('span');
        spanFrom.innerHTML = cmd.current;
        const spanTo = document.createElement('span');
        spanTo.innerHTML = cmd.next;
        const spanRead = document.createElement('span');
        spanRead.innerHTML = cmd.read;
        const spanWrite = document.createElement('span');
        spanWrite.innerHTML = cmd.write;
        const spanDir = document.createElement('span');
        spanDir.innerHTML = cmd.move.toUpperCase();
        const div = document.createElement('div');
        div.appendChild(spanFrom);
        div.appendChild(spanRead);
        div.appendChild(spanWrite);
        div.appendChild(spanTo);
        div.appendChild(spanDir);
        automaDiv.appendChild(div);
      });
    });
  };

  // p.draw = () => {
  //   p.background(p.color(EColor.midnightBlue))

  //   p.fill(EColor.silver)
  //   p.strokeWeight(0)
  // }
};

export const app = new p5(sketch);

app.mousePressed = () => {};
app.mouseDragged = () => {};
app.mouseReleased = () => {};
