import BaseButton from "./BaseButton";
import ButtonStates from "../../enums/ButtonStates";

class SwitchButton extends BaseButton {
  #isPressed: boolean;
  readonly #frameOffset = 2;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    onClick: () => void
  ) {
    super(scene, x, y, texture, onClick);

    this.#isPressed = false;

    this.on("pointerdown", this.handleDown, this);
    this.on("pointerout", this.handleOut, this);
    this.on("pointerup", this.handleUp, this);
    this.setFrame(ButtonStates.down);
  }

  handleDown(): void {
    let frame = ButtonStates.up;

    if (this.#isPressed) {
      frame += this.#frameOffset;
    }

    this.setFrame(frame);
  }

  handleOut(): void {
    let frame = ButtonStates.down;

    if (this.#isPressed) {
      frame += this.#frameOffset;
    }

    this.setFrame(frame);
  }

  handleUp(): void {
    let frame = ButtonStates.down;

    this.updateIsPressed();

    if (this.#isPressed) {
      frame += this.#frameOffset;
    }

    this.setFrame(frame);
    this.onClick();
  }

  updateIsPressed(): void {
    this.#isPressed = !this.#isPressed;
  }
}

export default SwitchButton;
