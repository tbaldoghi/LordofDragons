import { WeaponData } from "../contants/weaponDataTable";
import Items from "../enums/Items";
import Weapon from "./Weapon";

type Item = Weapon;

class Inventory {
  #gold: number;
  #items: Item[] = [];

  constructor() {
    this.#gold = 0;
  }

  public weaponAttacks(): WeaponData[] {
    if (this.hasActiveWeapon()) {
      return []; // TODO;
    }

    const handToHand: WeaponData = {
      name: "Hand-to-hand",
      minimumDamage: 1,
      maximumDamage: 2,
      timeUnit: 0.2,
    };

    return [handToHand];
  }

  private hasActiveWeapon(): boolean {
    const weapon = this.#items.find(
      (item: Item): boolean => item.type === Items.weapon
    );

    if (weapon) {
      return weapon.isActive;
    }

    return false;
  }
}

export default Inventory;
