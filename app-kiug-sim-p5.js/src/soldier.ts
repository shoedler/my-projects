import { Vector } from 'p5';
import { Entity, State } from './sketch';
import { Projectile } from './projectile';

export const SOLDIER_FOV_DEGREES = 135;
export const SOLDIER_DETECTION_RANGE = 100;

enum SoldierState {
  patrolling,
  shooting,
}

export class Soldier implements Entity {
  constructor(
    public id: string,
    public pos: Vector, // Position of the soldier. Origin is the top left corner of the canvas.
    public vel: Vector, // Velocity of the soldier. Origin is the soldier's position.
    public acc: Vector, // Acceleration of the soldier. Origin is the soldier's position.
    public hdg: Vector, // Where the soldier is looking. Origin is the soldier's position.

    public health: number,
    public highlight: false | 'orange' | 'red' | 'blue' = false,
    public state: SoldierState = SoldierState.patrolling,
    public markedForDeletion = false
  ) {}

  public update(state: State) {
    if (this.state === SoldierState.patrolling) this.patrol(state);
    if (this.state === SoldierState.shooting) this.shoot(state);

    if (this.health <= 0) {
      this.markedForDeletion = true;
    }
  }

  private patrol(state: State) {
    // Move
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // Create random, but plausible acceleration.
    this.acc = Vector.random2D();
    this.acc.mult(0.1);

    // Stop every once in a while.
    if (Math.random() < 0.01) this.vel.mult(0);

    // Make the heading gradually point in the direction of the velocity.
    this.hdg.lerp(this.vel, 0.03);

    // Scan for other soldiers
    const inRange = this.scan(state.soldiers);
    if (inRange.length > 0) {
      this.state = SoldierState.shooting;
    }
  }

  private shoot(state: State) {
    // Stop in place
    this.vel.mult(0);
    this.acc.mult(0);

    // Scan for targets
    const targets = this.scan(state.soldiers);
    if (targets.length === 0) {
      this.state = SoldierState.patrolling;
      return;
    }

    // Pick a target
    const target = targets[0];

    // Aim at the target
    const targetPosRel = target.pos.copy().sub(this.pos);
    const targetHdg = targetPosRel.copy().normalize();
    this.hdg.lerp(targetHdg, 0.1);

    // TODO: Use timer to control rate of fire.
    // For now, shoot randomly.
    if (Math.random() < 0.01) {
      const projectile = new Projectile(this.pos.copy(), this.hdg.copy().normalize().mult(5), new Vector(0, 0), 10);
      state.projectiles.push(projectile);
    }
  }

  private scan(soldiers: Soldier[]) {
    const inRange = soldiers.filter((soldier) => {
      if (soldier === this) return false;

      const distance = this.pos.dist(soldier.pos);

      const soldierPosRel = soldier.pos.copy().sub(this.pos);
      const dot = this.hdg.dot(soldierPosRel);
      const angleRad = Math.acos(dot / (this.hdg.mag() * soldierPosRel.mag()));
      const angle = angleRad * (180 / Math.PI);

      return distance < SOLDIER_DETECTION_RANGE && distance >= 0 && Math.abs(angle) < SOLDIER_FOV_DEGREES / 2;
    });

    return inRange;
  }
}
