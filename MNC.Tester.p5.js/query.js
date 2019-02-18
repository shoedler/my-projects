class Query {
  constructor(resource, type, memory) {
    this.src = resource;
    this.type = type;
    this.memory = memory;
    this.log = [];
    this.result = [];

    this.handleQuery();
  }

  handleQuery() {
    let query;
    let bit;
    let byte;

    switch (this.type) {

      case "bitRead":
        query = this.memory;
        this.queryLogHead("Bit Read Operations for (" + query + ")");

        /* get definitions */
        this.log.push("Looking for definitions...");
        bit = this.getBit(query, this.src);
        byte = this.getByte((bit.byteType + bit.byteAddress), this.src);

        this.log.push("Looking for read operations...");
        /* check for matching bitRead operations */
        for (let bitR of this.src.bitReadOperations) {
          if (bitR.memory ==  bit.byteType  + bit.byteAddress  + "." + bit.bitAddress) {
                this.result.push(bitR);
              }
        }

        /* check for matching "reads" in instructionOperations */
        for (let ins of this.src.instructionOperations) {
          /* loop trough "reads" array, if there is one */
          if (ins.reads != null) {
            for (let read of ins.reads) {
              if (bit.byteType + bit.byteAddress == read) {
                if (checkInstructionByteRange(read, ins.formatLength, bit)) {
                  this.result.push(ins);
                }
              }
            }
          }
        }

        this.queryLogFooter(this.result);
        break;
      case "bitWrite":
        query = this.memory;
        this.queryLogHead("Bit Write Operations for (" + query + ")");

        /* get definitions */
        this.log.push("Looking for definitions...");
        bit = this.getBit(query, this.src);
        byte = this.getByte((bit.byteType + bit.byteAddress), this.src);

        this.log.push("Looking for write operations...");
        /* check for matching bitRead operations */
        for (let bitW of this.src.bitWriteOperations) {
          if (bitW.memory ==  bit.byteType  + bit.byteAddress  + "." + bit.bitAddress) {
                this.result.push(bitW);
              }
        }

        /* check for matching "reads" in instructionOperations */
        for (let ins of this.src.instructionOperations) {
          /* loop trough "reads" array, if there is one */
          if (ins.writes != null) {
            for (let write of ins.writes) {
              if (bit.byteType + bit.byteAddress == write) {
                if (checkInstructionByteRange(write, ins.formatLength, bit)) {
                  this.result.push(ins);
                }
              }
            }
          }
        }

        this.queryLogFooter(this.result);
        break;

      default:
        this.log.push("Query Type undefined.");
    }
    /* plot log of this query */
    for (let str of this.log) {
      console.log(str);
    }
  }

  queryLogHead(type) {
    this.log.push(" ");
    this.log.push("Query issued. Type: " + type);
  }

  queryLogFooter(result) {
    if (result == null || result.length == 0) {
      this.log.push("Nothing found");
    } else {
      this.log.push("Found this:");
      this.log.push(result);
    }
    this.log.push(" ");
  }

  getBit(bit, src) {
    /* find bit */
    this.log.push("Bit Definition:");
    for (let b of src.SBDMemory) {
      if (bit == b.byteType + b.byteAddress + "." + b.bitAddress || bit == b.symbol) {
        this.log.push(b);
        return b
      }
    }
    /* not defined */
    this.log.push("Bit is undefined");
  }

  getByte(byte, src) {
    /* find byte */
    this.log.push("Parent Byte Definition:");
    for (let b of src.MBDMemory) {
      if (byte == b.byteType + b.byteAddress) {
        this.log.push(b);
        return b
      }
    }
    /* not defined */
    this.log.push("Has no parent Byte Definition");
  }
}

function checkInstructionByteRange(startByte, length, checkBit) {
  let match = startByte.exec(/^[A-Z](\d*)$/);
  if (match != null) {
    /* loop trough length (amount of bytes) */
    for (let i = 0; i = length; i++) {
      /* if the bit's byteAdress matches the instructions byteAdress + i then it's getting handled there */
      if (checkBit.byteAddress == match + i) {
        return true;
      }
    }
  } else {
    /* also return false if the regex doesn't match. this could mean it's a constant */
    return false;
  }
}