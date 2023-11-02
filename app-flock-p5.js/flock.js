const isOutsideBoundaries = (b) =>
  b.position.x > width || b.position.x < 0 || b.position.y > height || b.position.y < 0;

/**
 * @summary Specifies a flock entity
 * @class Flock
 * @property {number} [boidSize=5] Size of the rendered Boid. Has no effect on the flocking algorithms - only visual
 * @property {number} [maxVelocity=2] Maximum velocity limit
 * @property {degrees} [fieldOfView=300] FOV angle
 * @property {number} [alignmentRadius=50] FOV radius to check for neighbors for the alignment component
 * @property {number} [cohesionRadius=70] FOV radius to check for neighbors for the cohesion component
 * @property {number} [separationRadius=20] FOV radius to check for neighbors for the separation component
 * @property {number} [maxForceAlignment=0.005] Maximum force applied for the alignment component
 * @property {number} [maxForceCohesion=0.003] Maximum force applied for the cohesion component
 * @property {number} [maxForceSeparation=0.009] Maximum force applied for the separation component
 * @property {number} [weightAlignment=1] Weighting multiplier for the alignment component
 * @property {number} [weightCohesion=1] Weighting multiplier for the cohesion component
 * @property {number} [weightSeparation=1] Weighting multiplier for the separation component
 * @property {bool} [showAlignmentVector=false] Debug: show useful vectors for the alignment component
 * @property {bool} [showAlignmentFieldOfView=false] Debug: show FOV Overlay for the alignment component
 * @property {bool} [showCohesionVector=false] Debug: show useful vectors for the cohesion component
 * @property {bool} [showCohesionFieldOfView =false] Debug: show FOV Overlay for the cohesion component
 * @property {bool} [showSeparationVector=false] Debug: show useful vectors for the separation component
 * @property {bool} [showSeparationFieldOfView=false] Debug: show FOV Overlay for the separation component
 * @property {bool} [showFieldOfView=false] Debug: show general FOV Overlay
 */
class Flock {
  /**
   * @summary Creates an instance of Flock
   * @param {number} amount Initial boid population amount
   * @memberof Flock
   */
  constructor(amount) {
    this.boids = [];
    this.push(amount);

    this.boidSize = 5;
    this.setPopulationProperty('boidSize');
    this.maxVelocity = 2;
    this.setPopulationProperty('maxVelocity');
    this.fieldOfView = 300;
    this.setPopulationProperty('fieldOfView');

    this.alignmentRadius = 50.0;
    this.setPopulationProperty('alignmentRadius');
    this.cohesionRadius = 70.0;
    this.setPopulationProperty('cohesionRadius');
    this.separationRadius = 20.0;
    this.setPopulationProperty('separationRadius');

    this.maxForceAlignment = 0.005;
    this.setPopulationProperty('maxForceAlignment');
    this.maxForceCohesion = 0.003;
    this.setPopulationProperty('maxForceCohesion');
    this.maxForceSeparation = 0.009;
    this.setPopulationProperty('maxForceSeparation');

    this.weightSeparation = 1;
    this.setPopulationProperty('weightSeparation');
    this.weightAlignment = 1;
    this.setPopulationProperty('weightAlignment');
    this.weightCohesion = 1;
    this.setPopulationProperty('weightCohesion');

    this.showAlignmentVector = false;
    this.setPopulationProperty('showAlignmentVector');
    this.showAlignmentFieldOfView = false;
    this.setPopulationProperty('showAlignmentFieldOfView');
    this.showCohesionVector = false;
    this.setPopulationProperty('showCohesionVector');
    this.showCohesionFieldOfView = false;
    this.setPopulationProperty('showCohesionFieldOfView');
    this.showSeparationVector = false;
    this.setPopulationProperty('showSeparationVector');
    this.showSeparationFieldOfView = false;
    this.setPopulationProperty('showSeparationFieldOfView');
    this.showFieldOfView = false;
    this.setPopulationProperty('showFieldOfView');
  }

