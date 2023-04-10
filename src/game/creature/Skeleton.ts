import Creature, { Attack } from "./Creature";

class Skeleton extends Creature {
  constructor(scene: Phaser.Scene, x: number, y: number, isActive?: boolean) {
    super(scene, x, y, "skeleton", isActive);
  }

  public attack(characterAgility: number): Attack {
    return { isMiss: false, damage: 10 }; // TODO
  }
}

export default Skeleton;
