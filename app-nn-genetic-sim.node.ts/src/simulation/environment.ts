import {
  Entity,
  Faction,
  HUNGER_THRESHOLD,
  MAX_AGE,
  State,
  THIRST_THRESHOLD,
} from "./entity";
import { Resource, ResourceSpawn, ResourceType } from "./resource";
import { combineTraits, mutateTraits } from "./traits";
import { distance, randomNearbyPosition, randomPosition } from "./util";

const RESOURCE_CAP = 200;

export class Environment {
  public entities: Entity[] = [];
  private resources: Resource[] = [];
  private factions: Faction[] = [];
  private resourceSpawns: ResourceSpawn[] = [];
  private generation: number = 1;

  constructor(
    public readonly width: number,
    public readonly height: number,
    private ctx: CanvasRenderingContext2D
  ) {}

  init() {
    this.initSpawns();
    this.initFactionsAndEntities();
  }

  private initSpawns() {
    this.resourceSpawns = [];
    this.resources = [];

    // Initialize resource spawns
    const spawnCorners = [
      { x: 100, y: 100 },
      { x: 700, y: 100 },
      { x: 100, y: 500 },
      { x: 700, y: 500 },
    ];

    for (const corner of spawnCorners) {
      for (let i = 0; i < 3; i++) {
        this.resourceSpawns.push(
          new ResourceSpawn(randomNearbyPosition(corner, 50), ResourceType.Food)
        );
        this.resourceSpawns.push(
          new ResourceSpawn(
            randomNearbyPosition(corner, 50),
            ResourceType.Water
          )
        );
        this.resourceSpawns.push(
          new ResourceSpawn(randomNearbyPosition(corner, 50), ResourceType.Wood)
        );
      }
    }
  }

  private initFactionsAndEntities() {
    // Initialize factions
    this.factions = [
      {
        id: 1,
        name: "Red Tribe",
        hostility: new Map<number, boolean>([[2, true]]),
      },
      {
        id: 2,
        name: "Blue Tribe",
        hostility: new Map<number, boolean>([[1, true]]),
      },
    ];

    // Add entities to environment
    for (let i = 0; i < 10; i++) {
      const faction = this.factions[i % this.factions.length];
      this.entities.push(
        new Entity(
          randomPosition(800, 600),
          {
            speed: Math.random(),
            strength: Math.random(),
            loveStruckness: Math.random(),
            tribeLoyalty: Math.random(),
            oneTrueLove: Math.random(),
            grouping: Math.random(),
            leadership: Math.random(),
            resourcefulness: Math.random(),
          },
          faction,
          15 // Example input size for the neural network
        )
      );
    }
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  addResource(resource: Resource) {
    if (this.resources.length >= RESOURCE_CAP) {
      return;
    }
    this.resources.push(resource);
  }

  update() {
    for (const entity of this.entities) {
      if (entity.state !== State.Dead) {
        const inputs = this.collectInputs(entity);
        entity.update(
          inputs,
          this.resources,
          this.resourceSpawns,
          this.entities,
          this
        );
      }
    }

    this.checkForNextGeneration();
  }

  render() {
    for (const resource of this.resources) {
      resource.render(this.ctx);
    }

    for (const resourceSpawn of this.resourceSpawns) {
      resourceSpawn.render(this.ctx);
    }

    for (const entity of this.entities) {
      entity.render(this.ctx);
    }
  }

  private collectInputs(entity: Entity): number[] {
    const closestResource = this.resources.reduce(
      (nearest, resource) => {
        const dist = distance(entity.position, resource.position);
        return dist < nearest.dist ? { resource, dist } : nearest;
      },
      { resource: null, dist: Infinity }
    ).resource;

    const closestResourceSpawn = this.resourceSpawns.reduce(
      (nearest, spawn) => {
        const dist = distance(entity.position, spawn.position);
        return dist < nearest.dist ? { spawn, dist } : nearest;
      },
      { spawn: null, dist: Infinity }
    ).spawn;

    const closestEntity = this.entities.reduce(
      (nearest, e) => {
        if (e !== entity && e.state !== State.Dead) {
          const dist = distance(entity.position, e.position);
          return dist < nearest.dist ? { entity: e, dist } : nearest;
        }
        return nearest;
      },
      { entity: null, dist: Infinity }
    ).entity;

    return [
      ...Object.values(entity.traits),
      entity.hunger / HUNGER_THRESHOLD,
      entity.thirst / THIRST_THRESHOLD,
      entity.health / 100,
      entity.age / MAX_AGE,
      closestResource
        ? distance(entity.position, closestResource.position) / this.width
        : 1,
      closestResourceSpawn
        ? distance(entity.position, closestResourceSpawn.position) / this.width
        : 1,
      closestEntity
        ? distance(entity.position, closestEntity.position) / this.width
        : 1,
    ];
  }

  private checkForNextGeneration() {
    if (this.entities.every((entity) => entity.state === State.Dead)) {
      this.generation++;
      this.initSpawns();
      this.createNextGeneration();
    }
  }

  private createNextGeneration() {
    const newEntities: Entity[] = [];

    // Sort entities by fitness, which is based on age
    this.entities.sort((a, b) => b.age - a.age);

    // Keep the top 10% of entities
    const topEntities = this.entities.slice(0, this.entities.length / 10);

    // Log the highest age, average age, and generation number
    console.log(
      `Highest Age: ${topEntities[0].age}, Average Age: ${
        topEntities.reduce((sum, e) => sum + e.age, 0) / topEntities.length
      }, Generation: ${this.generation}`
    );

    for (let i = 0; i < 50; i++) {
      const parent1 =
        topEntities[Math.floor(Math.random() * topEntities.length)];
      const parent2 =
        topEntities[Math.floor(Math.random() * topEntities.length)];

      const childTraits = combineTraits(parent1.traits, parent2.traits);
      const child = new Entity(
        randomPosition(this.width, this.height),
        mutateTraits(childTraits), // Apply mutation to child traits
        parent1.faction,
        this.collectInputs(parent1).length
      );

      child.nn = parent1.nn.crossover(parent2.nn); // Create child neural network from parents
      child.nn.mutate(0.1); // Apply mutation with a rate of 0.1

      newEntities.push(child);
    }
    this.entities = newEntities;
  }
}
