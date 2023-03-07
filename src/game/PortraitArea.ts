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
    const offsetY = 380;
    const y = this._scene.scale.gameSize.height - offsetY;
    const portraits = [
      "portrait",
      "emptyPortrait",
      "emptyPortrait",
      "emptyPortrait",
    ];

    portraits.forEach((portrait: string, index: number): void => {
      const x = this._scene.scale.gameSize.width - offsetX + index * size;

      const healthBar = new Phaser.GameObjects.Graphics(this._scene);
      const manaBar = new Phaser.GameObjects.Graphics(this._scene);
      const movementBar = new Phaser.GameObjects.Graphics(this._scene);

      manaBar.clear();
      manaBar.fillStyle(0x574852);
      manaBar.fillRect(x - 60, y - 60, 120, 12);

      healthBar.clear();
      healthBar.fillStyle(0x574852);
      healthBar.fillRect(x - 60, y - 76, 120, 12);

      movementBar.clear();
      movementBar.fillStyle(0x574852);
      movementBar.fillRect(x - 60, y - 44, 120, 12);

      if (index === 0) {
        manaBar.fillStyle(0x4b726e);
        manaBar.fillRect(x - 60 + 2, y - 60 + 2, 60, 10);
        healthBar.fillStyle(0x79444a);
        healthBar.fillRect(x - 60 + 2, y - 76 + 2, 90, 10);
        movementBar.fillStyle(0xb3a555);
        movementBar.fillRect(x - 60 + 2, y - 44 + 2, 100, 10);
      }

      this._scene.add.existing(healthBar);
      this._scene.add.existing(manaBar);
      this._scene.add.existing(movementBar);
      this._scene.add.image(x, y + 36, portrait);

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
