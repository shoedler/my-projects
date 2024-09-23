import { Environment } from "./environment";
import { NeuralNetwork } from "./neuralNetwork";
import { Resource, ResourceSpawn, ResourceType } from "./resource";
import { Traits, combineTraits } from "./traits";
import {
  addVectors,
  distance,
  limitVector,
  multiplyVector,
  randomNearbyPosition,
  subtractVectors,
} from "./util";

export const ENTITY_RADIUS = 5;
export const COLLECTION_RADIUS = 5;
export const DROP_RADIUS = 10;
export const MAX_AGE = 5000;
export const DEATH_PROBABILITY = 0.001;
export const MATING_COOLDOWN = 200;
export const GROUP_RADIUS = 100;
export const GROUP_ALIGNMENT_RADIUS = 50;
export const GROUP_COHESION_RADIUS = 75;
export const GROUP_SEPARATION_RADIUS = 20;
export const MAX_SPEED = 2;
export const WORK_DURATION = 200; // Adjusted work duration
export const HUNGER_THRESHOLD = 500; // Threshold after which the entity looses health
export const THIRST_THRESHOLD = 300; // Threshold after which the entity looses health
export const THIRST_QUENCH_PER_UNIT = 10; // Adjusted thirst quench per unit
export const HUNGER_FEED_PER_UNIT = 5; // Adjusted hunger feed per unit
export const MAX_ENTITIES = 300;

export enum State {
  Idle,
  SeekingResource,
  Working,
  CollectingResource,
  SeekingMate,
  Mating,
  Eating,
  Drinking,
  Dead,
}

const choosableStates = [
  State.Idle,
  State.SeekingResource,
  State.Working,
  State.CollectingResource,
  State.Drinking,
  State.Eating,
  State.SeekingMate,
  State.Mating,
];

interface Inventory {
  food: number;
  water: number;
  wood: number;
}

export interface Faction {
  id: number;
  name: string;
  hostility: Map<number, boolean>;
}

export class Entity {
  public nn: NeuralNetwork;
  private inventory: Inventory = { food: 0, water: 0, wood: 0 };
  public age: number = 0;
  public health: number = 100;
  public hunger: number = 0;
  public thirst: number = 0;
  public state: State = State.Idle;
  private workTimer: number = 0;
  private matingCooldown: number = 0;
  private partner: Entity | null = null;
  private velocity: { x: number; y: number };

