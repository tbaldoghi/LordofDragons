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
        const type = this.selectEnumValue(MapTileTypes);
        const variant = this.selectVariant(type);
        this.map[i][j] = new MapTile(type, variant);
      }
    }
  }

  public get map(): MapTile[][] {
    return this._map;
  }

  private selectEnumValue(values: { [key: string]: string }): string {
    const types = Object.keys(values);
    const type = types[Math.floor(Math.random() * types.length)];

    return type;
  }

  private selectVariant(type: string): string {
    switch (type) {
      case "forest":
        return this.selectEnumValue(ForestVariants);
      // TODO: Add others, too.
      // case "mountain":
      //   return this.selectEnumValue(MountainVariants);
    }

    return "1";
  }
}

export default MapGenerator;
