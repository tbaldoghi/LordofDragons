import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
import MapTile from "../game/MapTile";
import MiniMapTile from "../game/map/MiniMapTile";

class MiniMapScene extends Phaser.Scene {
  private _mapTiles: MapTile[][];
  private _minimapArrow!: Phaser.GameObjects.Image;

  constructor(mapTiles: MapTile[][]) {
    super("MiniMapScene");

    this._mapTiles = mapTiles;
  }

  public create(): void {
    const miniMapSize = 5;
    const size = 64;
    const offsetX = 450;
    const offsetY = 100;

    for (let i = 0; i < miniMapSize; i++) {
      for (let j = 0; j < miniMapSize; j++) {
        const x = this.scale.gameSize.width - offsetX + j * size;
        const y = offsetY + i * size;

        new MiniMapTile(this, x, y, this._mapTiles[i][j].type);
      }
    }

    this._minimapArrow = this.add.image(
      this.scale.gameSize.width - offsetX + 2 * size,
      offsetY + 2 * size,
      "minimapArrow"
    );

    const minimapMark = this.add.image(
      this.scale.gameSize.width - offsetX + 1 * size,
      offsetY + 1 * size,
      "minimapMark"
    );
    const minimapMark2 = this.add.image(
      this.scale.gameSize.width - offsetX + 3 * size,
      offsetY + 4 * size,
      "minimapMark"
    );

    this._minimapArrow.setScale(2);
    minimapMark.setScale(2);
    minimapMark2.setScale(2);
  }

  public update(): void {
    this._minimapArrow.setAngle(90 * player.direction);
  }
}

export default MiniMapScene;
