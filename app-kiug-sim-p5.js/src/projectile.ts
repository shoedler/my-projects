import { Vector } from "p5";
import { Entity, State } from "./sketch";

export class Projectile implements Entity {
  constructor(
    public pos: Vector,
    public acc: Vector,
    public vel: Vector,
    public damage: number,
    public markedForDeletion = false
  ) {
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
    const hit = this.collides(state);

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

  private collides(state: State) {
    const hit = state.soldiers.find(soldier => {
      const distance = this.pos.dist(soldier.pos);
      return distance < 5;
    });

    return hit;
  }
}
