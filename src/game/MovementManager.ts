import MapTileTypes from "../enums/MapTileTypes";

enum MovementCosts {
  default = 2,
  forest = 4,
  hill = 4,
  plain = 2,
}

class MovementManager {
  public movementCost(type: number): number {
    switch (type) {
      case MapTileTypes.forest:
        return MovementCosts.forest;
      case MapTileTypes.hill:
        return MovementCosts.hill;
      case MapTileTypes.plain:
        return MovementCosts.plain;
      default:
        return MovementCosts.default;
    }
  }
}

export default MovementManager;
