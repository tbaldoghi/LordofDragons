import MapTileTypes from "../../enums/MapTileTypes";
import WorldLevels from "../../enums/WorldLevels";
import MapTile from "../MapTile";
import mapSize from "../../contants/mapSize";

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

    for (let i = 0; i <= width; i++) {
      this._world.worldMaps[level].map[i] = [];

      for (let j = 0; j <= height; j++) {
        let type = Math.floor(Math.random() * (3 - 0 + 1) + 0);

        if (type !== MapTileTypes.forest) {
          type = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        }

        if (type === MapTileTypes.mountain) {
          type = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        }

        if (i === 0 || j === 0 || i === width || j === height) {
          type = MapTileTypes.mountain;
        }

        this._world.worldMaps[level].map[i][j] = new MapTile(type);
      }
    }
  }

  public get world(): World {
    console.log(this._world);
    return this._world;
  }
}

export default WorldGenerator;
