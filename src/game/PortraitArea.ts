import Button from "../ui/common/Button";

class PortraitArea {
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  public init() {
    const size = 155;
    const offsetX = 550;
    const offsetY = 350;
    const y = this._scene.scale.gameSize.height - offsetY;
    const portraits = [
      "portrait",
      "emptyPortrait",
      "emptyPortrait",
      "emptyPortrait",
    ];

    portraits.forEach((portrait: string, index: number): void => {
      const x = this._scene.scale.gameSize.width - offsetX + index * size;

      this._scene.add.image(x, y, portrait);
      const inventoryButton = new Button(
        this._scene,
        x - 32,
        y + 100,
        "inventory",
        () => {},
        index !== 0
      );
      const bookButton = new Button(
        this._scene,
        x + 32,
        y + 100,
        "book",
        () => {},
        index !== 0
      );
    });
  }
}

export default PortraitArea;
