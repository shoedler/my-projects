import { Vector } from 'p5';
import { State } from './sketch';
import { Entity } from './entity';

export class Projectile extends Entity {
  public damage: number;
  public markedForDeletion = false;

  constructor(pos: Projectile['pos'], acc: Projectile['acc'], vel: Projectile['vel'], damage: Projectile['damage']) {
    super();
    this.pos = pos;
    this.acc = acc;
    this.vel = vel;

    this.damage = damage;

    // Fire the projectile
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  public update(state: State) {
    // Move & slow down
    this.pos.add(this.vel);
    this.vel.mult(0.99);
    this.damage *= 0.999;

    // Check for collisions
    const hit = state.soldiers.find((soldier) => this.collides(soldier));

    if (hit) {
      // Deviate the trajectory
      const deviation = Vector.random2D();
      deviation.mult(0.1);
      this.vel.add(deviation);

      // Slow down
      this.acc.mult(0.7);

      // Deal damage
      hit.health -= this.damage;
      console.log(hit.id, hit.health);
    }

    // Remove if almost stopped
    if (this.vel.mag() < 0.1) {
      this.markedForDeletion = true;
    }
  }
}
