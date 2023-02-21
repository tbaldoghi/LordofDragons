import SelectTarget from "../SelectTarget";

// TODO: Update to sprite game object, instead of image. (For animations.)
abstract class Creature extends Phaser.GameObjects.Image {
  x: number;
  y: number;

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
      this.setInteractive();
      this.on("pointerover", this.handleOver);
      this.on("pointerout", this.handleOut);
    }
  }

  handleOver = (): void => {
    SelectTarget.handleOver(
      this.scene,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  handleOut = (): void => {
    SelectTarget.handleOut(this.scene);
  };
}

export default Creature;
