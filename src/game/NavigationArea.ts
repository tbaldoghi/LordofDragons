import CommonButton from "../ui/common/CommonButton";

class NavigationArea {
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  public init() {
    const size = 78;
    const offsetX = 575;
    const offsetY = 175;
    const buttonNames = [
      ["arrowTurnLeft", "arrowUp", "arrowTurnRight"],
      ["arrowLeft", "arrowDown", "arrowRight"],
    ];

    buttonNames.forEach((names: string[], i: number): void => {
      names.forEach((name: string, j: number): void => {
        const x = this._scene.scale.gameSize.width - offsetX + j * size;
        const y = this._scene.scale.gameSize.height - offsetY + i * size;

        this._scene.add.image(x, y, name);
      });
    });

    const x = this._scene.scale.gameSize.width - offsetX + size * 6;
    const y = this._scene.scale.gameSize.height - offsetY;
    const fullScreenButton = new CommonButton(
      this._scene,
      x,
      y + size,
      "fullScreen",
      this.onClick
    );
  }

  onClick = (): void => {
    this._scene.scale.toggleFullscreen();
  };
}

export default NavigationArea;
