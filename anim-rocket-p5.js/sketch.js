let B = null;
let R = null;

const Y_AXIS = 1;

let GUI;


function setup() 
{
  createCanvas(window.innerWidth, window.innerHeight);
  B = new Background();
  R = new Rocket();

  console.log(R);
  
  GUI = new dat.GUI(); 
}


function draw() 
{
  B.render();
  R.render();

}