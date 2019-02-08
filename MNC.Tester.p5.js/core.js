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

  getExternalDefinitions(Data);
  getDefinitions(Data);
  analyzeLogic(Data);
  analyzeResults(Data);

  // let testSearch2 = Data.bitQuery("allWriteOperations", Data.getBit("R9000.1"));
  // let testSearch = Data.bitQuery("allReadOperations", Data.getBit("REQUAL"));

  noLoop();
}


function getExternalDefinitions(source) {
  /* Load definitions from local array. These are "nice-to-have" but
  not necessary. The are not found in the .mnc file, that's why we load them manually */
  console.log("Getting external definitions...");
  source.SUBPrograms =     Reader.getInstructionDefinitions(instructionDefinitions);
  console.log("-- Subprogram definitions : " + source.SUBPrograms.length);
  source.FORMATDefinitions = Reader.getFormatDefinitions(formatDefinions);
  console.log("-- Format definitions     : " + source.FORMATDefinitions.length);
  console.log("Finished.");
  console.log(" ");
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

    /* Check if line contains a program number definition */
    let PRGNBR = Reader.getProgramNumberDefinition(line);
    if (PRGNBR != null) {source.PRGModules.push(PRGNBR);}

    /* Check if line contains a program title definition (they are only shown
    where the program is called in the file). Add to equally named existing module */
    Reader.getProgramTitleDefinition(line, source.PRGModules);
  }
  console.log("-- Multibit definitions  : " + source.MBDMemory.length);
  console.log("-- Singlebit definitions : " + source.SBDMemory.length);
  console.log("-- Module definitions    : " + source.PRGModules.length);
  console.log("Finished.");
  console.log("");
}


function analyzeLogic(source) {
  /* Get all logic events in the whole file */
  console.log("Analyzing logic...");
  let lines = source.sourceLines;
  for (let i = 0; i < lines.length; i++) {

    /* Update the current module */
    let MODULE = Reader.getCurrentModule(lines[i], lines[i+1], source.PRGModules);
    if (MODULE != null) {CurrentModule = MODULE;}

    /* Update the current network */
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
      op = Reader.getInstructionOperations(source.sourceLines, i, source.SUBPrograms);
      if (op != null) {source.instructionOperations.push([op, CurrentModule, CurrentNetwork]);}

      /* COMBAK: Should return every SUB Instance as a new object. doesn't do that tho */
    }
  }
  console.log("-- Found bitwise Read operations:");
  console.log(source.bitReadOperations);
  console.log("-- Found bitwise Write operations:");
  console.log(source.bitWriteOperations);
  console.log("-- Found instruction operations:");
  console.log(source.instructionOperations);
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
