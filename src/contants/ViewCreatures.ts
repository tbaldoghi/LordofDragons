import Skeleton from "../game/creature/Skeleton";
import Wolf from "../game/creature/Wolf";

type CreatureType = Wolf & Skeleton;

class ViewCreautres {
  public static creatures: CreatureType[] = [];

  public static resetCreatures = (): void => {
    this.creatures = [];
  };
}

export default ViewCreautres;
