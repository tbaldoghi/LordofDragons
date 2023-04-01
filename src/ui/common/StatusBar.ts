import StatusBarTypes from "../../enums/StatusBarTypes";

type StatusBarType = "health" | "mana" | "movement" | "timeUnit";

class StatusBar extends Phaser.GameObjects.Graphics {
  readonly #offset: number = 2;
  #x: number;
  #y: number;
  #width: number;
  #height: number;
  #type: StatusBarType;
  readonly #maximumValue: number;
  #currentValue: number;

  constructor(
    scene: Phaser.Scene,
    type: StatusBarType,
    x: number,
    y: number,
    width: number = 120,
    height: number = 12
  ) {
    super(scene);

    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;
    this.#type = type;
    this.#maximumValue = width - this.#offset * 2;
    this.#currentValue = this.#maximumValue;

    this.redrawStatsBar();
    scene.add.existing(this);
  }

  public calculateCurrentValue(
    currentValue: number,
    maximumValue: number
  ): void {
    this.#currentValue = Math.floor(
      this.#maximumValue * (currentValue / maximumValue)
    );

    this.redrawStatsBar();
  }

  private redrawStatsBar(): void {
    this.clear();
    this.fillStyle(0x574852);
    this.fillRect(this.#x, this.#y, this.#width, this.#height);

    switch (this.#type) {
      case StatusBarTypes.health:
        this.fillStyle(0x79444a);
        break;
      case StatusBarTypes.mana:
        this.fillStyle(0x4b726e);
        break;
      case StatusBarTypes.movement:
        this.fillStyle(0xb3a555);
        break;
      case StatusBarTypes.timeUnit:
        this.fillStyle(0x77743b);
        break;
    }

    this.fillRect(
      this.#x + this.#offset,
      this.#y + this.#offset,
      this.#currentValue,
      this.#height - this.#offset
    );
  }
}

export default StatusBar;
