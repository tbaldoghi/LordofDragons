// TODO: Update to sprite game object, instead of image. (For animations.)
abstract class Creature extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
  }
}

export default Creature;
