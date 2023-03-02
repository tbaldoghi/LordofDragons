import MapTileEvents from "../../enums/MapTileEvents";
import { Event } from "../MapTile";

class MiniMapTile extends Phaser.GameObjects.Sprite {
  private _mark?: Phaser.GameObjects.Image;
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
}

export default MiniMapTile;
