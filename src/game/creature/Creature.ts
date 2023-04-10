import eventHandler from "../../contants/eventHandler";
import Events from "../../enums/Events";
import SelectTarget from "../SelectTarget";

export interface Attack {
  damage?: number;
  isMiss?: boolean;
}

// TODO: Update to sprite game object, instead of image. (For animations.)
abstract class Creature extends Phaser.GameObjects.Image {
  public x: number;
  public y: number;
  protected _health!: number;
  protected _currentHealth!: number;
  protected _timeUnit!: number;
  protected _currentTimeUnit!: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    isActive?: boolean
  ) {
    super(scene, x, y, texture);

    this.x = x;
    this.y = y;

    scene.add.existing(this);

    if (isActive) {
      this.enable();
    }
  }

  abstract attack(characterAgility: number): Attack;

  public enable = (): void => {
    this.setInteractive();
    this.on("pointerover", this.handleMouseOver);
    this.on("pointerout", this.handleMouseOut);
    this.on("pointerdown", this.handleMouseDown);
  };

  public disable = (): void => {
    this.disableInteractive();
    this.off("pointerover");
    this.off("pointerout");
    this.off("pointerdown");
  };

  public hit = (): void => {
    this.setTint(0x79444a);
    this.scene.time.addEvent({
      loop: false,
      delay: 125,
      callback: () => {
        this.clearTint();
      },
    });
  };

  private handleMouseOver = (): void => {
    SelectTarget.handleOver(
      this.scene,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  private handleMouseOut = (): void => {
    SelectTarget.handleOut(this.scene);
  };

  private handleMouseDown = (): void => {
    eventHandler.emit(Events.battleSelectTarget, this);
  };
}

export default Creature;
