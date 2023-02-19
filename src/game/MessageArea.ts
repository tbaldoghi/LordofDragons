import BattleScene from "../scenes/BattleScene";
import TextButton from "../ui/common/TextButton";

class MessageArea {
  private _scene: Phaser.Scene;
  private readonly _width = 1280;
  private readonly _heigth = 260;
  private _messages: string[] = [];

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  public addMessage(message: string): void {
    this._messages.push(message);
  }

  public showMessages(): void {
    const height = this._scene.scale.gameSize.height;
    const messageBackground = this._scene.add.image(
      0,
      height - this._heigth - 12,
      "messageBackground"
    );

    messageBackground.setOrigin(0);
    this._messages.forEach((message: string, index: number): void => {
      const x = 50;
      const y = this._scene.scale.gameSize.height - this._heigth + index * 32;

      if (index === 0) {
        const text = this._scene.add.text(x, y, message, {
          font: "24px Oswald",
          color: "#4b3d44",
        });
      } else {
        const button = new TextButton(this._scene, x, y, message, () => {}, 24);

        if (index === 1) {
          button.setInteractive();
          button.on("pointerup", this.handleTextClick);
        }
      }
    });
  }

  handleTextClick = (): void => {
    this._scene.cameras.main.fadeOut(500, 0, 0, 0, () => {
      this._scene.scene.start("BattleScene", BattleScene);
    });
  };
}

export default MessageArea;
