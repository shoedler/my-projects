/**
 * @summary Specifies a single flock entity - a Boid
 * @property {number} id Unique identifier (Population Index)
 * @property {p5Vector} position Current position vector
 * @property {p5Vector} velocity Current velocity vector (Origin = position)
 * @property {p5Vector} courseCorrection Current correction vector (alignment, cohesion, separation) (Origin = position)
 * @property {p5Color} colorBody Main color of this boid
 * @property {p5Color} colorStroke Stroke color of this boid
 * @property {number} boidSize Size of the rendered Boid. Has no effect on the flocking algorithms - only visual
 * @property {number} maxVelocity Maximum velocity limit
 * @property {degrees} fieldOfView FOV angle
 * @property {number} maxForceAlignment Maximum force applied for the alignment component
 * @property {number} maxForceCohesion Maximum force applied for the cohesion component
 * @property {number} maxForceSeparation Maximum force applied for the separation component
 * @property {number} alignmentRadius FOV radius to check for neighbors for the alignment component
 * @property {number} cohesionRadius FOV radius to check for neighbors for the cohesion component
 * @property {number} separationRadius FOV radius to check for neighbors for the separation component
 * @property {number} weightAlignment Weighting multiplier for the alignment component
 * @property {number} weightCohesion Weighting multiplier for the cohesion component
 * @property {number} weightSeparation Weighting multiplier for the separation component
 * @property {bool} showAlignmentVector Debug: show useful vectors for the alignment component
 * @property {bool} showAlignmentFieldOfView Debug: show FOV Overlay for the alignment component
 * @property {bool} showCohesionVector Debug: show useful vectors for the cohesion component
 * @property {bool} showCohesionFieldOfView  Debug: show FOV Overlay for the cohesion component
 * @property {bool} showSeparationVector Debug: show useful vectors for the separation component
 * @property {bool} showSeparationFieldOfView Debug: show FOV Overlay for the separation component
 * @property {bool} showFieldOfView Debug: show general FOV Overlay
 * @class Boid
 */
class Boid {
  /**
   * @summary Creates an instance of Boid.
   * @param {number} [x=0] Initial x position
   * @param {number} [y=0] Initial y position
   * @param {number} [id=0] Unique identifier (Population Index)
   * @memberof Boid
   */
  constructor(x, y, id) {
    this.id = id;
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.courseCorrection = createVector(0, 0);

    this.colorBody = cBoid;
    this.colorStroke = cBoidStroke;

    /* The following properties are set upon instantiation of a Flock object */
    this.boidSize;
    this.maxVelocity;
    this.fieldOfView;

    this.maxForceAlignment;
    this.maxForceCohesion;
    this.maxForceSeparation;

    this.alignmentRadius;
    this.cohesionRadius;
    this.separationRadius;

    this.weightAlignment;
    this.weightCohesion;
    this.weightSeparation;

    this.showAlignmentVector;
    this.showAlignmentFieldOfView;
    this.showCohesionVector;
    this.showCohesionFieldOfView;
    this.showSeparationVector;
    this.showSeparationFieldOfView;
    this.showFieldOfView;
  }

  /**
   * @summary Highlights this boid
   * @memberof Boid
   */
  highlight = () => {
    this.colorBody = cFocused;
    this.colorStroke = cFocusedStroke;
  };

  /**
   * @summary Draws this boid at its current position and heading
   * @memberof Boid
   */
  render = () => {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(90));

    noStroke();

    /* Debug: Visualize FOV overlays */
    if (this.showAlignmentFieldOfView) overlayFOV(this.alignmentRadius, this.fieldOfView, color(200, 200, 100, 15));
    if (this.showCohesionFieldOfView) overlayFOV(this.cohesionRadius, this.fieldOfView, color(100, 100, 255, 15));
    if (this.showSeparationFieldOfView) overlayFOV(this.separationRadius, this.fieldOfView, color(100, 255, 100, 15));
    if (this.showFieldOfView)
      overlayFOV(
        (this.alignmentRadius + this.cohesionRadius + this.separationRadius) / 3,
        this.fieldOfView,
        color(255, 255, 255, 15)
      );

    fill(this.colorBody);
    stroke(this.colorStroke);

    beginShape();
    vertex(0, 0);
    vertex(-this.boidSize / 2, this.boidSize * 2);
    vertex(this.boidSize / 2, this.boidSize * 2);
    endShape(CLOSE);
    pop();
  };

  /**
   * @summary Updates this boids velocity and its position values
   * @memberof Boid
   */
  applyForces = () => {
    this.velocity.add(this.courseCorrection);
    this.velocity.limit(this.maxVelocity);

    this.position.add(this.velocity);

    /* Reset courseCorrection after each update */
    this.courseCorrection.mult(0);
  };

  /**
   * @summary Checks for canvas borders and handles Wrap-around
   * @memberof Boid
   */
  border = () => {
    if (this.position.x < -this.boidSize) this.position.x = width + this.boidSize;
    if (this.position.y < -this.boidSize) this.position.y = height + this.boidSize;
    if (this.position.x > width + this.boidSize) this.position.x = -this.boidSize;
    if (this.position.y > height + this.boidSize) this.position.y = -this.boidSize;
  };
}

/**
 * @summary Draws the FOV overlay (Detection box) at 0, 0. rotate() to the appropriate heading is done outside this function.
 * @param {number} radius Radius of the detection box
 * @param {degrees} angle Angle of the detection box. 180 = half front circle
 * @param {constant} [mode=PIE] CHORD, PIE or OPEN
 * @param {p5Color} color Color of the detection box. A alpha channel value < 100 is recommended
 */
const overlayFOV = (radius, angle, color, mode = PIE) => {
  fill(color);
  arc(0, 0, radius * 2, radius * 2, radians(360 - (90 + angle / 2)), radians(360 - (90 - angle / 2)), mode);
};
