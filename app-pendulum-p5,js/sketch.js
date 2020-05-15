let SIM = null;
let gui;

let pendulumOrigin;
let graphOrigin;


// [ ] Fix Pendulum population issues    
// [ ] Fix frameRate display in dat.GUI to only DISPLAY the value 
// [ ] Fix dat.GUI -> Better labels and fixed width   
// [x] Set spacing of graph to seconds
// [ ] Make label generation of graph (vert) only on spacing update, not every frame

function setup()
{
    createCanvas(window.innerWidth, window.innerHeight); 
    
    pendulumOrigin = createVector(width / 2, height * 0.25);
    graphOrigin = createVector(width / 2, height * 0.75);

    SIM = new Simulation(5);

    initializeControls();
}


function draw() 
{
    background(53);

    SIM.run();
    SIM.render();
}

let initializeControls = () =>
{
    gui = new dat.GUI();
    
    let fR = gui.addFolder("Restart Options");
    fR.add(SIM, 'reset');
    fR.add(SIM, 'pendulumStartingAngle', Math.PI / 16, Math.PI / 1.001, 0.01);
    
    let fS = gui.addFolder("Simulation");
    fS.add(SIM, 'frameRate').listen();
    fS.add(SIM, 'cyclesPerFrame', 0, 10, 1);
    
    let fP = gui.addFolder("Pendulum");
    fP.add(SIM, 'pendulumAmount', 1, 20, 1);
    fP.add(SIM, 'pendulums', 1, 20, 1);
    fP.add(SIM, 'pendulumLengthDifference', 2, 20, 1);
    fP.add(SIM, 'pendulumAngularVelocityDampening', 0.95, 1, 1e-5);
    fP.add(SIM, 'pendulumGravityConstant', 0.1, 2, 0.1);
    fP.add(SIM, 'pendulumBallSize', 3, 40, 1);
    fP.add(SIM, 'pendulumCircumference');
    
    let fG = gui.addFolder("Graphing");
    fG.add(SIM, 'graphScrollSpeed', 0.5, 10, 0.5);
    fG.add(SIM, 'graphDivisions', 2, 16, 2);
    fG.add(SIM, 'graphCaptureRate', 1, 20, 1);
    fG.add(SIM, 'graphSmoothing');
    fG.add(SIM, 'graphLabelSine');
    fG.add(SIM, 'graphLabelAngle');

    let fC = gui.addFolder('Scale');
    fC.add(SIM, 'scaleAngle', 0, TWO_PI, QUARTER_PI / 4);
    fC.add(SIM, 'scaleShow');
    fC.add(SIM, 'scaleDrawSine');
    fC.add(SIM, 'scaleDrawCosine');
}