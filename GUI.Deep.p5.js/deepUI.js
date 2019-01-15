// deepUI Core
// simon schödler
// 15.01.2019

// var def
let wTiles = 6;
let wTileSize;
let hTiles = 6;
let hTileSize;
var imgBg;
var mainC;
var borderC;

function preload() {
  imgBg = loadImage('/RockFace.jpg');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(imgBg);

  calcTiles();

  mainC = color(010,010,010,90);
  borderC = color(000,000,000,100);     // transparent

  fill(mainC);
  stroke(borderC);
  rect(wTileSize / 2, hTileSize / 2, wTileSize, hTileSize);
}

function draw() {

}

function calcTiles() {
  wTileSize = window.innerWidth  / wTiles;
  hTileSize = window.innerHeight / hTiles;
}
