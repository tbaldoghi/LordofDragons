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
    const miniMapSize = 5;
    const size = 32 * 2;
    const offsetX = 450;
    const offsetY = 50;

    for (let i = 0; i < miniMapSize; i++) {
      for (let j = 0; j < miniMapSize; j++) {
        const x = this._scene.scale.gameSize.width - offsetX + j * size;
        const y = offsetY + i * size;

        new MiniMapTile(this._scene, x, y, this._mapTiles[i][j].type);
      }
    }

    const minimapArrow = this._scene.add.image(
      this._scene.scale.gameSize.width - offsetX + 2 * size,
      offsetY + 2 * size,
      "minimapArrow"
    );

    const minimapMark = this._scene.add.image(
      this._scene.scale.gameSize.width - offsetX + 1 * size,
      offsetY + 1 * size,
      "minimapMark"
    );

    minimapArrow.setScale(2);
    minimapMark.setScale(2);
  };
}

export default MiniMap;
