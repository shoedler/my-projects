import { Layer } from './layer';
import { PixelDriver, Tile } from './pixel-driver';

export class Frame {
  public readonly layers = [Layer.make(this.driver)];

  public get baseLayer() {
    return this.layers[this.layers.length - 1];
  }

  private constructor(private readonly driver: PixelDriver) {}

  public static make = (driver: PixelDriver) => new Frame(driver);

  public addLayer = (): Layer => {
    const layer = Layer.make(this.driver);
    this.layers.unshift(layer);
    return layer;
  };

  public getTile = (x: number, y: number): Tile => {
    let tile: Tile;
    let alpha = 0;

    for (const layer of this.layers) {
      tile = layer.getTile(x, y) ?? { a: 0 };
      alpha += tile.a;

      if (alpha >= 255) {
        break;
      }
    }

    return tile;
  };
}
