let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let CurrentModule;
let CurrentNetwork;

let Reader;
let Data;

function preload() {

  /* The loadStrings function returns an array, indexed by the lines of the loaded file
  syntax: loadStrings(filename,callback,errorCallback)*/
  Data = new Resource(loadStrings("https://raw.githubusercontent.com/WashirePie/CFX.Web/master/%2BDOC/RAW/mnemonic.mnc"));
  Reader = new Interpreter;
}


function setup() {
  createCanvas(wWidth, wHeight);
}


function draw() {
  background(51);

  getDefinitions(Data);
  getLogic(Data);
  analyzeResults(Data);

  let testSearch2 = Data.query("search_bitWriteOperations", Data.getBit("REQUAL"));
  let testSearch = Data.query("search_bitReadOperations", Data.getBit("REQUAL"));

  console.log(testSearch);
  console.log(testSearch2);

  noLoop();
}


function getDefinitions(source) {
  /* Get all definitions in the current file */
  console.log("Getting definitions...");
  for (let line of source.sourceLines) {
    /* Check if line contains a multi bit definition */
    let MBD = Reader.getMultiBitDefinitions(line);
    if (MBD != null) {source.MBDMemory.push(MBD);}

    /* Check if line contains a single bit definition */
    let SBD = Reader.getSingleBitDefinitions(line);
    if (SBD != null) {source.SBDMemory.push(SBD);}

    /* Check if line contains a single bit definition */
    let PRGNBR = Reader.getProgramNumberDefinition(line);
    if (PRGNBR != null) {source.PRGModules.push(PRGNBR);}
  }
  console.log("Finished.");
  console.log("");
}


function getLogic(source) {
  /* Get all logic events in the whole file */
  console.log("Analyzing logic...");
  let lines = source.sourceLines;
  for (let i = 0; i < lines.length; i++) {
    /* Check if the current module changed, add additional Info to Module */
    let MODULE = Reader.updateCurrentModule(lines[i], source.PRGModules);
    if (MODULE != null) {CurrentModule = MODULE;}

    /* Check if the current network changed */
    let NETWORK = Reader.getCurrentNetwork(lines[i]);
    if (NETWORK != null) {CurrentNetwork = NETWORK;}

    /* If both CurrentNetwork & CurrentModule aren't null, we can begin to check
    for operations */
    if (CurrentModule != null && CurrentNetwork != null) {
      let op = null;
      /* Bitwise operations */
      op = Reader.getReadBitOperation(lines[i]);
      if (op != null) {source.bitReadOperations.push([op, CurrentModule, CurrentNetwork]);}
      op = Reader.getWriteBitOperation(lines[i]);
      if (op != null) {source.bitWriteOperations.push([op, CurrentModule, CurrentNetwork]);}
      /* Instructions */
      op = Reader.getInstructionOperations(lines[i]);
    }
  }
  console.log("-- Updated Modules:");
  console.log(source.PRGModules);
  console.log("-- Found bitwise Read operations:");
  console.log(source.bitReadOperations);
  console.log("-- Found bitwise Write operations:");
  console.log(source.bitWriteOperations);
  console.log("Finished.");
  console.log("");
}

function analyzeResults(source) {
  /* Check if all defined programs appear in the logic */
  console.log("Analyzing Results...");
  let unused = [];
  for (let i = 0; i < source.PRGModules.length; i++) {
    for (let j = 0; j < source.PRGModules[i].length; j++) {
      if (source.PRGModules[i][j] == undefined) {
        unused.push(source.PRGModules[i]);
      }
    }
  }
  console.log("-- Unused, but defined Programs:");
  if (unused.length == 0) {
    console.log("-- None. All programs were used in this file.");
  } else {
    console.log(unused);
  }
  console.log("Finished.");
  console.log("");
}
