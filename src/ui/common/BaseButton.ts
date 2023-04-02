import ButtonStates from "../../enums/ButtonStates";

abstract class BaseButton extends Phaser.GameObjects.Sprite {
  protected _isDisabled?: boolean;
  public onClick: () => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    onClick: () => void,
    isDisabled?: boolean
  ) {
    super(scene, x, y, texture);

    this._isDisabled = isDisabled;
    this.onClick = onClick;

    scene.add.existing(this);

    if (!isDisabled) {
      this.setInteractive();
    } else {
      this.setFrame(ButtonStates.up);
    }
  }

  abstract handleDown(): void;

  abstract handleOut(): void;

  abstract handleUp(): void;

  public disable(): void {
    this._isDisabled = true;

    this.disableInteractive();
    this.setFrame(ButtonStates.up);
  }

  public enable(): void {
    this._isDisabled = false;

    this.setInteractive();
    this.setFrame(ButtonStates.down);
  }
}

export default BaseButton;
