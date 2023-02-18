import ButtonStates from "../../enums/ButtonStates";

abstract class BaseButton extends Phaser.GameObjects.Sprite {
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
}

export default BaseButton;
