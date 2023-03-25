import dialogs from "../contants/dialogs";
import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
import Creatures from "../enums/Creatures";
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
    const { currentMap } = player;
    const creatureType =
      currentMap[player.positionY][player.positionX].getCreatureType();

    this.resetDialogs();

    switch (creatureType) {
      case Creatures.wolf:
        dialogs.push(new Dialog("A pack of wolves."));
        dialogs.push(new Dialog("... Attack them.", true, this.handleClick));
        break;
      case Creatures.skeleton:
        dialogs.push(new Dialog("A pack of skeletons."));
        dialogs.push(new Dialog("... Attack them.", true, this.handleClick));
        break;
    }

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

  private handleClick = (): void => {
    this.scene.stop("GameUIScene");
    this.scene.stop("MiniMapScene");
    this.scene.start("BattleUIScene", BattleUIScene);
    this.scene.start("DialogScene", this); // TODO
  };

  private resetDialogs = (): void => {
    dialogs.forEach((dialog: Dialog): void => {
      dialog.destroyTextGameObject();
    });

    dialogs.length = 0;
  };
}

export default DialogScene;
