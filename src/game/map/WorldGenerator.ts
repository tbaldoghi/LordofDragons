import { createWeightedChoice } from "pandemonium";
import MapTileTypes from "../../enums/MapTileTypes";
import WorldLevels from "../../enums/WorldLevels";
import MapTile, { BackgroundVariant, Event, Variant } from "../MapTile";
import mapSize from "../../contants/mapSize";
import MapTileEvents from "../../enums/MapTileEvents";
import MapTilePlaceTypes from "../../enums/MapTilePlaceTypes";
import Creatures from "../../enums/Creatures";

interface CreatureWeight {
  name: string;
  weight: number;
}

export interface WorldMap {
  level: number;
  map: MapTile[][];
}

interface World {
  worldMaps: WorldMap[];
}

class WorldGenerator {
  #world!: World;

  constructor() {
    this.#world = { worldMaps: [] };

    this.createWorld();
  }

  private createWorld() {
    const size = 21;

    for (let i = 0; i < size; i++) {
      this.createtMap(i);
    }
  }

  private createtMap(level: number): void {
    const { width, height } = mapSize;
    const worldMap = {
      level: level + 1,
      map: [],
    } as WorldMap;

    this.#world.worldMaps.push(worldMap);

    for (let i = 0; i < width; i++) {
      this.#world.worldMaps[level].map[i] = [];

      for (let j = 0; j < height; j++) {
        const backgroundVariant = {
          distance: Math.floor(Math.random() * 4) as Variant,
          background: Math.floor(Math.random() * 4) as Variant,
          foreground: Math.floor(Math.random() * 4) as Variant,
        } as BackgroundVariant;
        let type = Math.floor(Math.random() * 4);
        let event = Math.floor(Math.random() * 4) as Event;

        for (let i = 0; i < 2; i++) {
          if (event !== MapTileEvents.empty) {
            event = Math.floor(Math.random() * 4) as Event;
          }
        }

        if (type !== MapTileTypes.forest) {
          type = Math.floor(Math.random() * 4);
        }

        if (type === MapTileTypes.mountain) {
          type = Math.floor(Math.random() * 4);
        }

        if (Math.random() < 0.1) {
          type = Math.floor(Math.random() * 6 + 7);
        }

        if (i === 0 || j === 0 || i === width - 1 || j === height - 1) {
          type = MapTileTypes.mountain;
        }

        if (
          type === MapTileTypes.mountain ||
          type >= MapTilePlaceTypes.village
        ) {
          event = MapTileEvents.empty;
        }

        const mapTile = new MapTile(type, backgroundVariant, event);

        if (event === MapTileEvents.creature) {
          const creatureType = this.randomCreatureType(level);
          const numberOfCreatures = Math.floor(Math.random() * 4);
          const creatures = [];

          for (let i = 0; i <= numberOfCreatures; i++) {
            creatures.push(creatureType);
          }

          mapTile.creatureType = creatureType;
          mapTile.creatures = creatures;
        }

        this.#world.worldMaps[level].map[i][j] = mapTile;
      }
    }
  }

  private randomCreatureType(level: number): string {
    // TODO: Add level to weights.
    const creatureWeights: CreatureWeight[] = [
      { name: Creatures.wolf, weight: 5 },
      { name: Creatures.skeleton, weight: 1 },
    ];
    const weightedChoice = createWeightedChoice({
      rng: Math.random,
      getWeight: (item: CreatureWeight) => {
        return item.weight;
      },
    } as any);
    const selectedCreature = weightedChoice(creatureWeights) as CreatureWeight;

    if (selectedCreature) {
      return selectedCreature.name;
    }

    return Creatures.wolf;
  }

  public get world(): World {
    return this.#world;
  }
}

export default WorldGenerator;
