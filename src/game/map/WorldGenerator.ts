import MapTileTypes from "../../enums/MapTileTypes";
import WorldLevels from "../../enums/WorldLevels";
import MapTile, { BackgroundVariant, Event, Variant } from "../MapTile";
import mapSize from "../../contants/mapSize";
import MapTileEvents from "../../enums/MapTileEvents";
import MapTilePlaceTypes from "../../enums/MapTilePlaceTypes";

type MapType = "forest" | "cave" | "mine" | "catacomb";

interface WorldMap {
  level: number;
  type: MapType;
  map: MapTile[][];
}

interface World {
  worldMaps: WorldMap[];
}

class WorldGenerator {
  private _world!: World;

  constructor() {
    this._world = { worldMaps: [] };

    this.createWorld();
  }

  private createWorld() {
    const size = 11;

    for (let i = 0; i < size; i++) {
      if (i <= WorldLevels.forest) {
        this.createForestMap(i);
      }
    }
  }

  private createForestMap(level: number): void {
    const { width, height } = mapSize;
    const worldMap = {
      level: level + 1,
      type: "forest",
      map: [],
    } as WorldMap;

    this._world.worldMaps.push(worldMap);

    for (let i = 0; i < width; i++) {
      this._world.worldMaps[level].map[i] = [];

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

        if (i === 0 || j === 0 || i === width - 1 || j === height - 1) {
          type = MapTileTypes.mountain;
        }

        if (Math.random() < 0.1) {
          type = Math.floor(Math.random() * 6 + 5);
          console.log(type);
        }

        if (
          type === MapTileTypes.mountain ||
          type >= MapTilePlaceTypes.village
        ) {
          event = MapTileEvents.empty;
        }

        const mapTile = new MapTile(type, backgroundVariant, event);

        if (event === MapTileEvents.creature) {
          const creatures = [];

          for (let i = 0; i < Math.floor(Math.random() * 4 + 1); i++) {
            creatures.push("wolf");
          }

          mapTile.creatures = creatures;
        }

        this._world.worldMaps[level].map[i][j] = mapTile;
      }
    }
  }

  public get world(): World {
    return this._world;
  }
}

export default WorldGenerator;
