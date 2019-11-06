let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let dataSet;
let dataSetLines = [];
let dataSetInput;
let dataSetButton;

let d = new Diagram(wWidth / 20, wHeight / 5);

function setup()
{
  dataSetInput = createInput("")
  dataSetButton = createButton("Load");

  createCanvas(wWidth, wHeight);
  textFont("consolas");

  // d.addLine("School", 255, 100, 100);
  // d.addLinePoints("School",   0, 20);
  // d.addLinePoints("School", 10, 10);
  // d.addLinePoints("School", 50, 50);
  // d.addLinePoints("School", 180, 80);
  // d.addLinePoints("School", 365,40);
  //
  // d.addLine("Sola", 100, 100, 255);
  // d.addLinePoints("Sola",  0,   0);
  // d.addLinePoints("Sola", 30,  40);
  // d.addLinePoints("Sola", 80, 100);
  // d.addLinePoints("Sola", 180, 80);
  // d.addLinePoints("Sola", 365, 10);
  //
  // d.addLine("Test", 255, 255, 100);
  // d.addLinePoints("Test",  0,   0);
  // d.addLinePoints("Test", 40,  100);
  // d.addLinePoints("Test", 90, 30);
  // d.addLinePoints("Test", 190, 90);
  // d.addLinePoints("Test", 365, 0);

  console.log(d);
  gui();
}

function draw()
{
  background(51);
  gui();

  dataSetButton.mousePressed(loadDataSet)

  d.showGrid();
  d.showTags();
  d.showLines();
  d.showLegend();
}

function windowResized()
{
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  resizeCanvas(wWidth, wHeight);
}

function loadDataSet()
{
  dataSet = dataSetInput.value();

  if (dataSet == "" )
  {
    alert("Nichts eingegeben");
  }
  else
  {
    dataSetInput.value = ("");
    dataSetLines = handleDataSet(dataSet);
    console.log(dataSetLines);
  }
}

function handleDataSet(str)
{
  let lines = [];
  let categories = [];
  let dataLine = [];

  lines = str.split(/\s/g);
  categories = lines[0].split(/\;/g);
  categories.splice(0,1); // remove "Day" label

  // get categories (in line 0). start at index 1, since the first row contains only indexes and the "Day" label
  for (let i = 1; i < categories.length; i++)
  {
    if (categories[i] == "")
    {
      categories.splice(i);
      break;
    }
  }

  // create new lines of categories
  for (let cat of categories)
  {
    d.addLine(cat, random(100, 255), random(100, 255), random(100, 255));
  }

  // go trough each data line
  for (let j = 1; j < lines.length; j++)
  {
    dataLine = lines[j].split(/\;/g);

    // go trough each value in one line, start at index 1, since the first row contains only indexes and the "Day" label
    for(let ii = 1; ii < dataLine.length; ii++)
    {
      if (dataLine[ii] != "")
      {
        d.addLinePoints(categories[ii - 1], j, dataLine[ii]);
      }
    }
  }
}


function gui()
{
  dataSetInput.position(wWidth / 20, wHeight / 20);
  dataSetButton.position(wWidth / 20, (wHeight / 20) * 2);

  dataSetInput.style('width', String(round(wWidth / 4)) + 'px');
  dataSetInput.style('font-family', 'consolas');
  dataSetInput.style('color', 'rgb(255, 255, 255)');
  dataSetInput.style('border-color', 'rgb(255, 255, 255)');
  dataSetInput.style('border-width', '1px');
  dataSetInput.style('background-color', 'rgba(0,0,0,0)');

  dataSetButton.style('width', String(round(wWidth / 4)) + 'px');
  dataSetButton.style('font-family', 'consolas');
  dataSetButton.style('color', 'rgb(255, 255, 255)');
  dataSetButton.style('border-color', 'rgb(255, 255, 255)');
  dataSetButton.style('border-width', '1px');
  dataSetButton.style('background-color', 'rgba(0,0,0,0)');
  dataSetButton.style('border-style', 'dotted');
}
