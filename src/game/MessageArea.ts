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
    this._messages.forEach((message: string, index: number): void => {
      const x = 20;
      const y = this._scene.scale.gameSize.height - this._heigth + index * 38;

      this._scene.add.text(x, y, message, {
        font: "28px Oswald",
        color: "#4b3d44",
      });
    });
  }
}

export default MessageArea;
