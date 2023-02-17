import Phaser from "phaser";
import ButtonStates from "../../enums/ButtonStates";

class CommonButton extends Phaser.GameObjects.Sprite {
  onClick: () => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    onClick: () => void
  ) {
    super(scene, x, y, texture);

    this.onClick = onClick;

    scene.add.existing(this);
    this.setInteractive();
    this.on("pointerdown", this.handleDown, this);
    this.on("pointerup", this.handleUp, this);
    this.setFrame(ButtonStates.down);
  }

  handleDown(): void {
    this.setFrame(ButtonStates.down);
  }

  handleUp(): void {
    this.setFrame(ButtonStates.up);
    this.onClick();
  }
}

export default CommonButton;
