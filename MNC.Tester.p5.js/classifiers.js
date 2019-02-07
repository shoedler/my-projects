const multiBitDefinitionsRegex =  /^(T|D|E|F|G|R)(\d*)(\s*)([A-Z0-9\-\_]*)$/g;
const singleBitDefinitionsRegex = /^(T|D|E|F|G|R)(\d*)(\.)(\d)(\s*)([A-Z0-9\-\_]*)$/g;
const legalProgramPrefixes = ["P"];


class Interpreter {
  constructor() {
    console.log("New Interpreter instance created");
  }



  getMultiBitDefinitions(str) {
    var match = multiBitDefinitionsRegex.exec(str);
    if (match != null && match[1,2,4] != null && match[1,2,4] != "") {
      let definition = new Memory(match[1], match[2], "", "?", match[4])
      return definition;
    } else {
      return null;
    }
  }

  getSingleBitDefinitions(str) {
    var match = singleBitDefinitionsRegex.exec(str);
    if (match != null && match[1,2,4,6] != null && match[1,2,4,6] != "") {
      let definition = new Memory(match[1], match[2], match[4], 1, match[6])
      return definition;
    } else {
      return null;
    }
  }

  definitions(str) {

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
