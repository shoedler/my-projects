class Resource {
  constructor(sourceLines) {
    this.sourceLines = sourceLines;

    this.SUBPrograms = [];
    this.FORMATDefinitions = [];
    this.MBDMemory = [];
    this.SBDMemory = [];

    this.PRGModules = [];
    this.bitReadOperations = [];
    this.bitWriteOperations = [];
    this.instructionOperations = [];
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


  bitQuery(type, bit) {
    let results = [];
    console.log("Bit-Search query issued, type: '" + type + "' for '" + bit.byteType + bit.byteAddress + "." + bit.bitAddress + " | " + bit.symbol + "'");
    switch (type) {
      case "allReadOperations":
          for (let i = 0; i < this.bitReadOperations.length; i++) {
            if (this.bitReadOperations[i][0][1] == bit.byteType + bit.byteAddress + "." + bit.bitAddress) {
              results.push([this.bitReadOperations[i][0][1],
                            this.bitReadOperations[i][0][0],
                            this.bitReadOperations[i][1]]);
            }
          }
        break;

      case "allbitWriteOperations":
          for (let i = 0; i < this.bitWriteOperations.length; i++) {
            if (this.bitWriteOperations[i][0][1] == bit.byteType + bit.byteAddress + "." + bit.bitAddress) {
              results.push([this.bitWriteOperations[i][0][1],
                            this.bitWriteOperations[i][0][0],
                            this.bitWriteOperations[i][1]]);
            }
          }
        break;

      default:
    }
    if (results.length == 0) {
      console.log("Nothing found.");
      return null;
    } else {
      console.log("Found this: ");
      console.log(results);
      return results;
    }
  }
}
                              /* Type     Number   FormatLF   AlF    BlF    Format  Mode*/
                              /*                                                    1 = RD a, WRT b | 2 = RD a, RD b */
let instructionDefinitions =   ["END1         1",
                                "END2         2",
                                "END3        48",
                                "SUBEND      64",
                                "SUBCALL     65",
                                "SUBCALLU    66",
                                "SUBPRG      71",
                                "SUBE        72",
                                "TMR          3",
                                "TMRB        24",
                                "TMRC        54",
                                "TMRBF       77",
                                "DECB        25       1       2       4       0       1",
                                "CTR          5",
                                "CTRC        55       X       1       2       2       1",
                                "CTRB        56       X       1       2       2       1",
                                "ROT          6",  /* Not used, -> undefined */
                                "ROTB        26",  /* Not used, -> undefined */
                                "COD          7",  /* Not used, -> undefined. 4-digit BCD = 2 bytes*/
                                "CODB        27",
                                "MOVE         8",
                                "MOVOR       28",
                                "COM          9",
                                "COME        29",
                                "JMP         10",
                                "JMPE        30",
                                "JMPB        68",
                                "JMPC        73",
                                "LBL         69",
                                "PARI        11",
                                "DCNV        14",
                                "DCNVB       31",
                                "COMP        15",
                                "COMPB       32        1       2       3       0       2",
                                "COIN        16",
                                "SFT         33",
                                "DSCH        17",
                                "DSCHB       34",
                                "XMOV        18",
                                "XMOVB       35",
                                "ADD         19",
                                "ADDB        36",
                                "SUB         20",
                                "SUBB        37",
                                "MUL         21",
                                "MULB        38",
                                "DIV         22",
                                "DIVB        39",
                                "NUME        23",
                                "NUMEB       40",
                                "DISP        49",
                                "DISPB       41",
                                "EXIN        42",
                                "MOVB        43",
                                "MOVW        44",
                                "MOVN        45",
                                "WINDR       51",
                                "WINDW       52",
                                "DIFU        57",
                                "DIFD        58",
                                "AXCTL       53",
                                "EXOR        59",
                                "LOGAND      60",
                                "LOGOR       61",
                                "LOGNOT      62",
                                "FNC90       90",
                                "FNC91       91",
                                "FNC92       92",
                                "FNC93       93",
                                "FNC94       94",
                                "FNC95       95",
                                "FNC96       96",
                                "FNC97       97",
                                "MMC3R       88",
                                "MMC3W       89",
                                "MMCWR       98",
                                "MMCWW       99",
                                "PID        460",
                                "SWITCH      74",
                                "CASE        75",
                                "ENDCASE     76",
                                "EQB        200",
                                "EQW        201",
                                "EQD        202",
                                "NEB        203",
                                "NEW        204",
                                "NED        205",
                                "GTB        206",
                                "GTW        207",
                                "GTD        208",
                                "LTB        209",
                                "LTW        210",
                                "LTD        211",
                                "GEB        212",
                                "GEW        213",
                                "GED        214",
                                "LEB        215",
                                "LEW        216",
                                "LED        217"];

let formatDefinions =          ["PMC_BYTE           1", "PMC_WORD           2", "PMC_DWORD          4", "PMC_CONST_BYTE  0001",
                                "PMC_CONST_WORD  0002", "PMC_CONST_DWORD 0004", "PMC_ADR_BYTE    1001", "PMC_ADR_WORD    1002",
                                "PMC_ADR_DWORD   1004"];
