import ViewSize from "../enums/ViewSize";
import Wolf from "../game/creature/Wolf";
import eventHandler from "../contants/eventHandler";
import world from "../contants/world";
import player from "../contants/player";

class ViewScene extends Phaser.Scene {
  private parent: Phaser.GameObjects.Zone;
  private _background!: Phaser.GameObjects.TileSprite;
  private _foreground!: Phaser.GameObjects.TileSprite;
  private _creatures: Wolf[] = [];

  constructor(parent: Phaser.GameObjects.Zone) {
    super("ViewScene");

    this.parent = parent;
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

    forest.setOrigin(0);
    forest.setScale(4);

    this.redrawScreen();

    eventHandler.on(
      "moveRight",
      () => {
        this.cameras.main.pan(
          ViewSize.width / 2 + ViewSize.width,
          ViewSize.height / 2,
          500
        );
      },
      this
    );

    eventHandler.on(
      "moveLeft",
      () => {
        this.cameras.main.pan(
          ViewSize.width / 2 + ViewSize.width,
          ViewSize.height / 2,
          500
        );
      },
      this
    );

    eventHandler.on(
      "moveForward",
      () => {
        // this.cameras.main.zoomTo(1.25, 250, "Linear", false);
        // this.cameras.main.on(
        //   Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE,
        //   () => {
        //     this.cameras.main.setZoom(1);

        //     const worldMap = world.worldMaps.find(
        //       (worldMap) => worldMap.level === player.currentLevel
        //     );
        //     const mapTile = worldMap?.map[player.positionX][player.positionY];

        //     if (Math.round(Math.random()) === 1) {
        //       this.cameras.main.setScroll(ViewSize.width, 0);
        //     } else {
        //       this.cameras.main.setScroll(0, 0);
        //     }
        //   },
        //   this
        // );

        this.redrawScreen();
      },
      this
    );

    eventHandler.on(
      "moveBack",
      () => {
        // if (Math.round(Math.random()) === 1) {
        //   this.cameras.main.setScroll(ViewSize.width, 0);
        // } else {
        //   this.cameras.main.setScroll(0, 0);
        // }
        // this.cameras.main.setZoom(1.25);
        // this.cameras.main.zoomTo(1, 250, "Linear", false);

        // const worldMap = world.worldMaps.find(
        //   (worldMap) => worldMap.level === player.currentLevel
        // );
        // const mapTile = worldMap?.map[player.positionX][player.positionY];

        this.redrawScreen();
      },
      this
    );
  }

  private redrawScreen = (): void => {
    // TODO: Add background.
    this._creatures.forEach((creature): void => {
      creature.destroy();
    });
    this._creatures = [];
    const worldMap = world.worldMaps.find(
      (worldMap): boolean => worldMap.level === player.currentLevel
    );
    const map = worldMap?.map || [];
    const { creatures } = map[player.positionX][player.positionY];
    console.log(creatures);
    creatures.forEach((creature: string, index: number): void => {
      this._creatures.push(
        new Wolf(this, ViewSize.width / 2 + 200 * index, 570, true)
      );
    });
  };
}

export default ViewScene;
