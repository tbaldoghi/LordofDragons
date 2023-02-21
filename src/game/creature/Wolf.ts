import Creature from "./Creature";

class Wolf extends Creature {
  constructor(scene: Phaser.Scene, x: number, y: number, isActive?: boolean) {
    super(scene, x, y, "wolf", isActive);
  }
}

export default Wolf;
