interface Image {
  targets?: Phaser.GameObjects.Image;
  x: number;
  y: number;
}

class SelectTarget {
  static selectLeftTop?: Phaser.GameObjects.Image;
  static selectRightTop?: Phaser.GameObjects.Image;
  static selectLeftBottom?: Phaser.GameObjects.Image;
  static selectRightBottom?: Phaser.GameObjects.Image;

  static handleOver = (
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number
  ): void => {
    const texture = "uiSelect";

    SelectTarget.selectLeftTop = scene.add.image(
      x - width / 2,
      y - height / 2,
      texture
    );
    SelectTarget.selectRightTop = scene.add.image(
      x + width / 2,
      y - height / 2,
      texture
    );
    SelectTarget.selectLeftBottom = scene.add.image(
      x - width / 2,
      y + height / 2,
      texture
    );
    SelectTarget.selectRightBottom = scene.add.image(
      x + width / 2,
      y + height / 2,
      texture
    );

    SelectTarget.selectRightTop?.setAngle(90);
    SelectTarget.selectLeftBottom?.setAngle(270);
    SelectTarget.selectRightBottom?.setAngle(180);

    const offset = 8;
    const ease = "Linear";
    const duration = 500;
    const yoyo = true;
    const repeat = -1;
    const images: Image[] = [
      {
        targets: this.selectLeftTop,
        x: x - width / 2 + offset,
        y: y - height / 2 + offset,
      },
      {
        targets: this.selectRightTop,
        x: x + width / 2 - offset,
        y: y - height / 2 + offset,
      },
      {
        targets: this.selectLeftBottom,
        x: x - width / 2 + offset,
        y: y + height / 2 - offset,
      },
      {
        targets: this.selectRightBottom,
        x: x + width / 2 - offset,
        y: y + height / 2 - offset,
      },
    ];

    images.forEach((image: Image): void => {
      const { targets, x, y } = image;

      scene.tweens.add({
        targets,
        x,
        y,
        ease,
        duration,
        yoyo,
        repeat,
      });
    });
  };

  static handleOut(scene: Phaser.Scene): void {
    SelectTarget.selectLeftTop?.destroy();
    SelectTarget.selectRightTop?.destroy();
    SelectTarget.selectLeftBottom?.destroy();
    SelectTarget.selectRightBottom?.destroy();
    scene.tweens.killAll();
  }
}

export default SelectTarget;
