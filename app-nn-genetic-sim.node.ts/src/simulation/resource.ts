import { randomNearbyPosition } from "./util";

export enum ResourceType {
  Food,
  Water,
  Wood,
}

const RESOURCE_RADIUS = 3;

export class Resource {
  constructor(
    public position: { x: number; y: number },
    public type: ResourceType
  ) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle =
      this.type === ResourceType.Food
        ? "green"
        : this.type === ResourceType.Water
        ? "blue"
        : "brown";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, RESOURCE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class ResourceSpawn {
  private workProgress: number = 0;
  private workNeeded: number = 10; // Adjusted value for work needed to spawn a resource

  constructor(
    public position: { x: number; y: number },
    public type: ResourceType
  ) {}

  interact(strength: number) {
    this.workProgress += strength;
    if (this.workProgress >= this.workNeeded) {
      this.workProgress = 0;
      const output = [];
      const amount = Math.random() * 3 + 1;
      for (let i = 0; i < amount; i++) {
        output.push(
          new Resource(randomNearbyPosition(this.position, 20), this.type)
        );
      }
      return output;
    }
    return [];
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle =
      this.type === ResourceType.Food
        ? "green"
        : this.type === ResourceType.Water
        ? "blue"
        : "brown";
    ctx.strokeRect(this.position.x - 10, this.position.y - 10, 20, 20);
  }
}
