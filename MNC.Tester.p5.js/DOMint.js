
/*******************************************************************************
** Definitions
*******************************************************************************/
const tableElementId = "table_element";


/*******************************************************************************
** Action: Generates DOM Elements and fills them according to the query
** Return: null
*******************************************************************************/
document.getElementById("query-submit").onclick = function() {
  /* Clear table */
  removeDOM_Elements(tableElementId);

  let type =  document.getElementById("query-type");  let typeVal = type.options[type.selectedIndex].value;
  let query = document.getElementsByTagName("input")[0].value;

  /* Make a new query */
  MyQueries.push(new Query(Data, typeVal, query));

  /* Make result array iterable. If there's only one result it's not iterable */
  if (isIterable(MyQueries[MyQueries.length - 1].result) == false) {
    MyQueries[MyQueries.length - 1].result.push("dummy");
  }

  /* Create a new row in the table for each result */
  for (let result of MyQueries[MyQueries.length - 1].result) {
    content = parseToOutput(result, typeVal, query);
    if (content != undefined) {
      tabBody =   document.getElementsByTagName("tbody").item(0);
      row =       document.createElement("tr"); row.setAttribute("id", tableElementId);
      c1 =        document.createElement("td");  c1.setAttribute("id", tableElementId);
      c2 =        document.createElement("td");  c2.setAttribute("id", tableElementId);
      c3 =        document.createElement("td");  c3.setAttribute("id", tableElementId);
      c4 =        document.createElement("td");  c4.setAttribute("id", tableElementId);

      txNode1 =   document.createTextNode(content.actionString);
      txNode2 =   document.createTextNode(content.operationString);
      txNode3 =   document.createTextNode(content.moduleString);
      txNode4 =   document.createTextNode(content.lineString);

      c1.appendChild(txNode1);
      c2.appendChild(txNode2);
      c3.appendChild(txNode3);
      c4.appendChild(txNode4);
      row.appendChild(c1);
      row.appendChild(c2);
      row.appendChild(c3);
      row.appendChild(c4);
      tabBody.appendChild(row);
    }
  }
}

/*******************************************************************************
** Action: Removes all DOM Elements which are of the ID "id"
** Return: null
*******************************************************************************/
function removeDOM_Elements(id) {
  while (document.getElementById(id) != null) {
    let elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
  }
}


/*******************************************************************************
** Action: Formats query results into prepared Strings for the DOM Table
** Return: action-, operation-, module- lineString
*******************************************************************************/
function parseToOutput(result, action, query) {
  /* These strings represent one column in the output table */
  let ActionString = query;
  let OperationString = "";
  let ModuleString = "";
  let LineString = "";

  /* Loop trough each property of all objects in result array */
  Object.entries(result).forEach(entry => {
    let key = entry[0]; let value = entry[1];

    /* Pick out the relevant properties for the output */
    switch (key) {
      case "operation":
        if (value != null && OperationString == "") {OperationString = beautify(value);}
        break;
      case "writes":
        if (value != null && OperationString == "") {
          OperationString = "is overwritten by " + result.reads + " (" + result.instruction + ")";
        } break;
      case "reads":
        if (value != null && OperationString == "") {
          OperationString = "is overriding " + result.writes + " (" + result.instruction + ")";
        } break;
      case "inModule":
        if (value != null && ModuleString == "") {
          Object.entries(value).forEach(modAttr => {
            if (modAttr[0] == "sourceFile") {ModuleString = "fc" + modAttr[1] + " | ";}
            if (modAttr[0] == "title")      {ModuleString += modAttr[1];}
          });
        } break;
      case "inLine":
        if (value != null && LineString == "") {LineString = value;} break;
    }
  });

  return {
    actionString: ActionString,
    operationString: OperationString,
    moduleString: ModuleString,
    lineString: LineString
  }
}


/*******************************************************************************
** Action: Formats the OperationString according to it's content
** Return: Formatted OperationString
*******************************************************************************/
function beautify(op) {
  let r = "is ";
  switch (true) {
    case op.includes("RD.NOT")  ||
         op.includes("AND.NOT") ||
         op.includes("OR.NOT"):    r = r + "negated-read (" + op + ")"; break;
    case op.includes("RD")      ||
         op.includes("OR")      ||
         op.includes("AND"):       r = r + "read (" + op + ")"; break;
    case op.includes("WRT.NOT"):   r = r + "un-written (" + op + ")"; break;
    case op.includes("WRT"):       r = r + "written (" + op + ")"; break;
    case op.includes("RST"):       r = r + "reset (" + op + ")"; break;
    case op.includes("SET"):       r = r + "set (" + op + ")";  break;
    default: console.log("Couldn't find " + op + " in beautify Cases");
  }
  r = r + " in";
  return r;
}
