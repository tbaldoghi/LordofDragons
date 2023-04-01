import player from "../contants/player";
import MiniMapTile from "../game/map/MiniMapTile";
import world from "../contants/world";
import eventHandler from "../contants/eventHandler";
import Events from "../enums/Events";

class MiniMapScene extends Phaser.Scene {
  #minimapArrow!: Phaser.GameObjects.Image;
  #miniMapTiles: MiniMapTile[][] = [];
  readonly #miniMapSize = 9;
  readonly #offsetCenter = Math.floor(this.#miniMapSize / 2);

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

    for (let i = 0; i < this.#miniMapSize; i++) {
      this.#miniMapTiles[i] = [];

      for (let j = 0; j < this.#miniMapSize; j++) {
        const x = this.scale.gameSize.width - offsetX + j * size;
        const y = offsetY + i * size;
        const mapTile =
          map[i + player.positionX - this.#offsetCenter][
            j + player.positionY - this.#offsetCenter
          ];

        this.#miniMapTiles[i][j] = new MiniMapTile(
          this,
          x,
          y,
          mapTile.type,
          mapTile.event
        );
      }
    }

    this.#minimapArrow = this.add.image(
      this.scale.gameSize.width - offsetX + this.#offsetCenter * size,
      offsetY + this.#offsetCenter * size,
      "minimapArrow"
    );

    this.#minimapArrow.setScale(2);
    this.#minimapArrow.setDepth(1);

    const events = [
      Events.moveForward,
      Events.moveBack,
      Events.moveRight,
      Events.moveLeft,
    ];

    events.forEach((event: string): void => {
      eventHandler.on(event, this.redrawMap);
    });
  }

  public redrawMap = (): void => {
    const worldMap = world.worldMaps.find(
      (worldMap): boolean => worldMap.level === player.currentLevel
    );
    const map = worldMap?.map || [];

    this.#minimapArrow.setAngle(90 * player.direction);

    for (let i = 0; i < this.#miniMapSize; i++) {
      for (let j = 0; j < this.#miniMapSize; j++) {
        if (
          i + player.positionY - this.#offsetCenter < map.length &&
          j + player.positionX - this.#offsetCenter < map.length &&
          i + player.positionY - this.#offsetCenter >= 0 &&
          j + player.positionX - this.#offsetCenter >= 0
        ) {
          const mapTile =
            map[i + player.positionY - this.#offsetCenter][
              j + player.positionX - this.#offsetCenter
            ];
          this.#miniMapTiles[i][j].setFrame(mapTile.type);
          this.#miniMapTiles[i][j].updateMark(mapTile.event);
        } else {
          this.#miniMapTiles[i][j].setFrame(4);
          this.#miniMapTiles[i][j].updateMark(0);
        }
      }
    }
  };
}

export default MiniMapScene;
