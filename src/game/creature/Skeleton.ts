import Creature from "./Creature";

class Skeleton extends Creature {
  constructor(scene: Phaser.Scene, x: number, y: number, isActive?: boolean) {
    super(scene, x, y, "skeleton", isActive);
  }
}

export default Skeleton;
