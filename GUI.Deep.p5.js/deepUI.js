// deepUI Core
// simon schödler
// 15.01.2019

// var def
let tileAmountWidth = 6;
let tileWidth;
let tileAmountHeight = 6;
let tileHeight;
let tileRadius = 1;
var imgBg;
var mainC;
var borderC;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // create background image. make background 51 while loading
  background(51);
  loadImage("RockFace.jpg", function(imgBg) {
    image(imgBg, 0, 0);
  });

  // calculate tile size according to inner dimensions
  calcTileSize();

  mainC   = color(010,010,010,090);     // dark
  borderC = color(000,000,000,000);     // transparent

  const t1 = new Tile(tileWidth, tileHeight, tileRadius)

  t1.makeAt(tileWidth / 2, tileHeight / 2);

  console.log(t1);
}

function draw() {}

function calcTileSize() {
  tileWidth = window.innerWidth  / tileAmountWidth;
  tileHeight = window.innerHeight / tileAmountHeight;
}



class Tile {
  constructor(width, height, radius) {
    this.width = width;
    this.height = height;
    this.radius = radius;
  }

  makeAt(posWidth, posHeight) {
    this.posWidth = posWidth;
    this.posHeight = posHeight;
    // draw rectangle
    fill(mainC);
    stroke(borderC);
    rect(this.posWidth, this.posHeight, this.width, this.height, this.radius);
  }
}