  /**
   * @summary Updates the boid population with the property value of this flock
   * @param {string} prop Property to set
   * @memberof Flock
   */
  setPopulationProperty = (prop) => {
    this.boids.forEach((b) => {
      b[prop] = this[prop];
    });
  };

  /**
   * @summary Pushes the desired amount of new boids to the population
   * @param {number} amount Amount of new boids
   * @memberof Flock
   */
  push = (amount) => {
    for (let i = 0; i < amount; i++) {
      this.boids.push(new Boid(random(0, width), random(0, height), i));
    }
  };

  /**
   * @summary Pops the desired amount of boids from the population
   * @param {number} amount Amount of boids to be removed
   * @memberof Flock
   */
  pop = (amount) => {
    for (let i = 0; i < amount; i++) {
      this.boids.pop();
    }
  };

  /**
   * @summary Calculates the next frame for the whole boid population
   * @memberof Flock
   */
  nextFrame = () => {
    /* Loop over each boid of the population. Calculate its alignment, cohesion and separation components */
    this.boids.forEach((current) => {
      let alignmentNeighborSum = createVector(0, 0);
      let alignmentCounter = 0;
      let separationNeighborSum = createVector(0, 0);
      let separationCounter = 0;
      let cohesionNeighborSum = createVector(0, 0);
      let cohesionCounter = 0;

      /* Loop over each boid of the population as a neighbor, check if it's in the desired radius for each component */
      this.boids.forEach((other) => {
        /* Only check if it's not us */
        if (current.id != other.id) {
          /* Get distance between 'current' and 'other' (potential neighbor) boid */
          let d = p5.Vector.dist(current.position, other.position);

          /* Sum up neighbors velocity for alignment */
          if (d < current.alignmentRadius) {
            /* Get angle. Subtract 'current' position to move 'other' position to the 0, 0 origin.
            the heading of the 'current' boid is determined by its velocity vector, which is also relative to the 0, 0 origin. */
            let a = p5.Vector.sub(current.position, other.position);
            let angle = degrees(a.angleBetween(current.velocity));
            if (angle <= 180 && angle >= 180 - current.fieldOfView / 2) {
              /* Debug: Visualize distance to detected neighbor */
              if (current.showAlignmentVector)
                visualize(current.position, p5.Vector.sub(other.position, current.position), color(200, 100, 0), 1, 1);

              alignmentNeighborSum.add(other.velocity);
              alignmentCounter++;
            }
          }

          /* Sum up neigbors velocity vectors for cohesion */
          if (d < current.cohesionRadius) {
            /* Get angle. Subtract 'current' position to move 'other' position to the 0, 0 origin.
            the heading of the 'current' boid is determined by its velocity vector, which is also relative to the 0, 0 origin. */
            let a = p5.Vector.sub(current.position, other.position);
            let angle = degrees(a.angleBetween(current.velocity));
            if (angle <= 180 && angle >= 180 - current.fieldOfView / 2) {
              /* Debug: Visualize distance to detected neighbor */
              if (current.showCohesionVector)
                visualize(current.position, p5.Vector.sub(other.position, current.position), color(100, 0, 100), 1, 1);

              cohesionNeighborSum.add(other.position);
              cohesionCounter++;
            }
          }

          /* Sum up neighbors position delta for separation */
          if (d < current.separationRadius) {
            /* Get angle. Subtract 'current' position to move 'other' position to the 0, 0 origin.
            the heading of the 'current' boid is determined by its velocity vector, which is also relative to the 0, 0 origin. */
            let a = p5.Vector.sub(current.position, other.position);
            let angle = degrees(a.angleBetween(current.velocity));
            if (angle <= 180 && angle >= 180 - current.fieldOfView / 2) {
              let distance = p5.Vector.sub(current.position, other.position);

              /* Debug: Visualize distance to detected neighbor */
              if (current.showSeparationVector) visualize(other.position, distance, color(200, 100, 100), 1, 1);

              separationNeighborSum.add(distance);
              separationCounter++;
            }
          }
        }
      });

      /* Evaluate components */
      this.evalAlignment(current, alignmentNeighborSum, alignmentCounter);
      this.evalCohesion(current, cohesionNeighborSum, cohesionCounter);
      this.evalSeparation(current, separationNeighborSum, separationCounter);
    });

    /* Update population */
    this.boids.forEach((b) => {
      b.applyForces();
      b.border();
      b.render();
    });
  };

