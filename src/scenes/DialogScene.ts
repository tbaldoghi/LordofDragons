import dialogManager from "../contants/dialogManager";
import dialogs, { resetDialogs } from "../contants/dialogs";
import eventHandler from "../contants/eventHandler";
import Dialog from "../game/Dialog";
import TextButton from "../ui/common/TextButton";

type DialogType = "map" | "battle";

enum DialogTypes {
  map = "map",
  battle = "battle",
}

class DialogScene extends Phaser.Scene {
  readonly #width = 1280;
  readonly #heigth = 260;

  constructor() {
    super("DialogScene");
  }

  create(): void {
    const height = this.scale.gameSize.height;
    const messageBackground = this.add.image(
      0,
      height - this.#heigth - 12,
      "messageBackground"
    );
    const moveEvents = ["moveRight", "moveLeft", "moveForward", "moveBack"];

    messageBackground.setOrigin(0);
    this.updateDialog(DialogTypes.map);

    moveEvents.forEach((moveEvent: string): void => {
      eventHandler.on(
        moveEvent,
        () => {
          this.updateDialog(DialogTypes.map);
        },
        this
      );
    });

    eventHandler.on(
      "battle",
      () => {
        this.updateDialog(DialogTypes.battle);
      },
      this
    );
  }

  private updateDialog = (dialogType: DialogType): void => {
    this.resetDialogs();

    switch (dialogType) {
      case DialogTypes.map:
        dialogManager.addMapDialogs(this);
        break;
      case DialogTypes.battle:
        dialogManager.dialogForBattle();
        break;
    }

    this.createDialog();
  };

  private createDialog = (): void => {
    dialogs.forEach((dialog: Dialog, index: number): void => {
      const x = 48;
      const y = this.scale.gameSize.height - this.#heigth + index * 32 + 16;
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

    resetDialogs();
  };
}

export default DialogScene;
