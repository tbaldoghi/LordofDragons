import Creature from "./Creature";

class Wolf extends Creature {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "wolf");
  }
}

export default Wolf;
