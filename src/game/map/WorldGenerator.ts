import { createWeightedChoice, random } from "pandemonium";
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
        let type = random(0, 3);
        let event = random(0, 3) as Event;

        for (let i = 0; i < 2; i++) {
          if (event !== MapTileEvents.empty) {
            event = random(0, 3) as Event;
          }
        }

        if (type !== MapTileTypes.forest) {
          type = random(0, 3);
        }

        if (type === MapTileTypes.mountain) {
          type = random(0, 3);
        }

        if (Math.random() < 0.1) {
          type = random(6, 10);
        }

        if (i === 0 || j === 0 || i === width - 1 || j === height - 1) {
          type = MapTileTypes.mountain;
        }

        if (level === 0) {
          if (i === 2 && j === 2) {
            type = MapTilePlaceTypes.village;
          }
        }

        if (
          type === MapTileTypes.mountain ||
          type >= MapTilePlaceTypes.village
        ) {
          event = MapTileEvents.empty;
        }

        const mapTile = new MapTile(type, this.backgroundVariant(), event);

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

    this.addPortals(level);
  }

  private addPortals = (level: number): void => {
    const { width, height } = mapSize;

    if (level === 0) {
      let mapTile = new MapTile(
        MapTilePlaceTypes.portal,
        this.backgroundVariant(),
        MapTileEvents.empty
      );

      this.#world.worldMaps[level].map[1][1] = mapTile;

      mapTile = new MapTile(
        MapTilePlaceTypes.portalExit,
        this.backgroundVariant(),
        MapTileEvents.empty
      );
      const i = random(5, width - 1);
      const j = random(5, height - 1);

      this.#world.worldMaps[level].map[i][j] = mapTile;
    } else {
      const indices = [];

      while (indices.length < 4) {
        const index = random(1, width - 1);

        if (indices.indexOf(index) === -1) {
          indices.push(index);
        }
      }

      let mapTile = new MapTile(
        MapTilePlaceTypes.portal,
        this.backgroundVariant(),
        MapTileEvents.empty
      );

      this.#world.worldMaps[level].map[indices[0]][indices[1]] = mapTile;

      mapTile = new MapTile(
        MapTilePlaceTypes.portalExit,
        this.backgroundVariant(),
        MapTileEvents.empty
      );
      const i = random(5, width - 1);
      const j = random(5, height - 1);

      this.#world.worldMaps[level].map[indices[2]][indices[3]] = mapTile;
    }
  };

  private backgroundVariant = (): BackgroundVariant => {
    return {
      distance: random(0, 3) as Variant,
      background: random(0, 3) as Variant,
      foreground: random(0, 3) as Variant,
    } as BackgroundVariant;
  };

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
