const multiBitDefinitionsRegex =     /^(T|D|E|F|G|R|X|Y)(\d*)(\s*)([A-Z0-9\-\_\#]*)$/;
const singleBitDefinitionsRegex =    /^(T|D|E|F|G|R|X|Y)(\d*)(\.)(\d)(\s*)([A-Z0-9\-\_]*)$/;
const moduleNumberDefinitionRegex =  /^(P\d*)\s*C(\d*)$/;
const moduleTitleDefinitionRegex =   /^;---------------\s*(fc\d*.lad)\s*\(([^\)]*)\)$/i;

const currentModuleNumberRegex =     /^([P])(\d*)$/;
const currentModuleSourceRegex =     /^;---------------\s*(fc\d*.lad)\s*\(([^\)]*)\)$/i;
const currentNetworkRegex =          /^N(\d\d\d\d\d)\:$/g;
const readBitOperationsRegex =       /^(RD|OR|AND)(\.NOT\.STK|\.NOT|\.STK|)\s*(.*)$/;
const writeBitOperationsRegex =      /^(WRT|SET|RST)(\.NOT|)\s*(.*)$/;
const instructionOperationRegex =    /^(SNUB|SUB)\s*(\d*)$/;
const levelSubRegex =                /^(SNUB|SUB)\s*(\d*)$/;
const instructionReadWriteRegex =    /^([A-Z])(\d*)$/;
const instructionFormatRegex =       /^(\d|)(\d\d|)(\d|)$/;

/* "Define" classes */
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


class Format {
  constructor(format, variable) {
    this.format = format;
    this.variable = variable;
  }
}


/* "Operation" classes */
class BitOperation {
  constructor(op, mem, inMod, inNwk, inLine) {
    this.operation = op;
    this.memory = mem;
    this.inModule = inMod;
    this.inNetwork = inNwk;
    this.inLine = inLine;
  }
}


class InstructionOperation {
  constructor(instr, instrNbr, form, formLn, reads, writes, inMod, inNwk, inLine) {
    this.instruction = instr;
    this.instructionNumber = instrNbr;
    this.format = form;
    this.formatLength = formLn;
    this.reads = reads;
    this.writes = writes;
    this.inModule = inMod;
    this.inNetwork = inNwk;
    this.inLine = inLine;
  }
}


class Resource {
  constructor(sourceLines) {
    this.sourceLines = sourceLines;

    this.Modules = [];
    this.SBDMemory = [];
    this.MBDMemory = [];

    this.bitReadOperations = [];
    this.bitWriteOperations = [];
    this.instructionOperations = [];

    this.usedUndefinedInstructions = [];
  }


