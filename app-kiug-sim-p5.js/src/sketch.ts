import p5, { Vector } from 'p5';
import { SOLDIER_DETECTION_RANGE, SOLDIER_FOV_DEGREES, Soldier } from './soldier';
import { Projectile } from './projectile';

export type State = {
  soldiers: Soldier[];
  projectiles: Projectile[];
};

export interface Entity {
  update(state: State): void;
  markedForDeletion: boolean;
}

export const simulation = (p: p5) => {
  const state: State = {
    projectiles: [],
    soldiers: [
      new Soldier(
        'soldier-0',
        p.createVector(100, 100),
        p.createVector(0, 0),
        p.createVector(0, 0),
        p.createVector(1, 0),
        100,
        'blue'
      ),
      new Soldier(
        'soldier-1',
        p.createVector(150, 150),
        p.createVector(0, 0),
        p.createVector(0, 0),
        p.createVector(1, 0),
        100,
        'red'
      ),
      new Soldier(
        'soldier-2',
        p.createVector(50, 150),
        p.createVector(0, 0),
        p.createVector(0, 0),
        p.createVector(1, 0),
        100,
        'red'
      ),
    ],
  };

  p.setup = () => {
    const sketch = document.querySelector('.sketch') as HTMLDivElement;

    p.createCanvas(sketch.clientWidth, sketch.clientHeight);
    p.angleMode(p.DEGREES);
    p.background(31);

    console.log(p.width, p.height);

    // for (let i = 0; i < 10; i++) {
    //   const id = `soldier-${i}`;
    //   const pos = p.createVector(p.random(p.width), p.random(p.height));
    //   const vel = p.createVector(0, 0);
    //   const acc = p.createVector(0, 0);

    //   // Make the soldier look in a random direction. (The origin for hdg is the soldier's position.)
    //   const hdg = p.createVector(p.random(-1, 1), p.random(-1, 1));

    //   state.soldiers.push(new Soldier(id, pos, vel, acc, hdg, 100));
    // }
  };

  p.draw = () => {
    p.background(31);

    for (const projectile of state.projectiles) {
      projectile.update(state);

      // Draw the projectile.
      p.fill(255, 255, 255);
      p.circle(projectile.pos.x, projectile.pos.y, projectile.damage);

      // If out of bounds, bounce
      if (projectile.pos.x > p.width) projectile.vel.x *= -1;
      if (projectile.pos.x < 0) projectile.vel.x *= -1;
      if (projectile.pos.y > p.height) projectile.vel.y *= -1;
      if (projectile.pos.y < 0) projectile.vel.y *= -1;
    }

    // Remove projectiles that are marked for deletion.
    state.projectiles = state.projectiles.filter((projectile) => !projectile.markedForDeletion);

    for (const soldier of state.soldiers) {
      soldier.update(state);

      // Draw the soldier.
      p.fill(255, 255, 255);
      if (soldier.highlight) p.fill(soldier.highlight);
      p.circle(soldier.pos.x, soldier.pos.y, 20);

      // If out of bounds, bounce
      if (soldier.pos.x > p.width) soldier.vel.x *= -1;
      if (soldier.pos.x < 0) soldier.vel.x *= -1;
      if (soldier.pos.y > p.height) soldier.vel.y *= -1;
      if (soldier.pos.y < 0) soldier.vel.y *= -1;

      // Show where the soldier is looking.
      p.stroke(10, 10, 10);
      p.strokeWeight(7);
      p.line(soldier.pos.x, soldier.pos.y, soldier.pos.x + soldier.hdg.x * 10, soldier.pos.y + soldier.hdg.y * 10);
      p.strokeWeight(2);

      // Show the soldier's FOV (from hdg).
      p.push();
      p.translate(soldier.pos.x, soldier.pos.y);
      p.rotate(soldier.hdg.heading());
      p.fill(10, 10, 10, 30);
      p.stroke(10, 10, 10, 120);
      p.arc(
        0,
        0,
        SOLDIER_DETECTION_RANGE * 2,
        SOLDIER_DETECTION_RANGE * 2,
        -SOLDIER_FOV_DEGREES / 2,
        SOLDIER_FOV_DEGREES / 2
      );
      p.pop();
    }

    // Remove soldiers that are marked for deletion.
    state.soldiers = state.soldiers.filter((soldier) => !soldier.markedForDeletion);
  };
};
