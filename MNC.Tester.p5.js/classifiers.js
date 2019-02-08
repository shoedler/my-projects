const multiBitDefinitionsRegex =     /^(T|D|E|F|G|R|X|Y)(\d*)(\s*)([A-Z0-9\-\_]*)$/;
const singleBitDefinitionsRegex =    /^(T|D|E|F|G|R|X|Y)(\d*)(\.)(\d)(\s*)([A-Z0-9\-\_]*)$/;
const programNumberDefinitionRegex = /^(P\d*)\s*C(\d*)$/;
const programTitleDefinitionRegex =  /^;---------------\s*(fc\d*.lad)\s*\(([^\)]*)\)$/i;
const instructionDefinitionsRegex =  /^([A-Z0-9]*)\s*([0-9X]*)\s*([0-9X]*)\s*([0-9X]*)\s*([0-9X]*)\s*([0-9X]*)\s*([0-9X]*)$/;
const formatDefinitionsRegex =       /^([A-Z0-9_]*)\s*(\d*)$/;

const currentModuleNumberRegex =     /^([P])(\d*)[^\s]$/;
const currentModuleSourceRegex =     /^;---------------\s*(fc\d*.lad)\s*\(([^\)]*)\)$/i;
const currentNetworkRegex =          /^N(\d\d\d\d\d)\:$/g;
const readBitOperationsRegex =       /^(RD|OR|AND)(\.NOT\.STK|\.NOT|\.STK|)\s*(.*)$/;
const writeBitOperationsRegex =      /^(WRT|SET|RST)(\.NOT|)\s*(.*)$/;
const instructionOperationRegex =    /^(SNUB|SUB)\s*(\d*)$/;


class Interpreter {
  constructor() {
    console.log("%c New Interpreter instance created ", "background: #353535; color: #bada55");
    console.log(" ");
  }

  getMultiBitDefinitions(str) {
    let match = multiBitDefinitionsRegex.exec(str);
    if (match != null && match[1,2,4] != null && match[1,2,4] != "") {
      let definition = new Memory(match[1], match[2], "", "?", match[4])
      return definition;
    } else {
      return null;
    }
  }


  getSingleBitDefinitions(str) {
    let match = singleBitDefinitionsRegex.exec(str);
    if (match != null && match[1,2,4,6] != null && match[1,2,4,6] != "") {
      let definition = new Memory(match[1], match[2], match[4], 1, match[6])
      return definition;
    } else {
      return null;
    }
  }

  getProgramNumberDefinition(str) {
    let match = programNumberDefinitionRegex.exec(str);
    if (match != null && match[1,2] != null && match[1,2] != "") {
      let mod = new Module(match[1], match[2]);
      return mod;
    } else {
      return null;
    }
  }

  getProgramTitleDefinition(str, modules) {
    let match = programTitleDefinitionRegex.exec(str);
    if (match != null && match[1,2] != null && match[1,2] != "") {
      for (let i = 0; i < modules.length; i++) {
        if (match[1].includes(modules[i].sourceFile)) { /* If the module was found in the defined modules... */
          modules[i].sourceFile = "fc" + modules[i].sourceFile + ".lad"
          modules[i].title = match[2];
          return true;
          break;
        }
      }
    } else {
      return null;
    }
  }

  getInstructionDefinitions(instrArr) {
    let definitions = [];
    for (let ins of instrArr) {
      let match = instructionDefinitionsRegex.exec(ins)
      if ( match != null && match[1,2] && match[1,2] != "") {
        definitions.push(new SUBProgram(parseInt(match[2]), match[1], parseInt(match[3]), parseInt(match[4]),
                                        parseInt(match[5]), parseInt(match[6]), parseInt(match[7])));
      }
    }
    return definitions;
  }

  getFormatDefinitions(formatArr) {
    let definitions = [];
    for (let format of formatArr) {
      let match = formatDefinitionsRegex.exec(format)
      if ( match != null && match[1,2] && match[1,2] != "") {
        definitions.push(new FORMATDefinition(match[2], match[1]));
      }
    }
    return definitions;
  }

  getCurrentModule(str1, str2, modules) {
    let match1 = currentModuleNumberRegex.exec(str1);
    let match2 = currentModuleSourceRegex.exec(str2);
    if (match1 != null && match1[1,2] != null && match1[1,2] != "") {
    if (match2 != null && match2[1,2] != null && match2[1,2] != "") {
      for (let i = 0; i < modules.length; i++) {
        if (match2[1].includes(modules[i].sourceFile)) { /* If the module was found in the defined modules... */
          return modules[i];
          break;
        }
      }
    } else {
      return null;
    }
    }
  }


  getCurrentNetwork(str) {
    let match = currentNetworkRegex.exec(str);
    if (match != null && match[1] != null && match[1] != "") {
      return match[1];
    } else {
      return null;
    }
  }


  getReadBitOperation(str) {
    let match = readBitOperationsRegex.exec(str);
    if (match != null && match[1,3] != null && match[1,3] != "") {
      return [match[1] + match[2], match[3]];
    } else {
      return null;
    }
  }


  getWriteBitOperation(str) {
    let match = writeBitOperationsRegex.exec(str);
    if (match != null && match[1,3] != null && match[1,3] != "") {
      return [match[1] + match[2], match[3]];
    } else {
      return null;
    }
  }

  getInstructionOperations(strArr, index, subs) {
    let found;
    let match = instructionOperationRegex.exec(strArr[index]);
    if (match != null && match[1,2] != null && match[1,2] != "") {
      for (let sub of subs) {
        if (match[2] == sub.number) {
          found = Object.assign({}, sub);
          /* Evaluate instruction logic */
          if (found.formatLinefeed != 0) {found.format = strArr[index + found.formatLinefeed]};

          switch (found.mode) {
            case 1: /* RD A and WRT B */
              found.reads.push(strArr[index + found.inputALinefeed]);
              found.writes.push(strArr[index + found.inputBLinefeed]);
              break;
            case 2: /* RD A and RD B */
              found.reads.push(strArr[index + found.inputALinefeed]);
              found.reads.push(strArr[index + found.inputBLinefeed]);
            default:
          }
          return found;
          break;
        }
      }

    } else {
      return null;
    }
  }
}


class Memory {
  constructor(type, byteAddress, bitAddress, length, symbol) {
    this.byteType = type;             /* Memory Letter, e.g. "R" */
    this.byteAddress = byteAddress;
    this.bitAddress = bitAddress;
    this.length = length;             /* In Bits, 1 = Bit, 8 = Byte etc. */
    this.symbol = symbol;
  }
}

class Module {
  constructor(programNumber, sourceFile, title) {
    this.programNumber = programNumber
    this.sourceFile = sourceFile;
    this.title = title;
  }
}

class SUBProgram {
  constructor(number, instruction, fLf = 0, aLf, bLf, format, mode) {
    this.number = number;
    this.instruction = instruction;
    this.formatLinefeed = fLf;  /* At which line after the instruction is the format attribute? 0 if inexistent */
    this.inputALinefeed = aLf;  /* At which line after the instruction is the read memory / address? */
    this.inputBLinefeed = bLf;  /* At which line after the instruction is the write memory / address? */

    this.format = format;       /* 1=Byte, 2=Word etc. */
    this.mode = mode;           /* Contains mode of instruction */
    this.reads = [];             /* Will store the Memory / address it reads */
    this.writes = [];            /* Will store the Memory / address it writes */
  }
}

class FORMATDefinition {
  constructor(format, variable) {
    this.format = format;
    this.variable = variable;
  }
}
