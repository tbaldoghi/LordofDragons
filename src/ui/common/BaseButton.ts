abstract class BaseButton extends Phaser.GameObjects.Sprite {
  public onClick: () => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    onClick: () => void
  ) {
    super(scene, x, y, texture);

    this.onClick = onClick;

    scene.add.existing(this);
    this.setInteractive();
  }

  abstract handleDown(): void;

  abstract handleUp(): void;
}

export default BaseButton;