  getMultiBitDefinitions(str) {
    let match = multiBitDefinitionsRegex.exec(str);
    if (match != null && match[1,2,4] != null && match[1,2,4] != "") {
      let definition = new Memory(match[1], match[2], "", ">=8", match[4])
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


  getModuleNumberDefinition(str) {
    let match = moduleNumberDefinitionRegex.exec(str);
    if (match != null && match[1,2] != null && match[1,2] != "") {
      let mod = new Module(match[1], match[2]);
      return mod;
    } else {
      return null;
    }
  }


  getModuleTitleDefinition(str) {
    let match = moduleTitleDefinitionRegex.exec(str);
    if (match != null && match[1,2] != null && match[1,2] != "") {
      for (let i = 0; i < this.Modules.length; i++) {
        if (match[1].includes(this.Modules[i].sourceFile)) { /* If the module was found in the defined modules... */
          this.Modules[i].sourceFile = "fc" + this.Modules[i].sourceFile + ".lad"
          this.Modules[i].title = match[2];
          return true;
          break;
        }
      }
    } else {
      return null;
    }
  }


  getCurrentModule(str1, str2) {
    let match1 = currentModuleNumberRegex.exec(str1);
    let match2 = currentModuleSourceRegex.exec(str2);

    /* Source file name */
    if (match2 != null && match2[1,2] != null && match2[1,2] != "") {
      for (let i = 0; i < this.Modules.length; i++) {
        /* Check if the sourcefile is already defined */
        if (match2[1].includes(this.Modules[i].sourceFile)) {
          return this.Modules[i];
        }
      }
      /* SOurcenumber hasn't been used yet. */
      console.log("%cFound undefined module by sourcefile", "background-color: #bada55");
      return new Module(undefined , match2[1], undefined);
    }
    /* P Number */
    if (match1 != null && match1[1,2] != null && match1[1,2] != "") {
      for (let i = 0; i < this.Modules.length; i++) {
        /* Check if the P Number is already defined */
        if (parseInt(match1[2], 10) == this.Modules[i].number) {
          return this.Modules[i];
        }
      }
      /* SOurcenumber hasn't been used yet. */
      console.log("%cFound undefined module by program number.", "background-color: #bada55");
      return new Module(match1[2] , undefined, undefined);
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
      return {op: match[1] + match[2], mem: match[3]};
    } else {
      return null;
    }
  }


  getWriteBitOperation(str) {
    let match = writeBitOperationsRegex.exec(str);
    if (match != null && match[1,3] != null && match[1,3] != "") {
      return {op: match[1] + match[2], mem: match[3]};
    } else {
      return null;
    }
  }

  InstructionLogicData(lines, index) {
    let match = instructionOperationRegex.exec(lines[index]);
    if (match != null && match[1,2] != null && match[1,2] != "") {
        let name;
        let number = parseInt(match[2], 10);
        let reads = null;
        let writes = null;
        let format = {kind: "-", length: 0};
        switch (number) {
          case 1: /* ☑️ */
            name = "END1";
            /* Needs nothing */
            break;
          case 2: /* ☑️ */
            name = "END2";
            /* Needs nothing */
            break;
          case 48: /* ☑️ */
            name = "END3";
            /* Needs nothing */
            break;
          case 64: /* ☑️ */
            name = "SUBEND";
            /* Needs nothing */
            break;
          case 65: /* ☑️ */
            name = "SUBCALL";
            format.length = 1;
            reads = this.instructionReads(lines, index, 1, format.length);
            break;
          case 66: /* ☑️ */
            name = "SUBCALLU";
            format.length = 1;
            reads = this.instructionReads(lines, index, 1, format.length);
            break;
          case 71: /* ☑️ */
            name = "SUBPRG";
            format.length = 1;
            reads = this.instructionReads(lines, index, 1, format.length);
            break;
          case 72: /* ☑️ */
            name = "SUBE";
            /* Needs nothing */
            break;
          case 3: /* ☑️ */
            name = "TMR";
            format.length = 1;
            reads = "TMR_" + this.instructionReads(lines, index, 1, format.length);
            break;
          case 24: /* ☑️ */
            name = "TMRB";
            format.length = 1;
            reads = "TMR_" + this.instructionReads(lines, index, 1, format.length);
            break;
          case 54: /* ☑️ */
            name = "TMRC";
            format.length = 1;
            reads = "TMR_" + this.instructionReads(lines, index, 1, format.length);
            break;
          case 77: /* ☑️ */
            name = "TMBRF";
            format.length = 1;
            reads = "TMR_" + this.instructionReads(lines, index, 1, format.length);
            break;
          case 25: /* ☑️ */
            name = "DECB";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this.instructionWrites(lines, index, 4, format.length);
            break;
          case 5: /* ☑️ */
            name = "CTR";
            format.length = 1;
            reads = "CTR_" + this.instructionReads(lines, index, 1, format.length);
            writes = "CTR_" + this.instructionWrites(lines, index, 1, format.length);
            break;
          case 55: /* ☑️ */
            name = "CTRC";
            format.length = 2;
            reads = this.instructionReads(lines, index, 1, format.length);
            format.length = 4;
            writes = this.instructionWrites(lines, index, 1, format.length);
            break;
          case 56: /* ☑️ */
            name = "CTRB";
            format.length = 1;
            reads = "CTR_" + this.instructionReads(lines, index, 1, format.length);
            writes = "CTR_" + this.instructionWrites(lines, index, 1, format.length);
            break;
          case 6:
            name = "ROT";
            this.usedUndefinedInstructions.push(name);
            break;
          case 26:
            name = "ROTB";
            this.usedUndefinedInstructions.push(name);
            break;
          case 7:
            name = "COD";
            this.usedUndefinedInstructions.push(name);
            break;
          case 27: /* ☑️ */
            name = "CODB";
            format = this.instructionFormat(lines, index, 1);
            reads = this.instructionReads(lines, index, 3, format.length);
            writes = this.instructionWrites(lines, index, 4, format.length);
            break;
          case 8:
            name = "MOVE";
            this.usedUndefinedInstructions.push(name);
            break;
          case 28: /* ❔ */
            name = "MOVOR";
            format.length = 1;
            reads = [this.instructionReads(lines, index, 1, format.length), this.instructionReads(lines, index, 2, format.length)];
            writes = this.instructionWrites(lines, index, 3, format.length);

            break;
          case 9:
            name = "COM";
            this.usedUndefinedInstructions.push(name);
            break;
          case 29:
            name = "COME";
            this.usedUndefinedInstructions.push(name);
            break;
          case 10: /* ☑️ */
            name = "JMP";
            /* Needs nothing */
            break;
          case 30: /* ☑️ */
            name = "JMPE";
            /* Needs nothing */
            break;
          case 68: /* ☑️ */
            name = "JMPB";
            /* Needs nothing */
            break;
          case 69: /* ☑️ */
            name = "LBL";
            /* Needs nothing */
            break;
          case 11:
            name = "PARI";
            this.usedUndefinedInstructions.push(name);
            break;
          case 14:
            name = "DCNV";
            this.usedUndefinedInstructions.push(name);
            break;
          case 31: /* ☑️ */
            name = "DCNVB";
            format = this.instructionFormat(lines, index, 1);
            reads = this.instructionReads(lines, index, 2, format.length);
            writes = this.instructionWrites(lines, index, 3, format.length);
            break;
          case 15:
            name = "COMP";
            this.usedUndefinedInstructions.push(name);
            break;
          case 32: /* ☑️ */
            name = "COMPB";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = null;
            break;
          case 16:
            name = "COIN";
            this.usedUndefinedInstructions.push(name);
            break;
          case 33:
            name = "SFT";
            this.usedUndefinedInstructions.push(name);
            break;
          case 17:
            name = "DSCH";
            this.usedUndefinedInstructions.push(name);
            break;
          case 34:
            name = "DSCHB";
            this.usedUndefinedInstructions.push(name);
            break;
          case 18:
            name = "XMOV";
            this.usedUndefinedInstructions.push(name);
            break;
          case 35:
            name = "XMOVB";
            this.usedUndefinedInstructions.push(name);
            break;
          case 19:
            name = "ADD";
            this.usedUndefinedInstructions.push(name);
            break;
          case 36: /* ☑️ */
            name = "ADDB";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this. instructionWrites(lines, index, 4, format.length);
            break;
          case 20:
            name = "SUB";
            this.usedUndefinedInstructions.push(name);
            break;
          case 37: /* ☑️ */
            name = "SUBB";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this. instructionWrites(lines, index, 4, format.length);
            break;
          case 21:
            name = "MUL";
            this.usedUndefinedInstructions.push(name);
            break;
          case 38: /* ☑️ */
            name = "MULB";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this. instructionWrites(lines, index, 4, format.length);
            break;
          case 22:
            name = "DIV";
            this.usedUndefinedInstructions.push(name);
            break;
          case 39: /* ☑️ */
            name = "DIVB";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this. instructionWrites(lines, index, 4, format.length);
            break;
          case 23: /* ❎ */
            name = "NUME";
            this.usedUndefinedInstructions.push(name);
            break;
          case 40: /* ☑️ */
            name = "NUMEB";
            format = this.instructionFormat(lines, index, 1);
            reads = null;
            writes = this.instructionWrites(lines, index, 3, format.length);
            break;
          case 49:
            name = "DISP";
            this.usedUndefinedInstructions.push(name);
            break;
          case 41: /* ☑️ */
            name = "DISPB";
            /* Needs nothing */
            break;
          case 42: /* ❔ */
          name = "EXIN";
            format.length = 5;
            reads = this.instructionReads(lines, index, 1, format.length);
            writes = this.instructionWrites(lines, index, 1, format.length);
            break;
          case 43: /* ☑️ */
            name = "MOVB";
            format.length = 1;
            reads = this.instructionReads(lines, index, 1, format.length);
            writes = this.instructionWrites(lines, index, 2, format.length);
            break;
          case 44: /* ☑️ */
            name = "MOVW";
            format.length = 2;
            reads = this.instructionReads(lines, index, 1, format.length);
            writes = this.instructionWrites(lines, index, 2, format.length);
            break;
          case 45: /* ☑️ */
            name = "MOVN";
            format = this.instructionFormat(lines, index, 1);
            reads = this.instructionReads(lines, index, 2, format.length);
            writes = this. instructionWrites(lines, index, 3, format.length);
            break;
          case 51: /* ☑️ */
            name = "WINDR";
            format.length = 1;
            writes = this.instructionWrites(lines, index, 1, format.length);
            break;
          case 52:
            name = "WINDW";
            format.length = 1;
            writes = this.instructionWrites(lines, index, 1, format.length);
            break;
          case 57: /* ☑️ */
            name = "DIFU";
            format.length = 1;
            reads = "DIFU_" + this.instructionReads(lines, index, 1, format.length);
            break;
          case 58: /* ☑️ */
            name = "DIFD";
            format.length = 1;
            reads = "DIFD_" + this.instructionReads(lines, index, 1, format.length);
            break;
          case 53: /* ☑️ */
            name = "AXCTL";
            /* Needs nothing */
            break;
          case 59: /* ☑️ */
            name = "EXOR";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this. instructionWrites(lines, index, 4, format.length);
            break;
          case 60: /* ☑️ */
            name = "LOGAND";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this. instructionWrites(lines, index, 4, format.length);
            break;
          case 61: /* ☑️ */
            name = "LOGOR";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = this. instructionWrites(lines, index, 4, format.length);
            break;
          case 62: /* ☑️ */
            name = "LOGNOT";
            format = this.instructionFormat(lines, index, 1);
            reads = this.instructionReads(lines, index, 2, format.length);
            writes = this. instructionWrites(lines, index, 3, format.length);
            break;
          case 90:
            name = "FNC90";
            this.usedUndefinedInstructions.push(name);
            break;
          case 91:
            name = "FNC91";
            this.usedUndefinedInstructions.push(name);
            break;
          case 92:
            name = "FNC92";
            this.usedUndefinedInstructions.push(name);
            break;
          case 93:
            name = "FNC93";
            this.usedUndefinedInstructions.push(name);
            break;
          case 94:
            name = "FNC94";
            this.usedUndefinedInstructions.push(name);
            break;
          case 95:
            name = "FNC95";
            this.usedUndefinedInstructions.push(name);
            break;
          case 96:
            name = "FNC96";
            this.usedUndefinedInstructions.push(name);
            break;
          case 97:
            name = "FNC97";
            this.usedUndefinedInstructions.push(name);
            break;
          case 88:
            name = "MMC3R";
            this.usedUndefinedInstructions.push(name);
            break;
          case 89:
            name = "MMC3W";
            this.usedUndefinedInstructions.push(name);
            break;
          case 98:
            name = "MMCWR";
            this.usedUndefinedInstructions.push(name);
            break;
          case 99:
            name = "MMCWW";
            this.usedUndefinedInstructions.push(name);
            break;
          case 460:
            name = "PID";
            this.usedUndefinedInstructions.push(name);
            break;
          default:
            /* Collect Subs which appear in the mnemonic and are defined but aren't
            handled in code */
        }

        return  {
                  instruction: name,
                  number: number,
                  reads: reads,
                  writes: writes,
                  format: format.kind,
                  formatLength : format.length
                };
    }
  }


  instructionReads(lines, index, offset, length = 1) {
    let startByte = lines[index + offset];
    let match = instructionReadWriteRegex.exec(startByte);
    let endByte
    /* If match is null then it's a constant, not a memory definition */
    if (match != null) {
      /* Only add "Memory Range" to return if the desired length is bigger than one byte */
      if (length > 1) {
        endByte = match[1] + (parseInt(match[2], 10) + length - 1);
        return startByte  + " - " + endByte;
      } else {
        return startByte
      }
    } else {
      return startByte;
    }
  }

  instructionWrites(lines, index, offset, length = 1) {
    let startByte = lines[index + offset];
    let match = instructionReadWriteRegex.exec(startByte);
    let endByte
    /* If match is null then it's a constant, not a memory definition */
    if (match != null) {
      /* Only add "Memory Range" to return if the desired length is bigger than one byte */
      // NOTE: Commented out since it's easier to do querys when there's only one Byte in the "reads" attribute
      // if (length > 1) {
      //   endByte = match[1] + (parseInt(match[2], 10) + length - 1);
      //   return startByte  + " - " + endByte;
      // } else {
      //   return startByte
      // }
      return startByte;
    } else {
      return startByte;
    }
  }

  instructionFormat(lines, index, offset) {
    let format = lines[index + offset];
    let match = instructionFormatRegex.exec(format);
    let kind = "Normal";
    let length = parseInt(match[1], 10);
    /* Change kind / length if it's not a normal format */
    if (match[2] && match[3] != null) {
      length = parseInt(match[3], 10);
      switch (match[1]) {
        case "0":
          kind = "Constant";
          break;
        case "1":
          kind = "Adress";
          break;
      }
    }
    return {kind: kind, length: length};
  }
}
