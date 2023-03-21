import StatusBarTypes from "../../enums/StatusBarTypes";

type StatusBarType = "health" | "mana" | "stamina" | "timeUnits";

class StatusBar extends Phaser.GameObjects.Graphics {
  private readonly _offset: number = 2;

  constructor(
    scene: Phaser.Scene,
    type: StatusBarType,
    x: number,
    y: number,
    width: number = 120,
    height: number = 12
  ) {
    super(scene);

    this.clear();
    this.fillStyle(0x574852);
    this.fillRect(x, y, width, height);

    switch (type) {
      case StatusBarTypes.health:
        this.fillStyle(0x79444a);
        break;
      case StatusBarTypes.mana:
        this.fillStyle(0x4b726e);
        break;
      case StatusBarTypes.stamina:
        this.fillStyle(0xb3a555);
        break;
      case StatusBarTypes.timeUnits:
        this.fillStyle(0x77743b);
        break;
    }

    this.fillRect(
      x + this._offset,
      y + this._offset,
      width - this._offset * 2,
      height - this._offset
    );

    scene.add.existing(this);
  }

  // TODO: Add set bar % function.
}

export default StatusBar;
