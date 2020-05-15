let flock;  /* Global Flock reference */
let gui;    /* Global GUI reference */

let cBoid;
let cBoidStroke;
let cFocused;
let cFocusedStroke;

const framesPerSecond = 60;
const frameRange = 20;
let meanFrameRate = framesPerSecond;
let frameRateSum = 0;

let benchmarkSum = 0;
let benchmarkStart = 100;
let benchmarkRange = 1000;


function setup()
{
  createCanvas(window.innerWidth, window.innerHeight);
  textFont('consolas');

  /* Define Boid colors */
  cBoid          = color(100, 100, 100, 100);
  cBoidStroke    = color(100, 100, 100);
  cFocused       = color(233, 30, 99, 100);
  cFocusedStroke = color(233, 30, 99);

  /* Instantiate Flock */
  flock = new Flock(400);

  /* Setup dat.GUI Overlay */
  loadGUI();

  /* Highlight one Boid */
  window.foo = flock.boids[0];  foo.highlight();
}


function draw()
{
  frameRate(framesPerSecond);
  benchmark();
  controls();
  flock.nextFrame();
}


/**
 * @summary Draws GUI overlay
 */
const controls = () =>
{
  background(21);

  /* Get average frameRate */
  if (frameCount % frameRange != 0) 
  { 
    frameRateSum += frameRate(); 
  }
  else 
  {
    meanFrameRate = frameRateSum / frameRange;
    frameRateSum = 0;
  }

  fill(255);
  noStroke();
  textSize(15);
  text(nfc(meanFrameRate, 2), 10, 25);
  textSize(8)
  text(frameCount, 10, 38);
}

/**
 * @summary Plots a line from base to tip
 * @param {p5Vector} vec1 Base
 * @param {p5Vector} vec2 Tip
 * @param {p5Color} color Line Color
 * @param {number} [mult1=1] Scalar multiplier base
 * @param {number} [mult2=1] Scalar multiplier tip
 */
const visualize = (vec1, vec2, color, mult1 = 1, mult2 = 1) =>
{
  stroke(color);

  let v1 = vec1.copy();
  let v2 = vec2.copy();

  v1.mult(mult1);
  v2.mult(mult2)

  push();
    translate(v1.x, v1.y);
    line(0, 0, v2.x, v2.y);
  pop();
}


/**
 * @summary Logs the mean frameRate over a specified frame range 
 */
const benchmark = () =>
{
  /* Log average frameRate for frames benchmarkStart to benchmarkEnd */
  if (frameCount >= benchmarkStart && frameCount <= benchmarkStart + benchmarkRange) 
  {
    benchmarkSum += frameRate();
  }
  else if (benchmarkSum > 0 && frameCount > benchmarkStart + benchmarkRange)
  {
    console.log(`Benchmark results`);
    console.table({ startFrame: benchmarkStart, endFrame: benchmarkStart + benchmarkRange, frameRange: benchmarkRange, result: benchmarkSum / benchmarkRange});
    benchmarkSum = 0;
    benchmarkStart = frameCount;
  }
}

/**
 * @summary Adds the dat.GUI Overlay to control Flock parameters
 * @link https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage Guide
 * @link https://github.com/dataarts/dat.gui GitHub
 * @author Google Data Arts Team
 */
