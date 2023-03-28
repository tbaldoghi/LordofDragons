import StatusBarTypes from "../../enums/StatusBarTypes";

type StatusBarType = "health" | "mana" | "stamina" | "timeUnit";

class StatusBar extends Phaser.GameObjects.Graphics {
  private readonly _offset: number = 2;
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  private _type: StatusBarType;
  private readonly _maximumValue: number;
  private _currentValue: number;

  constructor(
    scene: Phaser.Scene,
    type: StatusBarType,
    x: number,
    y: number,
    width: number = 120,
    height: number = 12
  ) {
    super(scene);

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._type = type;
    this._maximumValue = width - this._offset * 2;
    this._currentValue = this._maximumValue;

    this.redrawStatsBar();
    scene.add.existing(this);
  }

  public calculateCurrentValue(
    currentValue: number,
    maximumValue: number
  ): void {
    this._currentValue = this._maximumValue * (currentValue / maximumValue);

    this.redrawStatsBar();
  }

  private redrawStatsBar(): void {
    this.clear();
    this.fillStyle(0x574852);
    this.fillRect(this._x, this._y, this._width, this._height);

    switch (this._type) {
      case StatusBarTypes.health:
        this.fillStyle(0x79444a);
        break;
      case StatusBarTypes.mana:
        this.fillStyle(0x4b726e);
        break;
      case StatusBarTypes.stamina:
        this.fillStyle(0xb3a555);
        break;
      case StatusBarTypes.timeUnit:
        this.fillStyle(0x77743b);
        break;
    }

    this.fillRect(
      this._x + this._offset,
      this._y + this._offset,
      this._currentValue,
      this._height - this._offset
    );
  }
}

export default StatusBar;
