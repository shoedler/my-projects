
function InstructionFunctionalityData(res, match, index) {
  for (let i = 0; i < res.Instructions.length; i++) {
    if (match == res.Instructions[i].number) {

      switch (res.Instructions[i].instruction) {
        case "XMOVB":
          break;
        case "COMPB":
          break;
        case "CODB":
          break;
        default:
          /* Collect Subs which appear in the mnemonic and are defined but aren't
          handled in code */
      }
    } /* Match Instruction number */
  }

  return null
  // must output read / write / either array with the correct data format, e.g. R8100-R8102 for 2 bytes

}