const loadGUI = () =>
{
  gui = new dat.GUI();

  let fPerception = gui.addFolder("Boid Perception");
  let fMovement = gui.addFolder("Boid Movement");
  let fVisual = gui.addFolder("Visual Properties");
  let fDebug = gui.addFolder("Debug Aids");

  let some = Math.ceil(flock.boids.length * 0.1);


  /* Perception folder */

  /* FOV Controller: event onChange shows a FOV overlay on 'some' boids */
  let fovController = fPerception.add(flock, 'fieldOfView', 5, 359, 1)
  
  fovController.onChange(() => 
  { 
    flock.setPopulationProperty('fieldOfView'); 
    for (let i = 0; i < some; i++) { flock.boids[i].showFieldOfView = true; } 
  });

  fovController.onFinishChange(() => 
  { 
    for (let i = 0; i < some; i++) { flock.boids[i].showFieldOfView = false; } 
  });

  /* Alignment radius Controller: OnChange shows a FOV overlay on 'some' boids */
  let arController = fPerception.add(flock, 'alignmentRadius', 5, Math.floor(width / 2.5), 1);

  arController.onChange(() => 
  { 
    flock.setPopulationProperty('alignmentRadius'); 
    for (let i = 0; i < some; i++) { flock.boids[i].showAlignmentFieldOfView = true; } 
  });

  arController.onFinishChange(() => 
  { 
    if (!flock.showAlignmentFieldOfView) for (let i = 0; i < some; i++) { flock.boids[i].showAlignmentFieldOfView = false; } 
  });

  /* Alignment radius Controller: OnChange shows a FOV overlay on 'some' boids */
  let crController = fPerception.add(flock, 'cohesionRadius', 5, 400, 1);

  crController.onChange(() => 
  { 
    flock.setPopulationProperty('cohesionRadius'); 
    for (let i = 0; i < some; i++) { flock.boids[i].showCohesionFieldOfView = true; } 
  });

  crController.onFinishChange(() => 
  { 
    if (!flock.showCohesionFieldOfView) for (let i = 0; i < some; i++) { flock.boids[i].showCohesionFieldOfView = false; } 
  });

  /* Separation radius Controller: OnChange shows a FOV overlay on 'some' boids */
  let srController = fPerception.add(flock, 'separationRadius', 5, Math.floor(width / 3), 1);

  srController.onChange(() => 
  { 
    flock.setPopulationProperty('separationRadius'); 
    for (let i = 0; i < some; i++) { flock.boids[i].showSeparationFieldOfView = true; } 
  });

  srController.onFinishChange(() => 
  { 
    if (!flock.showSeparationFieldOfView) for (let i = 0; i < some; i++) { flock.boids[i].showSeparationFieldOfView = false; } 
  });


  /* Movement folder */

  /* Alignment max force Controller: OnChange shows vectors on 'some' boids */
  let mfaController = fMovement.add(flock, 'maxForceAlignment', 0.001, 0.1, 0.001);

  mfaController.onChange(() => 
  { 
    flock.setPopulationProperty('maxForceAlignment'); 
    for (let i = 0; i < some; i++) { flock.boids[i].showAlignmentVector = true; } 
  });

  mfaController.onFinishChange(() => 
  { 
    if (!flock.showAlignmentVector) for (let i = 0; i < some; i++) { flock.boids[i].showAlignmentVector = false; } 
  });

  /* Cohesion max force Controller: OnChange shows vectors on 'some' boids */
  let mfcController = fMovement.add(flock, 'maxForceCohesion', 0.001, 0.1, 0.001);

  mfcController.onChange(() => 
  { 
    flock.setPopulationProperty('maxForceCohesion'); 
    for (let i = 0; i < some; i++) { flock.boids[i].showCohesionVector = true; } 
  });

  mfcController.onFinishChange(() => 
  { 
    if (!flock.showCohesionVector) for (let i = 0; i < some; i++) { flock.boids[i].showCohesionVector = false; } 
  });

  /* Separation max force Controller: OnChange shows vectors on 'some' boids */
  let mfsController = fMovement.add(flock, 'maxForceSeparation', 0.001, 0.1, 0.001);
  mfsController.onChange(() => 
  { 
    flock.setPopulationProperty('maxForceSeparation'); 
    for (let i = 0; i < some; i++) { flock.boids[i].showSeparationVector = true; } 
  });

  mfsController.onFinishChange(() => 
  { 
    if (!flock.showSeparationVector) for (let i = 0; i < some; i++) { flock.boids[i].showSeparationVector = false; } 
  });

  (fMovement.add(flock, 'weightSeparation', 0.1, 1, 0.1)).onChange(() => { flock.setPopulationProperty('weightSeparation') });
  (fMovement.add(flock, 'weightAlignment', 0.1, 1, 0.1)).onChange(() => { flock.setPopulationProperty('weightAlignment') });
  (fMovement.add(flock, 'weightCohesion', 0.1, 1, 0.1)).onChange(() => { flock.setPopulationProperty('weightCohesion') });
  (fMovement.add(flock, 'maxVelocity', 0.5, 10, 0.1)).onChange(() => { flock.setPopulationProperty('maxVelocity') });


  /* Visual Properties folder */

  (fVisual.add(flock, 'boidSize', 0.1, 20, 0.1)).onChange(() => { flock.setPopulationProperty('boidSize') });


  /* Debug Aids folder */

  (fDebug.add(flock, 'showSeparationVector')).onChange(() => { flock.setPopulationProperty('showSeparationVector') });
  (fDebug.add(flock, 'showSeparationFieldOfView')).onChange(() => { flock.setPopulationProperty('showSeparationFieldOfView') });
  (fDebug.add(flock, 'showAlignmentVector')).onChange(() => { flock.setPopulationProperty('showAlignmentVector') });
  (fDebug.add(flock, 'showAlignmentFieldOfView')).onChange(() => { flock.setPopulationProperty('showAlignmentFieldOfView') });
  (fDebug.add(flock, 'showCohesionVector')).onChange(() => { flock.setPopulationProperty('showCohesionVector') });
  (fDebug.add(flock, 'showCohesionFieldOfView')).onChange(() => { flock.setPopulationProperty('showCohesionFieldOfView') });
}

