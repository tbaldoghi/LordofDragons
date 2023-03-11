import MapTileEvents from "../../enums/MapTileEvents";
import FloatMessageScene from "../../scenes/FloatMessageScene";
import { Event } from "../MapTile";

class MiniMapTile extends Phaser.GameObjects.Sprite {
  private _mark?: Phaser.GameObjects.Image;
  private _label?: Phaser.GameObjects.Rectangle;
  private _labelText?: Phaser.GameObjects.Text;
  private _x: number;
  private _y: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: number,
    event: Event
  ) {
    super(scene, x, y, "mapTiles");

    this._x = x;
    this._y = y;

    scene.add.existing(this);
    this.setFrame(type);
    this.setScale(2);
    this.selectEvent(event);
  }

  public updateMark(event: Event): void {
    this._mark?.destroy();
    this.selectEvent(event);
  }

  private selectEvent(event: Event): void {
    switch (event) {
      case MapTileEvents.creature:
        this._mark = this.scene.add.image(this._x, this._y, "minimapMark");
        this._mark?.setInteractive();
        this._mark?.on("pointerover", this.handleMouseOver);
        this._mark?.on("pointerout", this.handleMouseOut);
        break;
      case MapTileEvents.loot:
        this._mark = this.scene.add.image(this._x, this._y, "minimapLoot");
        break;
      case MapTileEvents.location:
        this._mark = this.scene.add.image(this._x, this._y, "minimapLocation");
        break;
    }

    this._mark?.setScale(2); // TODO: Resize the image.
  }

  private handleMouseOver = (): void => {
    this._mark?.setAlpha(0.75);
    this._label = this.scene.add.rectangle(
      this._x - 90,
      this._y + 18,
      144,
      60,
      0xd2c9a5,
      0.9
    );

    this._label.setOrigin(0);
    this._label.setStrokeStyle(1, 0x574852);

    this._labelText = this.scene.add.text(this._x - 84, this._y + 18, "Wolf", {
      font: "24px Oswald",
      color: "#4b3d44",
    });
    this._label.setOrigin(0);
    this._label.setDepth(2);
    this._labelText.setDepth(2);
  };

  private handleMouseOut = (): void => {
    this._mark?.setAlpha(1);
    this._label?.destroy();
    this._labelText?.destroy();
  };
}

export default MiniMapTile;
