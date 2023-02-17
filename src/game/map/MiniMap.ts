import MapTile from "../MapTile";
import MiniMapTile from "./MiniMapTile";

class MiniMap {
  private _scene: Phaser.Scene;
  private _mapTiles: MapTile[][];

  constructor(scene: Phaser.Scene, mapTiles: MapTile[][]) {
    this._scene = scene;
    this._mapTiles = mapTiles;
  }

  public renderMap = (): void => {
    const miniMapSize = 20;
    const size = 16;
    const offsetX = 450;
    const offsetY = 50;

    for (let i = 0; i < miniMapSize; i++) {
      for (let j = 0; j < miniMapSize; j++) {
        const x = this._scene.scale.gameSize.width - offsetX + j * size;
        const y = offsetY + i * size;

        new MiniMapTile(this._scene, x, y, this._mapTiles[i][j].type);
      }
    }
  };
}

export default MiniMap;
