import { PIXEL_DENSITY, TILE_SIZE_PX } from '../sketch';
import { Frame } from './frame';
import { Layer } from './layer';

export type Tile = {
  x?: number;
  y?: number;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
};

export class PixelDriver {
  public readonly tilesWidth: number;
  public readonly tilesHeight: number;

  private readonly canvasWidth: number;
  private readonly canvasHeight: number;

  constructor() {
    const sketch = document.querySelector('.sketch') as HTMLDivElement;

    this.tilesWidth = Math.floor(sketch.clientWidth / TILE_SIZE_PX);
    this.tilesHeight = Math.floor(sketch.clientHeight / TILE_SIZE_PX);

    this.canvasWidth = this.tilesWidth * TILE_SIZE_PX;
    this.canvasHeight = this.tilesHeight * TILE_SIZE_PX;

    console.log(`PixelDriver Tiles: ${this.tilesWidth}x${this.tilesHeight}`);
    console.log(`PixelDriver Canvas: ${this.canvasWidth}x${this.canvasHeight}`);

    window.p.createCanvas(this.canvasWidth, this.canvasHeight);
    window.p.pixelDensity(PIXEL_DENSITY);
  }

  public write = (source: Layer | Frame) => {
    window.p.loadPixels();

    for (let x = 0; x < this.canvasWidth; x += 1) {
      for (let y = 0; y < this.canvasHeight; y += 1) {
        const mappedX = Math.floor(x / TILE_SIZE_PX);
        const mappedY = Math.floor(y / TILE_SIZE_PX);

        const tile = source.getTile(mappedX, mappedY);
        this.setPixel(x, y, tile.r, tile.g, tile.b, tile.a);
      }
    }
    window.p.updatePixels();
  };

  private setPixel = (x: number, y: number, r: number, g: number, b: number, a: number) => {
    const index = (x + y * this.canvasWidth) * 4;
    window.p.pixels[index] = r;
    window.p.pixels[index + 1] = g;
    window.p.pixels[index + 2] = b;
    window.p.pixels[index + 3] = a;
  };

  // public writeCanvasByPixel = () => {
  //   window.p.loadPixels();
  //   for (let x = 0; x < this.canvasWidth; x += 1) {
  //     for (let y = 0; y < this.canvasHeight; y += 1) {
  //       this.setPixel(x, y, 255, 0, 0, 255);
  //     }
  //   }
  //   window.p.updatePixels();
  // };
}
