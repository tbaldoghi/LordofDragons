import FloatMessageScene from "../scenes/FloatMessageScene";
import Button from "../ui/common/Button";

class PortraitArea {
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  public init() {
    const size = 155;
    const offsetX = 550;
    const offsetY = 400;
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
      this._scene.add.image(x, y + 84, "uiMove");
      const moveText = this._scene.add.text(
        x - 56,
        y + 68,
        index === 0 ? "Move: 99/99" : "Move: 0/0",
        {
          font: "24px Oswald",
          color: "#4b3d44",
        }
      );
      moveText.setOrigin(0);

      const inventoryButton = new Button(
        this._scene,
        x - 32,
        y + 136,
        "inventory",
        () => {},
        index !== 0
      );
      const bookButton = new Button(
        this._scene,
        x + 32,
        y + 136,
        "book",
        () => {},
        index !== 0
      );
    });

    const floatMessageZone = this._scene.add.zone(
      this._scene.scale.gameSize.width - offsetX,
      y,
      300,
      200
    );

    floatMessageZone.setInteractive();
    floatMessageZone.setOrigin(0);

    const floatMessageScene = new FloatMessageScene(floatMessageZone);

    this._scene.scene.add(`FloatMessageScene`, floatMessageScene);
    floatMessageScene.scene.start();
  }
}

export default PortraitArea;
