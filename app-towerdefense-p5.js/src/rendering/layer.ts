import { PixelDriver, Tile } from './pixel-driver';

export class Layer {
  public readonly tiles: Tile[];

  private constructor(public readonly width: number, public readonly height: number) {
    this.tiles = new Array(width * height);
  }

  public static make = (driver: PixelDriver) => new Layer(driver.tilesWidth, driver.tilesHeight);

  public setTile = (x: number, y: number, r: number, g: number, b: number, a: number) => {
    const index = x + y * this.width;
    this.tiles[index] = { x, y, r, g, b, a };
  };

  public removeTile = (x: number, y: number) => {
    const index = x + y * this.width;
    this.tiles[index] = undefined;
  };

  public getTile = (x: number, y: number) => {
    const index = x + y * this.width;
    return this.tiles[index];
  };
}
