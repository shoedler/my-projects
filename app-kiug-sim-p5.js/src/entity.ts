import { Vector } from 'p5';
import { State } from './sketch';

export abstract class Entity {
  public markedForDeletion: boolean;

  public pos: Vector = new Vector(0, 0);
  public vel: Vector = new Vector(0, 0);
  public acc: Vector = new Vector(0, 0);

  public hitboxRadius: number = 5;

  abstract update(state: State): void;

  public collides(entity: Entity) {
    const distance = this.pos.dist(entity.pos);
    return distance < this.hitboxRadius;
  }
}
