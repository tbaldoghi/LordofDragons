import { random } from "pandemonium";
import getStatistics from "../contants/statisticsDataTable";
import StatisticsTypes from "../enums/StatisticsTypes";
import Character from "./Character";

class Mercenary extends Character {
  public readonly portrait: string = "portrait3"; // TODO: Rename the files.
  public readonly portraitDead: string = "portrait3dead"; // TODO: Rename the files.
  #isDead: boolean;

  constructor() {
    super();

    this.#isDead = false;

    const statistics = getStatistics(StatisticsTypes.mercenary);

    if (statistics) {
      this.health = random(statistics.minimumHealth, statistics.maximumHealth);
      this.currentHealth = this.health;
      this.mana = random(statistics.minimumMana, statistics.maximumMana);
      this.currentMana = this.mana;
      this.movement = statistics.movement;
      this.currentMovement = this.movement;
      this.timeUnit = random(
        statistics.minimumTimeUnit,
        statistics.maximumTimeUnit
      );
      this.currentTimeUnit = this.timeUnit;
    }
  }

  public die = (): void => {
    this.#isDead = true;
  };
}

export default Mercenary;
