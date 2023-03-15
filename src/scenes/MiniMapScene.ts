import player from "../contants/player";
import MiniMapTile from "../game/map/MiniMapTile";
import world from "../contants/world";
import eventHandler from "../contants/eventHandler";

class MiniMapScene extends Phaser.Scene {
  private _minimapArrow!: Phaser.GameObjects.Image;
  private _miniMapTiles: MiniMapTile[][] = [];
  private readonly _miniMapSize = 9;
  private readonly _offsetCenter = Math.floor(this._miniMapSize / 2);

  constructor() {
    super("MiniMapScene");
  }

  public create(): void {
    const size = 64;
    const offsetX = 572;
    const offsetY = 48;
    const worldMap = world.worldMaps.find(
      (worldMap) => worldMap.level === player.currentLevel
    );
    const map = worldMap?.map || [];

    for (let i = 0; i < this._miniMapSize; i++) {
      this._miniMapTiles[i] = [];

      for (let j = 0; j < this._miniMapSize; j++) {
        const x = this.scale.gameSize.width - offsetX + j * size;
        const y = offsetY + i * size;
        const mapTile =
          map[i + player.positionX - this._offsetCenter][
            j + player.positionY - this._offsetCenter
          ];

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
      this.scale.gameSize.width - offsetX + this._offsetCenter * size,
      offsetY + this._offsetCenter * size,
      "minimapArrow"
    );

    this._minimapArrow.setScale(2);
    this._minimapArrow.setDepth(1);

    eventHandler.on("moveForward", this.redrawMap);
    eventHandler.on("moveBack", this.redrawMap);
    eventHandler.on("moveRight", this.redrawMap);
    eventHandler.on("moveLeft", this.redrawMap);
  }

  public redrawMap = (): void => {
    const worldMap = world.worldMaps.find(
      (worldMap): boolean => worldMap.level === player.currentLevel
    );
    const map = worldMap?.map || [];

    this._minimapArrow.setAngle(90 * player.direction);

    for (let i = 0; i < this._miniMapSize; i++) {
      for (let j = 0; j < this._miniMapSize; j++) {
        if (
          i + player.positionY - this._offsetCenter < map.length &&
          j + player.positionX - this._offsetCenter < map.length &&
          i + player.positionY - this._offsetCenter >= 0 &&
          j + player.positionX - this._offsetCenter >= 0
        ) {
          const mapTile =
            map[i + player.positionY - this._offsetCenter][
              j + player.positionX - this._offsetCenter
            ];
          this._miniMapTiles[i][j].setFrame(mapTile.type);
          this._miniMapTiles[i][j].updateMark(mapTile.event);
        } else {
          this._miniMapTiles[i][j].setFrame(4);
          this._miniMapTiles[i][j].updateMark(0);
        }
      }
    }
  };
}

export default MiniMapScene;
