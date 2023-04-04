import SelectTarget from "../SelectTarget";

// TODO: Update to sprite game object, instead of image. (For animations.)
abstract class Creature extends Phaser.GameObjects.Image {
  public x: number;
  public y: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    isActive?: boolean
  ) {
    super(scene, x, y, texture);

    this.x = x;
    this.y = y;

    scene.add.existing(this);

    if (isActive) {
      this.enable();
    }
  }

  public enable = (): void => {
    this.setInteractive();
    this.on("pointerover", this.handleMouseOver);
    this.on("pointerout", this.handleMouseOut);
    this.on("pointerdown", this.hit);
  };

  public disable = (): void => {
    this.disableInteractive();
    this.off("pointerover");
    this.off("pointerout");
  };

  public hit = (): void => {
    this.setTint(0x79444a);
    this.scene.time.addEvent({
      loop: false,
      delay: 125,
      callback: () => {
        this.clearTint();
      },
    });
  };

  handleMouseOver = (): void => {
    SelectTarget.handleOver(
      this.scene,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  handleMouseOut = (): void => {
    SelectTarget.handleOut(this.scene);
  };
}

export default Creature;
