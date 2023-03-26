import dialogManager from "../contants/dialogManager";
import dialogs from "../contants/dialogs";
import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
import Dialog from "../game/Dialog";
import TextButton from "../ui/common/TextButton";
import BattleUIScene from "./BattleUIScene";

class DialogScene extends Phaser.Scene {
  private readonly _width = 1280;
  private readonly _heigth = 260;

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
    this.updateDialog();

    eventHandler.on(
      "moveRight",
      () => {
        this.updateDialog();
      },
      this
    );

    eventHandler.on(
      "moveLeft",
      () => {
        this.updateDialog();
      },
      this
    );

    eventHandler.on(
      "moveForward",
      () => {
        this.updateDialog();
      },
      this
    );

    eventHandler.on(
      "moveBack",
      () => {
        this.updateDialog();
      },
      this
    );
  }

  private updateDialog = (): void => {
    this.resetDialogs();
    dialogManager.addDialogs(this);
    this.createDialog();
  };

  private createDialog = (): void => {
    dialogs.forEach((dialog: Dialog, index: number): void => {
      const x = 48;
      const y = this.scale.gameSize.height - this._heigth + index * 32 + 16;
      const { text, isClickable, onClick } = dialog;

      if (isClickable && onClick) {
        dialog.textGameObject = new TextButton(this, x, y, text, () => {}, 24);

        dialog.setTextGameObjectInteractive(onClick);
      } else {
        dialog.textGameObject = this.add.text(x, y, text, {
          font: "24px Oswald",
          color: "#4b3d44",
        });
      }
    });
  };

  private resetDialogs = (): void => {
    dialogs.forEach((dialog: Dialog): void => {
      dialog.destroyTextGameObject();
    });

    dialogs.length = 0;
  };
}

export default DialogScene;
