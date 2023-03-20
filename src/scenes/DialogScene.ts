import dialogs from "../contants/dialogs";
import Dialog from "../game/Dialog";
import TextButton from "../ui/common/TextButton";
import BattleUIScene from "./BattleUIScene";

class DialogScene extends Phaser.Scene {
  private readonly _width = 1280;
  private readonly _heigth = 260;
  private _messages: string[] = [];

  constructor() {
    super("DialogScene");
  }

  create(): void {
    const height = this.scale.gameSize.height;
    const messageBackground = this.add.image(
      0,
      height - this._heigth - 12,
      "messageBackground"
    );

    messageBackground.setOrigin(0);

    dialogs.forEach((dialog: Dialog, index: number): void => {
      const x = 48;
      const y = this.scale.gameSize.height - this._heigth + index * 32 + 16;
      const { text, isClickable, onClick } = dialog;

      if (isClickable && onClick) {
        const button = new TextButton(this, x, y, text, () => {}, 24);

        button.setInteractive();
        button.on("pointerup", onClick);
      } else {
        const dialogText = this.add.text(x, y, text, {
          font: "24px Oswald",
          color: "#4b3d44",
        });
      }
    });
  }
}

export default DialogScene;
