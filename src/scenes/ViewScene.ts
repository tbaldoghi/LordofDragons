import ViewSize from "../enums/ViewSize";
import Wolf from "../game/creature/Wolf";
import eventHandler from "../contants/eventHandler";
import world from "../contants/world";
import player from "../contants/player";
import Creatures from "../enums/Creatures";
import Skeleton from "../game/creature/Skeleton";
import Events from "../enums/Events";

class ViewScene extends Phaser.Scene {
  #parent: Phaser.GameObjects.Zone;
  #background!: Phaser.GameObjects.TileSprite;
  #foreground!: Phaser.GameObjects.TileSprite;
  #creatures: Wolf[] = [];

  constructor(parent: Phaser.GameObjects.Zone) {
    super("ViewScene");

    this.#parent = parent;
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
      Events.moveRight,
      () => {
        this.redrawScreen();
        eventHandler.emit(Events.redrawGameStatusBar);
      },
      this
    );

    eventHandler.on(
      Events.moveLeft,
      () => {
        this.redrawScreen();
        eventHandler.emit(Events.redrawGameStatusBar);
      },
      this
    );

    eventHandler.on(
      Events.moveForward,
      () => {
        this.redrawScreen();
        eventHandler.emit(Events.redrawGameStatusBar);
      },
      this
    );

    eventHandler.on(
      Events.moveBack,
      () => {
        this.redrawScreen();
        eventHandler.emit(Events.redrawGameStatusBar);
      },
      this
    );
  }

  private redrawScreen = (): void => {
    // TODO: Add background.
    this.#creatures.forEach((creature): void => {
      creature.destroy();
    });
    this.#creatures = [];
    const worldMap = world.worldMaps.find(
      (worldMap): boolean => worldMap.level === player.currentLevel
    );
    const { currentMap } = player;
    const { creatures } = currentMap[player.positionY][player.positionX];

    creatures.forEach((creature: string, index: number): void => {
      switch (creature) {
        case Creatures.wolf:
          this.#creatures.push(
            new Wolf(this, ViewSize.width / 2 + 200 * index - 300, 570, true)
          );
          break;
        case Creatures.skeleton:
          this.#creatures.push(
            new Skeleton(
              this,
              ViewSize.width / 2 + 300 * index - 450,
              520,
              true
            )
          );
          break;
      }
    });
  };
}

export default ViewScene;
