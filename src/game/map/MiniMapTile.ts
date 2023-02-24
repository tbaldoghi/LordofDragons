class MiniMapTile extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, type: number) {
    super(scene, x, y, "mapTiles");

    scene.add.existing(this);
    this.setFrame(type);
    this.setScale(2);
  }
}

export default MiniMapTile;