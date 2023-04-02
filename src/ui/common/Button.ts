import Phaser from "phaser";
import ButtonStates from "../../enums/ButtonStates";
import BaseButton from "./BaseButton";

class Button extends BaseButton {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    onClick: () => void,
    isDisabled?: boolean
  ) {
    super(scene, x, y, texture, onClick, isDisabled);

    if (!isDisabled) {
      this.on("pointerdown", this.handleDown, this);
      this.on("pointerout", this.handleOut, this);
      this.on("pointerup", this.handleUp, this);
    }
  }

  handleDown(): void {
    if (!this._isDisabled) {
      this.setFrame(ButtonStates.up);
    }
  }

  handleOut(): void {
    if (!this._isDisabled) {
      this.setFrame(ButtonStates.down);
    }
  }

  handleUp(): void {
    if (!this._isDisabled) {
      this.setFrame(ButtonStates.down);
      this.onClick();
    }
  }
}

export default Button;
