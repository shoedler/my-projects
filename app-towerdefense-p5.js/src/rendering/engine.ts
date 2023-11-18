import { Frame } from './frame';
import { PixelDriver } from './pixel-driver';

export class Engine {
  private frame: Frame;
  private lastRender: number = 0;
  private readonly targetFrameTime: number;

  constructor(private readonly driver: PixelDriver, fps: number) {
    this.lastRender = Date.now();
    this.targetFrameTime = 1000 / fps;
  }

  public useFrame = () => {
    this.frame = Frame.make(this.driver);
    return this.frame;
  };

  public render = () => {
    const now = Date.now();
    const delta = now - this.lastRender;

    if (delta > this.targetFrameTime && this.frame) {
      this.driver.write(this.frame);
      this.lastRender = now - (delta % this.targetFrameTime);
    }
  };
}
