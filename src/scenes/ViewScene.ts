import ViewSize from "../enums/ViewSize";
import Wolf from "../game/creature/Wolf";
import eventHandler from "../contants/eventHandler";
import world from "../contants/world";
import player from "../contants/player";

class ViewScene extends Phaser.Scene {
  private parent: Phaser.GameObjects.Zone;
  private direction: number;
  private _distance!: Phaser.GameObjects.TileSprite;
  private _background!: Phaser.GameObjects.TileSprite;
  private _foreground!: Phaser.GameObjects.TileSprite;
  private _isTurnRight: boolean;

  constructor(parent: Phaser.GameObjects.Zone) {
    super("ViewScene");

    this.parent = parent;
    this.direction = 0;
    this._isTurnRight = false;
  }

  preload(): void {
    const path = "assets/images";

    this.load.image(
      "forest1",
      `${path}/background/forest/parallax_forest1.png`
    );
    this.load.image(
      "forest2",
      `${path}/background/forest/parallax_forest2.png`
    );
    this.load.image(
      "forest3",
      `${path}/background/forest/parallax_forest3.png`
    );
    this.load.image(
      "forest4",
      `${path}/background/forest/parallax_forest4.png`
    );
  }

  create(): void {
    this.cameras.main.setViewport(0, 0, ViewSize.width, ViewSize.height);
    this.cameras.main.setBackgroundColor("#000000");

    const forest = this.add.sprite(0, 0, "forest");

    // const sky = this.add.image(0, 0, "forest1");
    // this._distance = this.add.tileSprite(0, 0, 1280, 800, "forest2");
    // this._background = this.add.tileSprite(0, 0, 1280, 800, "forest3");
    // this._foreground = this.add.tileSprite(0, 0, 1280, 800, "forest4");

    const wolf = new Wolf(this, ViewSize.width / 2 - 300, 570, true);
    const wolf2 = new Wolf(this, ViewSize.width / 2 - 75, 570, true);
    const wolf3 = new Wolf(this, ViewSize.width / 2 + 200, 570, true);
    const wolf4 = new Wolf(this, ViewSize.width / 2 + 400, 570, true);

    forest.setOrigin(0);
    forest.setScale(4);

    // sky.setOrigin(0);
    // this._distance.setOrigin(0);
    // this._background.setOrigin(0);
    // this._foreground.setOrigin(0);

    eventHandler.on(
      "turnRight",
      () => {
        this.direction < 3 ? this.direction++ : (this.direction = 0);
        this.cameras.main.pan(
          ViewSize.width / 2 + ViewSize.width * this.direction,
          ViewSize.height / 2,
          500
        );
        this._isTurnRight = true;
      },
      this
    );

    eventHandler.on(
      "turnLeft",
      () => {
        this.direction > 0 ? this.direction-- : (this.direction = 3);
        this.cameras.main.pan(
          ViewSize.width / 2 + ViewSize.width * this.direction,
          ViewSize.height / 2,
          500
        );
      },
      this
    );

    eventHandler.on(
      "moveForward",
      () => {
        this.cameras.main.zoomTo(1.25, 250, "Linear", false);
        this.cameras.main.on(
          Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE,
          () => {
            this.cameras.main.setZoom(1);

            const worldMap = world.worldMaps.find(
              (worldMap) => worldMap.level === player.currentLevel
            );
            const mapTile = worldMap?.map[player.positionX][player.positionY];

            if (Math.round(Math.random()) === 1) {
              this.cameras.main.setScroll(ViewSize.width, 0);
            } else {
              this.cameras.main.setScroll(0, 0);
            }
          },
          this
        );
      },
      this
    );
  }

  update(time: number, delta: number): void {
    //   this._elapsedTime += delta;
    //   if (this._elapsedTime < 10) {
    //     this._distance.tilePositionX += 0.01;
    //     this._background.tilePositionX += 0.05;
    //   } else {
    //     this._distance.tilePositionX -= 0.01;
    //     this._background.tilePositionX -= 0.05;
    //     if (this._elapsedTime > 20) {
    //       this._elapsedTime = 0;
    //     }
    //   }
    //   // this._foreground.tilePositionX += 25;
  }
}

export default ViewScene;
