import { random } from "pandemonium";
import StatisticsTypes from "../../enums/StatisticsTypes";
import Creature, { Attack } from "./Creature";

class Wolf extends Creature {
  readonly #bite = {
    type: "", // TODO: Add damage types.
    minimumDamage: 1,
    maximumDamage: 5,
    accuracy: 50,
    timeUnit: 0.5,
  };

  constructor(scene: Phaser.Scene, x: number, y: number, isActive?: boolean) {
    super(scene, x, y, "wolf", isActive);

    this._health = random(20, 30);
    this._currentHealth = this._health;
    this._timeUnit = random(50, 60);
    this._currentTimeUnit = this._timeUnit;
  }

  public attack = (characterAgility: number): Attack => {
    this._currentTimeUnit -= this._timeUnit * this.#bite.timeUnit;

    if (this.#bite.accuracy > random(1, 100)) {
      return { isMiss: true };
    }

    const damage = random(this.#bite.minimumDamage, this.#bite.maximumDamage);

    return { damage };
  };
}

export default Wolf;
