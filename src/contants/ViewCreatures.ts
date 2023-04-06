import Skeleton from "../game/creature/Skeleton";
import Wolf from "../game/creature/Wolf";

export type CreatureType = Wolf & Skeleton;

class ViewCreatures {
  public static creatures: CreatureType[] = [];

  public static resetCreatures = (): void => {
    this.creatures = [];
  };
}

export default ViewCreatures;
