let D;

function setup() 
{
  createCanvas(window.innerWidth, window.innerHeight);
  D = new Sort(height * 0.7, height * 0.05);
}


function draw()
{
  background(53, 53, 53);
  D.cycle();
}


class Sort
{
  constructor(maxh, minh)
  {
    this.maxHeight = maxh;
    this.minHeight = minh;
    this.data = [];
    
    this.sortCycles = 1;
    this.dataWidth = 50;

    this.sortingFunction = (arr) => { return bubbleOnce(arr); }

    /* Create data */
    let step = this.maxHeight / width;
    for (let i = 0; i < width; i++) 
    {
      if (i % this.dataWidth == 0) 
      {
        this.data.push(step * i);
      }
    }

    /* Initial shuffle */
    this.shuffle();
  }


  shuffle = () =>
  {
    /* Shuffle data */
    let i = this.data.length, temp, irand;

    while (0 !== i) 
    {
      /* Pick a remaining element */
      irand = Math.floor(Math.random() * i);
      i -= 1;

      /* Swap it with the current element */
      temp = this.data[i];
      this.data[i] = this.data[irand];
      this.data[irand] = temp;
    }
  }


  draw = () =>
  {
    push();
    translate(0, height - this.minHeight);
    stroke(0);
    fill(255);

    /* Draw data */
    for (let i = 0; i < this.data.length; i++) 
    { 
      rect(i * this.dataWidth, 0, this.dataWidth, -this.data[i]);
    }

    pop();
  }


  cycle = () =>
  {
    /* Sort sort */
    for (let n = 0; n < this.sortCycles; n++)
    {
      this.data = this.sortingFunction(this.data);
    }

    this.draw();
  }
}

let bi = 0;
let bj = 0;
let bubbleOnce = (arr) =>
{
  if (bi < arr.length)
  {
    if (bj < arr.length - bi - 1)
    {
      if (arr[bj] > arr[bj + 1]) 
      {
        let temp = arr[bj];
        arr[bj] = arr[bj + 1];
        arr[bj + 1] = temp;
      }
      bj++;      
    }
    else
    {
      bi++;
      bj = 0;
    }
  }

  return arr;  
}