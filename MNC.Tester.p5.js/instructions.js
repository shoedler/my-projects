
function InstructionFunctionalityData(instrArr, instrNbr, lines, index) {
  missingLogic = [];
  for (let i = 0; i < instrArr.length; i++) {
    if (instrNbr == instrArr[i].number) {
      switch (instrArr[i].type) {
        case "XMOVB":
          break;
        case "COMPB":
          break;
        case "CODB":
          break;
        default:
          /* Collect Subs which appear in the mnemonic, are defined but aren't
          handled in code */
          missingLogic.push(instrArr[i]);
      }
    } /* Match Instruction number */
  }

  if (missingLogic.length > 0) {
    console.log("This mnemonic uses Instructions which are not handled in code: ");
    console.log(missingLogic);
  }

  return null
  // must output read / write / either array with the correct data format, e.g. R8100-R8102

}
