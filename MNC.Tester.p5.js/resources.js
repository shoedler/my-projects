class Resource {
  constructor(sourceLines) {
    this.sourceLines = sourceLines;
    this.MBDMemory = [];
    this.SBDMemory = [];
    this.PRGModules = [];
    this.bitReadOperations = [];
    this.bitWriteOperations = [];
  }


  getBit(str) {
    let result;
    /* Firstly, check by adress */
    for (let i = 0; i < this.SBDMemory.length; i++) {
      /* Check if the names are equal e.g. R1344.3 = R1344.3 */
      if (str == this.SBDMemory[i].byteType + this.SBDMemory[i].byteAddress + "." + this.SBDMemory[i].bitAddress) {
          result = this.SBDMemory[i];
      }
    }

    /* Secondly, check by symbol */
    if (result != null) {
      return result;
    } else {
      for (let i = 0; i < this.SBDMemory.length; i++) {
        /* Check if the names are equal e.g. CL1ISB = CL1ISB */
        if (str == this.SBDMemory[i].symbol) {
            result = this.SBDMemory[i];
        }
      }
    }
    return result;
  }


  query(type, memory) {
    let results = [];
    switch (type) {
      case "search_bitReadOperations":
          for (let i = 0; i < this.bitReadOperations.length; i++) {
            if (this.bitReadOperations[i][0][1] == memory.byteType + memory.byteAddress + "." + memory.bitAddress) {
              results.push([this.bitReadOperations[i][0][1],
                            this.bitReadOperations[i][0][0],
                            this.bitReadOperations[i][1]]);
            }
          }
        break;

      case "search_bitWriteOperations":
          for (let i = 0; i < this.bitWriteOperations.length; i++) {
            if (this.bitWriteOperations[i][0][1] == memory.byteType + memory.byteAddress + "." + memory.bitAddress) {
              results.push([this.bitWriteOperations[i][0][1],
                            this.bitWriteOperations[i][0][0],
                            this.bitWriteOperations[i][1]]);
            }
          }
        break;

      default:
    }
    if (results.length == 0) {
      return "Search query issued. Nothing found. Query:" + type
    } else {
      console.log("Search query issued. Results:");
      return results;
    }
  }
}
