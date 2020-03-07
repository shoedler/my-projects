
let model;

let resolution = 50;
let grid = [0, 0];

let _tensor_inputs;
let _ys;

const _tensor_x = tf.tensor2d([
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1]
])

const _tensor_y = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
])


function setup() 
{
  createCanvas(window.innerWidth, window.innerHeight);

  /* Get grid dimensions */
  grid[0] = (width / 2) / resolution;
  grid[1] = (width / 2) / resolution;

  /* Create new sequential Model */
  model = tf.sequential();

  /* Create inputs for the Model*/
  let inputs = [];
  for ( let i = 0; i < grid[0]; i++)
  {
    for (let j = 0; j < grid[1]; j++)
    {
      let x1 = i / grid[0];
      let x2 = j / grid[1];
      inputs = [...inputs, [x1, x2]]
    }
  }

  _tensor_inputs = tf.tensor2d(inputs);

  /* Initialize result values (The ones we want to draw) with input values */
  _ys = _tensor_inputs.dataSync();

  /* Create hidden- & output nodes */
  let hidden = tf.layers.dense({
    inputShape: [2],
    units: 4,
    activation: 'sigmoid'
  })

  let output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  })

  model.add(hidden);
  model.add(output);

  /* Create Optimizer */
  const optimizer = tf.train.sgd(0.5);

  model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError'
  })

  /* Launch model training loop */
  setTimeout(10, trainModel());
}

function draw()
{
  background(53, 53, 53);

  /* Draw results */
  let index = 0;
  for (let i = 0; i < grid[0]; i++)
  {
    for (let j = 0; j < grid[1]; j++)
    {
      let color = _ys[index] * 255;
      let xPos = i * resolution;
      let yPos = j * resolution;

      fill(color);
      rect( xPos, yPos, resolution, resolution);

      fill(255, 255 - color, 255 - color);
      textAlign(CENTER, CENTER)
      text(nf(_ys[index], 1, 3), xPos + resolution / 2, yPos + resolution / 2);
      
      index++;
    }
  }
}

let trainModel = async() =>
{
  let result = await model.fit(_tensor_x, _tensor_y, { 
    shuffle: true,
    epochs: 10
  });

  //await tf.nextFrame()
  //console.log(result.history.loss[0]);

  _ys = await getPredictions(_tensor_inputs);

  trainModel();
}

let getPredictions = async(_tensor) =>
{
  let arr;
  await tf.tidy(() => 
  {
    /* Get Predictions */
    _tensor_out = model.predict(_tensor);
    arr = _tensor_out.dataSync();
  });

  return arr
}
