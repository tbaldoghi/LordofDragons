import player from "../contants/player";
import MiniMapTile from "../game/map/MiniMapTile";
import world from "../contants/world";

class MiniMapScene extends Phaser.Scene {
  private _minimapArrow!: Phaser.GameObjects.Image;
  private _miniMapTiles: MiniMapTile[][] = [];

  constructor() {
    super("MiniMapScene");
  }

  public create(): void {
    const miniMapSize = 7;
    const size = 64;
    const offsetX = 500;
    const offsetY = 100;
    const worldMap = world.worldMaps.find(
      (worldMap) => worldMap.level === player.currentLevel
    );
    const map = worldMap?.map || [];

    for (let i = 0; i < miniMapSize; i++) {
      this._miniMapTiles[i] = [];

      for (let j = 0; j < miniMapSize; j++) {
        const x = this.scale.gameSize.width - offsetX + j * size;
        const y = offsetY + i * size;
        const mapTile = map[i + player.positionX][j + player.positionY];

        this._miniMapTiles[i][j] = new MiniMapTile(
          this,
          x,
          y,
          mapTile.type,
          mapTile.event
        );
      }
    }

    this._minimapArrow = this.add.image(
      this.scale.gameSize.width - offsetX + 3 * size,
      offsetY + 3 * size,
      "minimapArrow"
    );

    this._minimapArrow.setScale(2);
    this._minimapArrow.setDepth(1);
  }

  public update(): void {
    const miniMapSize = 7;
    const worldMap = world.worldMaps.find(
      (worldMap) => worldMap.level === player.currentLevel
    );
    const map = worldMap?.map || [];

    for (let i = 0; i < miniMapSize; i++) {
      for (let j = 0; j < miniMapSize; j++) {
        const mapTile = map[i + player.positionY][j + player.positionX];
        this._miniMapTiles[i][j].setFrame(mapTile.type);
        this._miniMapTiles[i][j].updateMark(mapTile.event);
      }
    }

    this._minimapArrow.setAngle(90 * player.direction);
  }
}

export default MiniMapScene;
