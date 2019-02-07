const multiBitDefinitionsRegex =     /^(T|D|E|F|G|R|X|Y)(\d*)(\s*)([A-Z0-9\-\_]*)$/;
const singleBitDefinitionsRegex =    /^(T|D|E|F|G|R|X|Y)(\d*)(\.)(\d)(\s*)([A-Z0-9\-\_]*)$/;
const programNumberDefinitionRegex = /^(P\d*)\s*C(\d*)$/;
const currentModuleRegex =           /^;---------------\s*(fc\d*.lad)\s*\(([^\)]*)\)$/i;
const currentNetworkRegex =          /^N(\d\d\d\d\d)\:$/g;
const readBitOperationsRegex =       /^(RD|OR|AND)(\.NOT\.STK|\.NOT|\.STK|)\s*(.*)$/;
const writeBitOperationsRegex =      /^(WRT|SET|RST)(\.NOT|)\s*(.*)$/;
const instructionOperationRegex =    /^(SNUB|SUB)\s*(\d*)$/;

const legalProgramPrefixes = ["P"];

class Interpreter {
  constructor() {
    console.log("New Interpreter instance created");
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

  updateCurrentModule(str, modules) {
    let match = currentModuleRegex.exec(str);
    if (match != null && match[1,2] != null && match[1,2] != "") {
      for (let i = 0; i < modules.length; i++) {
        if (match[1].includes(modules[i].sourceFile)) { /* If the module was found in the defined modules... */
          modules[i].sourceFile = "fc" + modules[i].sourceFile + ".lad"
          modules[i].title = match[2];
          return modules[i];
          break;
        }
      }
    } else {
      return null;
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

  getInstructionOperations(str) {
    let match = instructionOperationRegex.exec(str);
    if (match != null && match[1,2] != null && match[1,2] != "") {
      let subNr = match[2];

      /* TODO : Handle Sub Numbers 💩 */

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
