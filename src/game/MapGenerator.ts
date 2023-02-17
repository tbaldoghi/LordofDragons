import ForestVariants from "../enums/ForestVariants";
import MapTileTypes from "../enums/MapTileTypes";
import MapSize from "../interfaces/MapSize";
import MapTile from "./MapTile";

class MapGenerator {
  private _mapSize: MapSize;
  private _map: MapTile[][];

  constructor(mapSize: MapSize) {
    this._mapSize = mapSize;
    this._map = [];
  }

  public init(): void {
    for (let i = 0; i < this._mapSize.height; i++) {
      this.map[i] = [];

      for (let j = 0; j < this._mapSize.width; j++) {
        let type = Math.floor(Math.random() * (3 - 0 + 1) + 0);

        if (type !== MapTileTypes.forest) {
          type = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        }

        if (type === MapTileTypes.mountain) {
          type = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        }

        const variant = 1;
        this.map[i][j] = new MapTile(type, `forest_${variant}`);
      }
    }
  }

  public get map(): MapTile[][] {
    return this._map;
  }
}

export default MapGenerator;
