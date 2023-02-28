import ViewSize from "../enums/ViewSize";
import Wolf from "../game/creature/Wolf";
import eventHandler from "../contants/eventHandler";

class ViewScene extends Phaser.Scene {
  private parent: Phaser.GameObjects.Zone;
  private direction: number;

  constructor(parent: Phaser.GameObjects.Zone) {
    super("ViewScene");

    this.parent = parent;
    this.direction = 0;
  }

  create(): void {
    this.cameras.main.setViewport(0, 0, ViewSize.width, ViewSize.height);
    this.cameras.main.setBackgroundColor("#000000");

    const forest = this.add.sprite(0, 0, "forest");
    const wolf = new Wolf(this, ViewSize.width / 2, 590);

    forest.setOrigin(0);
    forest.setScale(4);

    eventHandler.on(
      "turnRight",
      () => {
        this.direction < 3 ? this.direction++ : (this.direction = 0);
        this.cameras.main.pan(
          ViewSize.width / 2 + ViewSize.width * this.direction,
          ViewSize.height / 2,
          500
        );
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
      "up",
      () => {
        this.cameras.main.zoomTo(1.25, 250, "Linear", false);
        this.cameras.main.on(
          Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE,
          () => {
            this.cameras.main.setZoom(1);
            this.cameras.main.fadeFrom(250);
            this.cameras.main.setScroll(ViewSize.width, 0);
          },
          this
        );
      },
      this
    );
  }
}

export default ViewScene;