  constructor(
    public position: { x: number; y: number },
    public readonly traits: Traits,
    public faction: Faction,
    inputSize: number
  ) {
    this.nn = new NeuralNetwork(inputSize, 10, 3); // Example sizes for the neural network
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    };
  }

  update(
    inputs: number[],
    resources: Resource[],
    resourceSpawns: ResourceSpawn[],
    entities: Entity[],
    environment: Environment
  ) {
    if (this.state === State.Dead) return;

    this.age++;
    this.hunger++;
    this.thirst++;
    this.matingCooldown = Math.max(0, this.matingCooldown - 1);

    // if (this.age > MAX_AGE && Math.random() < DEATH_PROBABILITY) {
    //   this.die(resources);
    //   return;
    // }

    if (this.hunger >= HUNGER_THRESHOLD) {
      this.health -= 0.05;
      this.hunger = HUNGER_THRESHOLD;
    }

    if (this.thirst >= THIRST_THRESHOLD) {
      this.health -= 0.1;
      this.thirst = THIRST_THRESHOLD;
    }

    if (this.health <= 0) {
      this.die(resources);
      return;
    }

    const outputs = this.nn.predict(inputs);
    this.decideAction(outputs);

    switch (this.state) {
      case State.Idle:
        break;
      case State.SeekingResource:
        this.seekResource(resourceSpawns, resources);
        break;
      case State.Working:
        this.work(resourceSpawns, environment);
        break;
      case State.CollectingResource:
        this.collectNearbyResource(resources);
        break;
      case State.SeekingMate:
        this.seekMate(entities, environment);
        break;
      case State.Mating:
        // Wait until mating cooldown is over
        break;
      case State.Eating:
        this.eat();
        break;
      case State.Drinking:
        this.drink();
        break;
    }

    this.position = addVectors(this.position, this.velocity);
    this.velocity = limitVector(this.velocity, MAX_SPEED);

    // Limit position to the environment bounds, also consider the entity radius
    this.position.x = Math.max(
      ENTITY_RADIUS,
      Math.min(environment.width - ENTITY_RADIUS, this.position.x)
    );
    this.position.y = Math.max(
      ENTITY_RADIUS,
      Math.min(environment.height - ENTITY_RADIUS, this.position.y)
    );
  }

  private decideAction(outputs: number[]) {
    const [moveX, moveY, stateIndex] = outputs;
    this.velocity = {
      x: (moveX * 2 - 1) * MAX_SPEED,
      y: (moveY * 2 - 1) * MAX_SPEED,
    };
    this.state = this.mapStateIndex(
      Math.floor(stateIndex * (choosableStates.length - 1))
    );
  }

  private mapStateIndex(index: number): State {
    return choosableStates[
      Math.max(0, Math.min(choosableStates.length - 1, index))
    ];
  }

  private seekResource(resourceSpawns: ResourceSpawn[], resources: Resource[]) {
    const nearestResourceSpawn = resourceSpawns.reduce(
      (nearest, spawn) => {
        const dist = distance(this.position, spawn.position);
        return dist < nearest.dist ? { spawn, dist } : nearest;
      },
      { spawn: null, dist: Infinity }
    ).spawn;

    if (nearestResourceSpawn) {
      this.moveTo(nearestResourceSpawn.position);
      if (
        distance(this.position, nearestResourceSpawn.position) <
        COLLECTION_RADIUS
      ) {
        const nearbyResources = resources.filter(
          (resource) =>
            distance(this.position, resource.position) < COLLECTION_RADIUS
        );
        if (nearbyResources.length > 0) {
          this.state = State.CollectingResource;
        } else {
          this.state = State.Working;
          this.workTimer = WORK_DURATION;
        }
      }
    } else {
      this.state = State.Idle;
    }
  }

  private work(resourceSpawns: ResourceSpawn[], environment: Environment) {
    if (this.workTimer > 0) {
      this.workTimer--;
      const workingSpawn = resourceSpawns.find(
        (spawn) => distance(this.position, spawn.position) < COLLECTION_RADIUS
      );
      if (workingSpawn) {
        const newResources = workingSpawn.interact(this.traits.strength);
        newResources.forEach((resource) => environment.addResource(resource));
      }
    } else {
      this.state = State.Idle;
    }
  }

  private collectNearbyResource(resources: Resource[]) {
    const nearbyResource = resources.find(
      (resource) =>
        distance(this.position, resource.position) < COLLECTION_RADIUS
    );
    if (nearbyResource) {
      this.collectResource(nearbyResource, resources);
    }
    this.state = State.Idle;
  }

  private seekMate(entities: Entity[], environment: Environment) {
    if (this.partner && Math.random() < this.traits.oneTrueLove) return;

    const potentialMates = entities.filter(
      (entity) =>
        entity !== this &&
        entity.state !== State.Dead &&
        entity.matingCooldown === 0
    );
    const mate = potentialMates.find((entity) => {
      const dist = distance(this.position, entity.position);
      return dist < COLLECTION_RADIUS && entity.faction.id === this.faction.id;
    });

    if (mate) {
      this.moveTo(mate.position);
      if (distance(this.position, mate.position) < COLLECTION_RADIUS) {
        this.mate(mate, environment);
      }
    } else {
      this.state = State.Idle;
    }
  }

  private moveTo(target: { x: number; y: number }) {
    const direction = subtractVectors(target, this.position);
    const length = Math.hypot(direction.x, direction.y);
    this.velocity = addVectors(
      this.velocity,
      multiplyVector(direction, this.traits.speed / length)
    );
  }

  private collectResource(resource: Resource, resources: Resource[]) {
    switch (resource.type) {
      case ResourceType.Food:
        this.inventory.food += 1;
        break;
      case ResourceType.Water:
        this.inventory.water += 1;
        break;
      case ResourceType.Wood:
        this.inventory.wood += 1;
        break;
    }

    const index = resources.indexOf(resource);
    if (index > -1) {
      resources.splice(index, 1);
    }
  }

  private eat() {
    const consumption = Math.ceil(
      this.hunger * (1 - this.traits.resourcefulness)
    );
    let value = Math.min(consumption, this.inventory.food);
    value *= HUNGER_FEED_PER_UNIT;
    this.hunger = Math.max(0, this.hunger - value);
    this.inventory.food -= value;
    this.state = State.Idle;
  }

  private drink() {
    const consumption = Math.ceil(
      this.thirst * (1 - this.traits.resourcefulness)
    );
    let value = Math.min(consumption, this.inventory.water);
    value *= THIRST_QUENCH_PER_UNIT;
    this.thirst = Math.max(0, this.thirst - consumption);
    this.inventory.water--;
    this.state = State.Idle;
  }

  private die(resources: Resource[]) {
    this.state = State.Dead;
    this.dropResources(resources);
  }

  private dropResources(resources: Resource[]) {
    for (let i = 0; i < this.inventory.food; i++) {
      resources.push(
        new Resource(this.randomDropPosition(), ResourceType.Food)
      );
    }
    for (let i = 0; i < this.inventory.water; i++) {
      resources.push(
        new Resource(this.randomDropPosition(), ResourceType.Water)
      );
    }
    for (let i = 0; i < this.inventory.wood; i++) {
      resources.push(
        new Resource(this.randomDropPosition(), ResourceType.Wood)
      );
    }
  }

  private randomDropPosition(): { x: number; y: number } {
    const angle = Math.random() * 2 * Math.PI;
    const radius =
      ENTITY_RADIUS + Math.random() * (DROP_RADIUS - ENTITY_RADIUS);
    return {
      x: this.position.x + radius * Math.cos(angle),
      y: this.position.y + radius * Math.sin(angle),
    };
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle =
      this.state === State.Dead
        ? "gray"
        : this.faction.id === 1
        ? "red"
        : "blue";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, ENTITY_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  mate(partner: Entity, environment: Environment) {
    if (environment.entities.length >= MAX_ENTITIES) return;
    this.partner = partner;
    partner.partner = this;

    this.matingCooldown = MATING_COOLDOWN;
    partner.matingCooldown = MATING_COOLDOWN;

    this.state = State.Mating;
    partner.state = State.Mating;

    const childTraits: Traits = combineTraits(this.traits, partner.traits);

    const childPosition = randomNearbyPosition(this.position, DROP_RADIUS);
    const childFaction =
      Math.random() < this.traits.tribeLoyalty ? this.faction : partner.faction;

    const child = new Entity(
      childPosition,
      childTraits,
      childFaction,
      this.nn.inputSize
    );
    child.nn = this.nn.crossover(partner.nn); // Create child neural network from parents
    child.nn.mutate(0.1); // Apply mutation with a rate of 0.1

    environment.addEntity(child);

    this.state = State.Idle;
    partner.state = State.Idle;
  }
}
