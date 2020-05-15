let maxheight = 0;
let minheight = 0;

let data = [];

let sortStepAmount = 1000;

let bi = 0;
let bj = 0;

function setup() 
{
  createCanvas(window.innerWidth, window.innerHeight);

  maxheight = height * 0.7;
  minheight = height * 0.05;

  /* create data */
  let step = maxheight / width;
  for (let i = 0; i < width; i++)
  {
    data.push(step * i);
  }

  /* shuffle data */
  let i = data.length, temp, irand;
  while (0 !== i) 
  {
    /* pick a remaining element */
    irand = Math.floor(Math.random() * i);
    i -= 1;

    /* swap it with the current element */
    temp = data[i];
    data[i] = data[irand];
    data[irand] = temp;
  }
}

function draw()
{
  background(53, 53, 53);
  translate(0, height);
  stroke(255);

  /* bubble sort */
  for (let n = 0; n < sortStepAmount; n++)
  {
    data = bubbleOnce(data);
  }

  /* draw data */
  for (let i = 0; i < data.length; i++)  { line(i, -data[i] - minheight, i, -minheight)  };
}

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


