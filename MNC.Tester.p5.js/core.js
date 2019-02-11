let wWidth  = window.innerWidth;
let wHeight = window.innerHeight;

const red   = "#b72828"
const green = "#3bb728"
const yellow = "#998429"

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
  let warn = 0;
  /* Run all sequences to analyze the mnemonic */
  warn += getAdditionalDefinitions(Data);
  warn += getDefinitions          (Data);
  warn += analyzeLogic            (Data);
  warn += analyzeDependencies     (Data);
  warn += analyzeResults          (Data);
  if (warn != 0) {console.log("%c There have been " + warn + " warnings!", "background: #b72828; color: #ffffff");}
  // let testSearch2 = Data.bitQuery("allWriteOperations", Data.getBit("R9000.1"));
  // let testSearch = Data.bitQuery("allReadOperations", Data.getBit("REQUAL"));
  noLoop();
}


function getAdditionalDefinitions(source) {
  let w = 0;
  /* Load definitions from array. These defs are "nice-to-have" but
  not necessary. The are not found in the .mnc file, that's why we load them manually */
  console.log("Getting additional definitions...");
  source.Instructions = Reader.getInstructionDefinitions(instructionDefinitions);
  console.log("-- Instructions (aka. SUBs) definitions : " + source.Instructions.length);
  source.Formats =      Reader.getFormatDefinitions(formatDefinions);
  console.log("-- Format definitions     : " + source.Formats.length);
  finishSequence(w, 2);
  return w
}


function getDefinitions(source) {
  let w = 0;
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
    if (PRGNBR != null) {source.Modules.push(PRGNBR);}
    /* Check if line contains a program title definition (they are only shown
    where the program is called in the file). Add to equally named existing module */
    Reader.getProgramTitleDefinition(line, source.Modules);
  }
  console.log("-- Multibit definitions  : " + source.MBDMemory.length);
  console.log("-- Singlebit definitions : " + source.SBDMemory.length);
  console.log("-- Module definitions    : " + source.Modules.length);
  finishSequence(w, 2);
  return w
}


function analyzeLogic(source) {
  let w = 0;
  /* Get all logic events in the whole file */
  console.log("Analyzing logic...");
  let lines = source.sourceLines;
  for (let i = 0; i < lines.length; i++) {
    /* Update the current module */
    let MODULE = Reader.getCurrentModule(lines[i], lines[i+1], source.Modules);
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
      if (op != null) {source.bitReadOperations.push (new BitOperation(op, CurrentModule, CurrentNetwork));}
      op = Reader.getWriteBitOperation(lines[i]);
      if (op != null) {source.bitWriteOperations.push(new BitOperation(op, CurrentModule, CurrentNetwork));}
      /* Instructions */
      op = Reader.getInstructionOperations(source.sourceLines, i, source.Instructions);
      if (op != null) {source.instructionOperations.push(new InstructionOperation(op.instruction,
                                                                                  op.reads,
                                                                                  op.writes,
                                                                                  CurrentModule,
                                                                                  CurrentNetwork));}
    }
  }
  console.log("-- Found bitwise Read operations:");
  console.log(source.bitReadOperations);
  console.log("-- Found bitwise Write operations:");
  console.log(source.bitWriteOperations);
  console.log("-- Found instruction operations:");
  console.log(source.instructionOperations);
  finishSequence(w, 2);
  return w
}


function analyzeDependencies(source) {
  let w = 0;
  /* Get all logic events in the whole file */
  console.log("Analyzing Dependencies...");

  finishSequence(w, 2);
  return w
}


function analyzeResults(source) {
  let w = 0;
  console.log("Analyzing Results...");

  /* Check if all defined programs appear in the logic */
  console.log("-- Unused, but defined Modules:");
  let unused = [];
  for (let i = 0; i < source.Modules.length; i++) {
    for (let j = 0; j < source.Modules[i].length; j++) {
      if (source.Modules[i][j] == undefined) {
        unused.push(source.Modules[i]);
        w += 1;
      }
    }
  }
  if (unused.length == 0) {
    console.log("%c--- None. All Modules were used in this file.", "color: " + green);
  } else {
    console.log("%c--- There are some...", "color: " + red);
    console.log(unused);
  }

  /* Check if there are any Instructions detected which are defined as "unsure" (mode = -1) */
  console.log("-- Instructions, which are defined as 'unsure':");
  let unsure = []
  for (let i = 0; i < source.Instructions.length; i++) {
    if (source.Instructions[i].mode == -1) {
      unsure.push(source.Instructions[i]);
      w += 1;
    }
  }
  if (unsure.length == 0) {
    console.log("%c--- None. All Instructions are defined correctly.", "color: " + green);
  } else {
    console.log("%c--- There are some...", "color: " + red);
    console.log(unsure);
  }
  finishSequence(w, 2);
  return w;
}


function finishSequence(w, spaces = 1, additionalString = "") {
  if (w != 0) {
    console.log("%cWarnings: " + w, "color: " + yellow);
  } else {
    console.log("No Warnings");
  }
  console.log("Finished. " + additionalString);
  for (let i = 0; i < spaces; i++) {
    if (i % 2 == 0) {
      console.log("");
    } else {
      console.log(" ");
    }
  }
}