  /**
   * @summary Calculates and applies the correction from the alignment component
   * @param {Boid} current Currently selected boid
   * @param {p5Vector} neighborSum Sum of neighbors distance to this boid ('current' boid)
   * @param {number} neighborCount Amount of neighbors found - used to average the neighborSum value
   * @memberof Flock
   */
  evalAlignment = (current, neighborSum, neighborCount) => {
    if (neighborCount > 0) {
      neighborSum.div(neighborCount);
      neighborSum.normalize();
      neighborSum.mult(current.maxVelocity);

      let alignmentCorrection = p5.Vector.sub(neighborSum, current.velocity);

      /* Visualize alignment vectors */
      if (current.showAlignmentVector) {
        let l = p5.Vector.lerp(alignmentCorrection, current.velocity, 0.5);
        visualize(current.position, current.velocity, color(150, 150, 0), 1, 50);
        visualize(current.position, alignmentCorrection, color(255, 255, 0), 1, 50);
        visualize(current.position, l, color(50, 50, 0), 1, 50);
      }

      alignmentCorrection.limit(current.maxForceAlignment);
      alignmentCorrection.mult(current.weightAlignment);
      current.courseCorrection.add(alignmentCorrection);
    }
  };

  /**
   * @summary Calculates and applies the correction from the cohesion component
   * @param {Boid} current Currently selected boid
   * @param {p5Vector} neighborSum Sum of neighbors position vectors
   * @param {number} neighborCount Amount of neighbors found - used to average the neighborSum value
   * @memberof Flock
   */
  evalCohesion = (current, neighborSum, neighborCount) => {
    if (neighborCount > 0) {
      neighborSum.div(neighborCount);

      /* Reynold's steering algorithm */
      let difference = p5.Vector.sub(neighborSum, current.position);
      difference.normalize();
      difference.mult(current.maxVelocity);

      let cohesionCorrection = p5.Vector.sub(difference, current.velocity);

      /* Debug: Visualize cohesion vectors */
      if (current.showCohesionVector) {
        visualize(current.position, cohesionCorrection, color(0, 0, 155), 1, 50);
      }

      cohesionCorrection.limit(current.maxForceCohesion);
      cohesionCorrection.mult(current.weightCohesion);
      current.courseCorrection.add(cohesionCorrection);
    }
  };

  /**
   * @summary Calculates and applies the correction from the separation component
   * @param {Boid} current Currently selected boid
   * @param {p5Vector} neighborSum Sum of neighbors velocity vectors
   * @param {number} neighborCount Amount of neighbors found - used to average the neighborSum value
   * @memberof Flock
   */
  evalSeparation = (current, neighborSum, neighborCount) => {
    if (neighborCount > 0) {
      neighborSum.div(neighborCount);

      /* Debug: Visualize get-away vector */
      if (current.showSeparationVector) visualize(current.position, neighborSum, color(0, 255, 0), 1, 1);

      neighborSum.normalize();
      neighborSum.mult(current.maxForceSeparation);
      let separationCorrection = p5.Vector.sub(neighborSum, current.velocity);

      /* Debug: Visualize separation vector */
      if (current.showSeparationVector) {
        let l = p5.Vector.lerp(neighborSum, current.velocity, 0.5);
        visualize(current.position, l, color(0, 150, 0), 1, 80);
      }

      separationCorrection.limit(current.maxForceSeparation);
      separationCorrection.mult(current.weightSeparation);
      current.courseCorrection.add(neighborSum);
    }
  };

  /**
   * @summary Checks population against boundaries
   * @returns {bool} true, if the entire population is outside of the boundaries
   * @memberof Flock
   */
  bounds = () => {
    return this.boids.every(isOutsideBoundaries);
  };
}
