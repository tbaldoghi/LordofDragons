import Skeleton from "../game/creature/Skeleton";
import Wolf from "../game/creature/Wolf";

export type CreatureType = Wolf & Skeleton;

class BattleTurn {
  public static turn: number = 1;

  public static nextTurn = (): void => {
    this.turn++;
  };
}

export default BattleTurn;
