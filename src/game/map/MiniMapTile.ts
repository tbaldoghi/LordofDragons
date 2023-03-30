import MapTileEvents from "../../enums/MapTileEvents";
import { Event } from "../MapTile";

class MiniMapTile extends Phaser.GameObjects.Sprite {
  #mark?: Phaser.GameObjects.Image;
  #label?: Phaser.GameObjects.Rectangle;
  #labelText?: Phaser.GameObjects.Text;
  #x: number;
  #y: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: number,
    event: Event
  ) {
    super(scene, x, y, "mapTiles");

    this.#x = x;
    this.#y = y;

    scene.add.existing(this);
    this.setFrame(type);
    this.setScale(2);
    this.selectEvent(event);
  }

  public updateMark(event: Event): void {
    this.#mark?.destroy();
    this.selectEvent(event);
  }

  private selectEvent(event: Event): void {
    switch (event) {
      case MapTileEvents.creature:
        this.#mark = this.scene.add.image(this.#x, this.#y, "minimapMark");
        this.#mark?.setInteractive();
        this.#mark?.on("pointerover", this.handleMouseOver);
        this.#mark?.on("pointerout", this.handleMouseOut);
        break;
      case MapTileEvents.loot:
        this.#mark = this.scene.add.image(this.#x, this.#y, "minimapLoot");
        break;
      case MapTileEvents.location:
        this.#mark = this.scene.add.image(this.#x, this.#y, "minimapLocation");
        break;
    }

    this.#mark?.setScale(2); // TODO: Resize the image.
  }

  private handleMouseOver = (): void => {
    this.#mark?.setAlpha(0.75);
    this.#label = this.scene.add.rectangle(
      this.#x - 90,
      this.#y + 18,
      144,
      68,
      0xd2c9a5,
      0.9
    );

    this.#label.setOrigin(0);
    this.#label.setStrokeStyle(1, 0x574852);

    this.#labelText = this.scene.add.text(
      this.#x - 84,
      this.#y + 18,
      `Wolf\n(Wandering)`,
      {
        font: "24px Oswald",
        color: "#4b3d44",
      }
    );
    this.#label.setOrigin(0);
    this.#label.setDepth(2);
    this.#labelText.setDepth(2);
  };

  private handleMouseOut = (): void => {
    this.#mark?.setAlpha(1);
    this.#label?.destroy();
    this.#labelText?.destroy();
  };
}

export default MiniMapTile;
