let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let lines = [];
let MBDMemory = [];
let SBDMemory = [];

let reader;


function preload() {
  /* The loadStrings function returns an array, indexed by thelines of the loaded file */
  lines = loadStrings("https://raw.githubusercontent.com/WashirePie/CFX.Web/master/%2BDOC/RAW/mnemonic.mnc")//,[callback],[errorCallback])
}


function setup() {
  createCanvas(wWidth, wHeight);
  reader = new Interpreter;
}


function draw() {
  background(51);

  for (let line of lines) {
    let MBD = reader.getMultiBitDefinitions(line);
    if (MBD != null) {MBDMemory.push(MBD);}

    let SBD = reader.getSingleBitDefinitions(line);
    if (SBD != null) {SBDMemory.push(SBD);}
  }

  console.log(MBDMemory);
  console.log(SBDMemory);

  noLoop();
}
