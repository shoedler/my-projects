const multiBitDefinitionsRegex =     /^(T|D|E|F|G|R|X|Y)(\d*)(\s*)([A-Z0-9\-\_]*)$/;
const singleBitDefinitionsRegex =    /^(T|D|E|F|G|R|X|Y)(\d*)(\.)(\d)(\s*)([A-Z0-9\-\_]*)$/;
const moduleNumberDefinitionRegex = /^(P\d*)\s*C(\d*)$/;
const moduleTitleDefinitionRegex =  /^;---------------\s*(fc\d*.lad)\s*\(([^\)]*)\)$/i;

const currentModuleNumberRegex =     /^([P])(\d*)[^\s]$/;
const currentModuleSourceRegex =     /^;---------------\s*(fc\d*.lad)\s*\(([^\)]*)\)$/i;
const currentNetworkRegex =          /^N(\d\d\d\d\d)\:$/g;
const readBitOperationsRegex =       /^(RD|OR|AND)(\.NOT\.STK|\.NOT|\.STK|)\s*(.*)$/;
const writeBitOperationsRegex =      /^(WRT|SET|RST)(\.NOT|)\s*(.*)$/;
const instructionOperationRegex =    /^(SNUB|SUB)\s*(\d*)$/;
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
    if (match1 != null && match1[1,2] != null && match1[1,2] != "") {
    if (match2 != null && match2[1,2] != null && match2[1,2] != "") {
      for (let i = 0; i < this.Modules.length; i++) {
        if (match2[1].includes(this.Modules[i].sourceFile)) { /* If the module was found in the defined modules... */
          return this.Modules[i];
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
            break;
          case 2: /* ☑️ */
            name = "END2";
            break;
          case 48: /* ☑️ */
            name = "END3";
            break;
          case 64: /* ☑️ */
            name = "SUBEND";
            break;
          case 65: /* ☑️ */
            name = "SUBCALL";
            break;
          case 66: /* ☑️ */
            name = "SUBCALLU";
            break;
          case 71: /* ☑️ */
            name = "SUBPRG";
            break;
          case 72: /* ☑️ */
            name = "SUBE";
            break;
          case 3:
            name = "TMR";
            break;
          case 24:
            name = "TMRB";
            break;
          case 54:
            name = "TMRC";
            break;
          case 77:
            name = "TMBRF";
            break;
          case 25:
            name = "DECB";
            break;
          case 5:
            name = "CTR";
            break;
          case 55:
            name = "CTRC";
            break;
          case 56:
            name = "CTRB";
            break;
          case 6:
            name = "ROT";
            break;
          case 26:
            name = "ROTB";
            break;
          case 7:
            name = "COD";
            break;
          case 27:
            name = "CODB";
            break;
          case 8:
            name = "MOVE";
            break;
          case 28:
            name = "MOVOR";
            break;
          case 9:
            name = "COM";
            break;
          case 29:
            name = "COME";
            break;
          case 10:
            name = "JMP";
            break;
          case 30:
            name = "JMPE";
            break;
          case 68:
            name = "JMPB";
            break;
          case 69:
            name = "LBL";
            break;
          case 11:
            name = "PARI";
            break;
          case 14: /* ❎ */
            name = "DCNV";
            break;
          case 31: /* ☑️ */
            name = "DCNVB";
            format = this.instructionFormat(lines, index, 1);
            reads = this.instructionReads(lines, index, 2, format.length);
            writes = this.instructionWrites(lines, index, 3, format.length);
            break;
          case 15:
            name = "COMP";
            break;
          case 32: /* ☑️ */
            name = "COMPB";
            format = this.instructionFormat(lines, index, 1);
            reads = [this.instructionReads(lines, index, 2, format.length), this.instructionReads(lines, index, 3, format.length)];
            writes = null;
            break;
          case 16:
            name = "COIN";
            break;
          case 33:
            name = "SFT";
            break;
          case 17:
            name = "DSCH";
            break;
          case 34:
            name = "DSCHB";
            break;
          case 18:
            name = "XMOV";
            break;
          case 35:
            name = "XMOVB";
            break;
          case 19:
            name = "ADD";
            break;
          case 36:
            name = "ADDB";
            break;
          case 20:
            name = "SUB";
            break;
          case 37:
            name = "SUBB";
            break;
          case 21:
            name = "MUL";
            break;
          case 38:
            name = "MULB";
            break;
          case 22:
            name = "DIV";
            break;
          case 39:
            name = "DIVB";
            break;
          case 23: /* ❎ */
            name = "NUME";
            break;
          case 40: /* ☑️ */
            name = "NUMEB";
            format = this.instructionFormat(lines, index, 1);
            reads = null;
            writes = this.instructionWrites(lines, index, 3, format.length);
            break;
          case 49:
            name = "DISP";
            break;
          case 41:
            name = "DISPB";
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
          case 57:
            name = "DIFU";
            break;
          case 58:
            name = "DIFD";
            break;
          case 53:
            name = "AXCTL";
            break;
          case 59:
            name = "EXOR";
            break;
          case 60:
            name = "LOGAND";
            break;
          case 61:
            name = "LOGOR";
            break;
          case 62:
            name = "LOGNOT";
            break;
          case 90:
            name = "FNC90";
            break;
          case 91:
            name = "FNC91";
            break;
          case 92:
            name = "FNC92";
            break;
          case 93:
            name = "FNC93";
            break;
          case 94:
            name = "FNC94";
            break;
          case 95:
            name = "FNC95";
            break;
          case 96:
            name = "FNC96";
            break;
          case 97:
            name = "FNC97";
            break;
          case 88:
            name = "MMC3R";
            break;
          case 89:
            name = "MMC3W";
            break;
          case 98:
            name = "MMCWR";
            break;
          case 99:
            name = "MMCWW";
            break;
          case 460:
            name = "PID";
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

  instructionFormat(lines, index, offset) {
    let format = lines[index + offset];
    let match = instructionFormatRegex.exec(format);
    let kind = "Normal";
    let length = parseInt(match[1], 10);
    /* Change kind / length if it's not a normal format */
    if (match[2] & match[3] != "") {
      length = parseInt(match[3], 10);
      switch (parseInt(match[1], 10)) {
        case 0:
          kind = "Const";
          break;
        case 1:
          kind = "Adress";
          break;
      }
    }
    return {kind: kind, length: length};
  }
}
